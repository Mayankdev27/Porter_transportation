import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Trip from './trip.js'

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare trip_id: number

  @column()
  declare payment_mode: 'UPI' | 'CASH' | 'Net_banking'

  @column()
  declare payment_status: 'Complete' | 'Pending'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Trip, {
    foreignKey: 'trip_id',
  })
  declare trip: BelongsTo<typeof Trip>
}