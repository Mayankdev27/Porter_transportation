import type { HttpContext } from '@adonisjs/core/http'
import TripChargeService from '#services/trip_charge_service'
import { createTripChargeValidator } from '#validators/trip_charge'

export default class TripChargesController {
  private tripChargeService = new TripChargeService()

  async store({ request, response }: HttpContext) {
    try {
      const { booking_id } = await request.validateUsing(createTripChargeValidator)
      const tripCharge = await this.tripChargeService.calculateTripCharges(booking_id)
      return response.status(201).json({
        message: 'Trip charges calculated successfully',
        tripCharge,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      })
    }
  }
}