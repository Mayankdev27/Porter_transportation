import type { HttpContext } from '@adonisjs/core/http'
import DriverService from '#services/driver_service'
import { createDriverValidator } from '#validators/driver'

export default class DriversController {
  private driverService = new DriverService()

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createDriverValidator)
      const driver = await this.driverService.createDriver(data)
      return response.status(201).json({
        message: 'Driver created successfully',
        driver,
      })
    } catch (error) {
      return response.status(400).json({
        message: 'Failed to create driver',
        error
      })
    }
  }
}