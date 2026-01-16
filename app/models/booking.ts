import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Vehicle from './vehicle.js'
import Trip from './trip.js'
import TripCharge from './trip_charge.js'
import Payment from './payment.js'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare pickup_address: string

  @column()
  declare drop_address: string

  @column()
  declare loading_weight: number

  @column()
  declare unloading_weight: number

  @column()
  declare vehicle_type: '2w' | '3w' | '4w'

  @column()
  declare vehicle_id: number | null

  @column()
  declare distance_km: number

  @column()
  declare loading_required: boolean

  @column()
  declare unloading_required: boolean

  @column()
  declare status: 'pending' | 'completed'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Vehicle, {
    foreignKey: 'vehicle_id',
  })
  declare vehicle: BelongsTo<typeof Vehicle>

  @hasOne(() => Trip, {
    foreignKey: 'booking_id',
  })
  declare trip: HasOne<typeof Trip>

  @hasOne(() => TripCharge, {
    foreignKey: 'booking_id',
  })
  declare tripCharge: HasOne<typeof TripCharge>

  @hasOne(() => Payment, {
    foreignKey: 'trip_id',
    localKey: 'id',
  })
  declare payment: HasOne<typeof Payment>
}