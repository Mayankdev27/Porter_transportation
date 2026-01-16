import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import Booking from './booking.js'
import Driver from './driver.js'
import Payment from './payment.js'

export default class Trip extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare booking_id: number

  @column()
  declare driver_id: number

  @column()
  declare start_time: string | null

  @column()
  declare end_time: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Booking, {
    foreignKey: 'booking_id',
  })
  declare booking: BelongsTo<typeof Booking>

  @belongsTo(() => Driver, {
    foreignKey: 'driver_id',
  })
  declare driver: BelongsTo<typeof Driver>

  @hasOne(() => Payment, {
    foreignKey: 'trip_id',
  })
  declare payment: HasOne<typeof Payment>
}