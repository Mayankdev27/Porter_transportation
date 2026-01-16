import Vehicle from '#models/vehicle'
import type { HttpContext } from '@adonisjs/core/http'

export default class VehiclesController {
  async index({ response }: HttpContext) {
    const vehicles = await Vehicle.all()

    return response.json({
      vehicles,
    })
  }

  async store({ request, response }: HttpContext) {
    const vehicleData = request.only(['type', 'max_weight', 'base_price', 'price_per_km'])

    const vehicle = await Vehicle.create(vehicleData)

    return response.status(201).json({
      message: 'Vehicle created successfully',
      vehicle,
    })
  }
}