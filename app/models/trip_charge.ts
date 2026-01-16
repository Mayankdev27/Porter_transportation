import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Booking from './booking.js'

export default class TripCharge extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare booking_id: number

  @column()
  declare base_fare: number

  @column()
  declare distance_charge: number

  @column()
  declare weight_charge: number

  @column()
  declare loading_charge: number

  @column()
  declare unloading_charge: number

  @column()
  declare total_amount: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Booking, {
    foreignKey: 'booking_id',
  })
  declare booking: BelongsTo<typeof Booking>
}