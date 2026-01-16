import Driver from '#models/driver'

export default class DriverSeeder {
  public async run() {
    await Driver.createMany([
      { user_id: 14, vehicle_id: 1, license_no: 'DL-001', is_available: true },
      { user_id: 2, vehicle_id: 2, license_no: 'DL-002', is_available: true },
      { user_id: 8, vehicle_id: 3, license_no: 'DL-003', is_available: true },
      { user_id: 9, vehicle_id: 3, license_no: 'DL-003', is_available: true },
    ])
  }
}
