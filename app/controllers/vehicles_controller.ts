import type { HttpContext } from '@adonisjs/core/http'
import VehicleService from '#services/vehicle_service'
import { createVehicleValidator } from '#validators/vehicle'

export default class VehiclesController {
  private vehicleService = new VehicleService()

  async index({ response }: HttpContext) {
    try {
      const vehicles = await this.vehicleService.getAllVehicles()
      return response.status(200).json({ vehicles })
    } catch (error) {
      return response.status(500).json({
        message: 'Failed to fetch vehicles',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createVehicleValidator)
      const vehicle = await this.vehicleService.createVehicle(data)
      return response.status(201).json({
        message: 'Vehicle created successfully',
        vehicle,
      })
    } catch (error) {
      return response.status(400).json({
        message: 'Failed to create vehicle',
        error: error.messages || error.message,
      })
    }
  }
}