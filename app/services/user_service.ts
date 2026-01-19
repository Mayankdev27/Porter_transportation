import User from '#models/user'

export default class UserService {
  async getAllUsers() {
    return await User.all()
  }

  async createUser(data: any) {
    return await User.create(data)
  }

  async getUserBookings(userId: number) {
    const user = await User.findOrFail(userId)
    const bookings = await user.related('bookings').query()

    const result = []

    for (const booking of bookings) {
      const vehicle = booking.vehicle_id
        ? await booking.related('vehicle').query().first()
        : null
      
      const trip = await booking.related('trip').query().first()
      const tripCharge = await booking.related('tripCharge').query().first()
      const payment = trip ? await trip.related('payment').query().first() : null

      result.push({ booking, vehicle, trip, tripCharge, payment })
    }

    return { user, bookings: result }
  }
}