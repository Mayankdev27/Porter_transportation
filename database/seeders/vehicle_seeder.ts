import Vehicle from '#models/vehicle'

export default class VehicleSeeder {
  public async run() {
    await Vehicle.createMany([
      { type: '2w', max_weight: 50, base_price: 50, price_per_km: 5 },
      { type: '3w', max_weight: 200, base_price: 100, price_per_km: 10 },
      { type: '4w', max_weight: 500, base_price: 200, price_per_km: 20 },
    ])
  }
}
