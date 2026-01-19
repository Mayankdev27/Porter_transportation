import vine from '@vinejs/vine'

export const createTripChargeValidator = vine.compile(
  vine.object({
    booking_id: vine.number(),
  })
)