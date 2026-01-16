import Booking from '#models/booking'
import Vehicle from '#models/vehicle'
import TripCharge from '#models/trip_charge'
import type { HttpContext } from '@adonisjs/core/http'

export default class TripChargesController {
  async store({ request, response }: HttpContext) {
    const booking = await Booking.findOrFail(request.input('booking_id'))
    
    if (!booking.vehicle_id) {
      return response.status(400).json({
        message: 'Vehicle not assigned to this booking',
      })
    }

    const vehicle = await Vehicle.findOrFail(booking.vehicle_id)

    const baseFare = Number(vehicle.base_price)
    const distanceCharge = Number(booking.distance_km) * Number(vehicle.price_per_km)
    const weightCharge = Number(booking.loading_weight) * 2
    const loadingCharge = booking.loading_required ? 100 : 0
    const unloadingCharge = booking.unloading_required ? 100 : 0
    const totalAmount = Number((baseFare + distanceCharge + weightCharge + loadingCharge + unloadingCharge).toFixed(2))

    const tripCharge = await TripCharge.create({
      booking_id: booking.id,
      base_fare: baseFare,
      distance_charge: distanceCharge,
      weight_charge: weightCharge,
      loading_charge: loadingCharge,
      unloading_charge: unloadingCharge,
      total_amount: totalAmount,
    })

    return response.status(201).json({
      message: 'Trip charges calculated successfully',
      tripCharge,
    })
  }
}