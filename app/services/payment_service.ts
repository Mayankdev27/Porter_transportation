import Booking from '#models/booking'
import Trip from '#models/trip'
import Payment from '#models/payment'

export default class PaymentService {
  async createPayment(bookingId: number, paymentMode: string) {
    const booking = await Booking.findOrFail(bookingId)
    const trip = await Trip.query().where('booking_id', booking.id).firstOrFail()

    const payment = await Payment.create({
      trip_id: trip.id,
      payment_mode: paymentMode,
      payment_status: 'Complete',
    })

    return payment
  }
}