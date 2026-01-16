import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UserSeeder from './user_seeder.js'
import VehicleSeeder from './vehicle_seeder.js'
import DriverSeeder from './driver_seeder.js'

export default class IndexSeeder extends BaseSeeder {
  private async seed(Seeder: { new (): BaseSeeder }): Promise<void> {
    await new Seeder().run()
  }

  public async run() {
    
    await this.seed(VehicleSeeder)
    await this.seed(DriverSeeder) 
  }
}