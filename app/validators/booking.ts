import vine from '@vinejs/vine'

export const createBookingValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    pickup_address: vine.string(),
    drop_address: vine.string(),
    vehicle_type: vine.string(),
    loading_weight: vine.number(),
    unloading_weight: vine.number(),
    distance_km: vine.number(),
    loading_required: vine.boolean(),
    unloading_required: vine.boolean(),
  })
)
