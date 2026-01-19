import vine from '@vinejs/vine'

export const createVehicleValidator = vine.compile(
  vine.object({
    type: vine.string().trim(),
    max_weight: vine.number().min(0),
    base_price: vine.number().min(0),
    price_per_km: vine.number().min(0),
  })
)