import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'trip_charges'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('booking_id').unsigned().notNullable().references('id').inTable('bookings')
      table.decimal('base_fare', 10, 2).notNullable()
      table.decimal('distance_charge', 10, 2).notNullable()
      table.decimal('weight_charge', 10, 2).notNullable()
      table.decimal('loading_charge', 10, 2).notNullable()
      table.decimal('unloading_charge', 10, 2).notNullable()
      table.decimal('total_amount', 10, 2).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}