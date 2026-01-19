import type { HttpContext } from '@adonisjs/core/http'
import BookingService from '#services/booking_service'
import { createBookingValidator} from '#validators/booking'

export default class BookingsController {
  private bookingService = new BookingService()

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createBookingValidator)
      const booking = await this.bookingService.createBooking(data)
      return response.status(201).json({
        message: 'Booking created successfully',
        booking,
      })
    } catch (error) {
      return response.status(400).json({
        message: 'Failed to create booking',
      })
    }
  }

  async assign({ params, response }: HttpContext) {
    try {
      const result = await this.bookingService.assignDriver(params.id)
      return response.status(200).json({
        message: 'Driver assigned successfully',
        booking: result.booking,
        vehicle: result.vehicle,
        driver: {
          id: result.driver.id,
          license_no: result.driver.license_no,
          user: result.driver.user,
        },
        trip: result.trip,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      })
    }
  }

  async updateStatus({ params, request, response }: HttpContext) {
    try {
      const status = request.input('status')
      const booking = await this.bookingService.updateBookingStatus(params.id, status)
      return response.status(200).json({
        message: 'Booking status updated',
        booking,
      })
    } catch (error) {
      return response.status(400).json({
        message: 'Failed to update booking status',
        error
      })
    }
  }
}