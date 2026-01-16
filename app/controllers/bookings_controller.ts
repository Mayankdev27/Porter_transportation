import Booking from '#models/booking'
import Vehicle from '#models/vehicle'
import Driver from '#models/driver'
import Trip from '#models/trip'
import type { HttpContext } from '@adonisjs/core/http'

export default class BookingsController {
  async store({ request, response }: HttpContext) {
    const id = Booking.find('id')
    const data = request.only(['user_id','pickup_address','drop_address','vehicle_type','loading_weight',
      'unloading_weight','distance_km','loading_required','unloading_required',
    ])

    const booking = await Booking.create({
      
      ...data,
      status: 'pending',
      vehicle_id: null,
    })

    return response.status(201).json({

      message: 'Booking created successfully',
      booking,
      id,
    })
  }

  async assign({ params, response }: HttpContext) {
    const booking = await Booking.findOrFail(params.id)

  const vehicle = await Vehicle.query()
  .where('type', booking.vehicle_type)
  .first()

if (!vehicle) {
  return response.badRequest({ message: 'Vehicle not available' })
}

const driver = await Driver.query()
  .where('vehicle_id', vehicle.id)
  .where('is_available', true)
  .first()

if (!driver) {
  return response.badRequest({
    message: 'Driver not available'
  })
}

booking.vehicle_id = vehicle.id
await booking.save()

const trip = await Trip.create({
  booking_id: booking.id,
  driver_id: driver.id,
  start_time: null,
  end_time: null,
})


    driver.is_available = false
    await driver.save()

    return response.json({
      message: 'Driver assigned successfully',
      booking,
      vehicle,
      driver,
      trip,
    })
  }

  async updateStatus({ params, request, response }: HttpContext) {
    const booking = await Booking.findOrFail(params.id)
    booking.status = request.input('status')
    await booking.save()

    return response.json({
      message: 'Booking status updated',

    })
  }
}