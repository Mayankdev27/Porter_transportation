import User from '#models/user'
import Driver from '#models/driver'

export default class DriverService {
  async createDriver(data: any) {
    const user = await User.create({
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      role: 'driver',
    })

    const driver = await Driver.create({
      user_id: user.id,
      vehicle_id: data.vehicle_id,
      license_no: data.license_no,
      is_available: true,
    })

    await driver.load('user')
    await driver.load('vehicle')

    return driver
  }
}