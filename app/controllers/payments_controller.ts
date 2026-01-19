import type { HttpContext } from '@adonisjs/core/http'
import PaymentService from '#services/payment_service'
import { createPaymentValidator } from '#validators/payment'

export default class PaymentsController {
  private paymentService = new PaymentService()

  async store({ request, response }: HttpContext) {
    try {
      const { booking_id, payment_mode } = await request.validateUsing(createPaymentValidator)
      const payment = await this.paymentService.createPayment(booking_id, payment_mode)
      return response.status(201).json({
        message: 'Payment completed successfully',
        payment,
      })
    } catch (error) {
      return response.status(400).json({
        message: 'Failed to process payment',
        error
      })
    }
  }
}