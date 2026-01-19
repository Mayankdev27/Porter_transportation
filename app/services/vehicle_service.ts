
export default class VehicleService {
  async getAllVehicles() {
    return await Vehicle.all()
  }

  async createVehicle(data: any) {
    return await Vehicle.create(data)
  }
}