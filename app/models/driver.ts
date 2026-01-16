import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id :number

  @column()
  declare vehicle_id :number

  @column()
  declare license_no :string

  @column()
  declare is_available: boolean


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}