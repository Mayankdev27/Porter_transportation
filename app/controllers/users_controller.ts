import type { HttpContext } from '@adonisjs/core/http'
import UserService from '#services/user_service'
import { createUserValidator } from '#validators/user'

export default class UsersController {
  private userService = new UserService()

  async index({ response }: HttpContext) {
    try {
      const users = await this.userService.getAllUsers()
      return response.status(200).json({ data: users })
    } catch (error) {
      return response.status(500).json({
        message: 'Failed to fetch users',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createUserValidator)
      const user = await this.userService.createUser(data)
      return response.status(201).json({
        message: 'User created successfully',
        user,
      })
    } catch (error) {
      return response.status(400).json({
        message: 'Failed to create user',
        error: error.messages || error.message,
      })
    }
  }

  async bookings({ params, response }: HttpContext) {
    try {
      const result = await this.userService.getUserBookings(params.id)
      return response.status(200).json(result)
    } catch (error) {
      return response.status(404).json({
        message: 'User not found',
        error: error.message,
      })
    }
  }
}