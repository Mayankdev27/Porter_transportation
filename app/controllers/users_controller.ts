import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ response }: HttpContext) {
    const id =await User.find('id')
    const data = await User.all()

    return response.json({
      id,
      data,
    })
  }

  async store({ request, response }: HttpContext) {
    const userData = request.only(['name', 'email', 'mobile', 'role'])

    const user = await User.create({
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile,
      role: userData.role,
    })

    return response.status(201).json({
      message: 'User created successfully',
      user,
    })
  }

  async bookings({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)

    const bookings = await user.related('bookings').query()

    const result = []

    for (const booking of bookings) {
      const vehicle = booking.vehicle_id
        ? await booking.related('vehicle').query().first()
        : null
      
      const trip = await booking.related('trip').query().first()
      
      const tripCharge = await booking.related('tripCharge').query().first()
      
      const payment = trip
        ? await trip.related('payment').query().first()
        : null

      result.push({booking, vehicle,trip, tripCharge, payment, })
    }

    return response.json({
      user,
      bookings: result,
    })
  }
}