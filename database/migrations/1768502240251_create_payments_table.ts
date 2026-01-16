
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'payments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('trip_id').unsigned().notNullable().references('id').inTable('trips')
      table.enum('payment_mode',['UPI','CASH','Net_banking']).notNullable()
      table.enum('payment_status',['Complete','Pending']).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
