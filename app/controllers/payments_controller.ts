import Booking from '#models/booking'
import Trip from '#models/trip'
import Payment from '#models/payment'
import type { HttpContext } from '@adonisjs/core/http'

export default class PaymentsController {
  async store({ request, response }: HttpContext) {
    const booking = await Booking.findOrFail(request.input('booking_id'))
    
    const trip = await Trip.query().where('booking_id', booking.id).firstOrFail()

    const payment = await Payment.create({
      trip_id: trip.id,
      payment_mode: request.input('payment_mode'),
      payment_status: 'Pending',
    })

    return response.status(201).json({
      message: 'Payment initiated',
      payment,
    })
  }
}