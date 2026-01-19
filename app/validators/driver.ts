import vine from '@vinejs/vine'

export const createDriverValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2),
    email: vine.string().email(),
    mobile: vine.string().trim().minLength(10).maxLength(15),
    license_no: vine.string().trim(),
    vehicle_id: vine.number(),
  })
)