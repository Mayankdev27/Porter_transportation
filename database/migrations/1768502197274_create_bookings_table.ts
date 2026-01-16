import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.string('pickup_address', 250).notNullable()
      table.string('drop_address', 250).notNullable()
      table.integer('loading_weight').notNullable()
      table.integer('unloading_weight').notNullable()
      table.enum('vehicle_type', ['2w', '3w', '4w']).notNullable()
      table.integer('vehicle_id').unsigned().references('id').inTable('vehicles')
      table.decimal('distance_km', 10, 2).notNullable()
      table.boolean('loading_required').notNullable()
      table.boolean('unloading_required').notNullable()

      table.enum('status', ['pending', 'completed']).defaultTo('pending')

      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
