import Booking from '#models/booking'
import Vehicle from '#models/vehicle'
import Driver from '#models/driver'
import Trip from '#models/trip'

export default class BookingService {
  async createBooking(data: any) {
    return await Booking.create({
      ...data,
      status: 'pending',
      vehicle_id: null,
    })
  }

  async assignDriver(bookingId: number) {
    const booking = await Booking.findOrFail(bookingId)

    const vehicle = await Vehicle.query()
      .where('type', booking.vehicle_type)
      .first()

    if (!vehicle) {
      throw new Error('Vehicle not available')
    }

    const availableDrivers = await Driver.query()
      .where('vehicle_id', vehicle.id)
      .where('is_available', true)

    if (availableDrivers.length === 0) {
      throw new Error('No drivers available')
    }

    const randomIndex = Math.floor(Math.random() * availableDrivers.length)
    const driver = availableDrivers[randomIndex]

    booking.vehicle_id = vehicle.id
    await booking.save()

    const trip = await Trip.create({
      booking_id: booking.id,
      driver_id: driver.id,
      start_time: null,
      end_time: null,
    })

    driver.is_available = false
    await driver.save()

    await driver.load('user')

    return { booking, vehicle, driver, trip }
  }

  async updateBookingStatus(bookingId: number, status: string) {
    const booking = await Booking.findOrFail(bookingId)
    booking.status = status
    await booking.save()

    if (status === 'completed') {
      const trip = await Trip.query().where('booking_id', booking.id).first()
      
      if (trip) {
        const driver = await Driver.find(trip.driver_id)
        if (driver) {
          driver.is_available = true
          await driver.save()
        }
      }
    }

    return booking
  }
}