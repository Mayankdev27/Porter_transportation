import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2),
    email: vine.string().email(),
    mobile: vine.string().trim().minLength(10).maxLength(15),
    role: vine.enum(['user', 'driver']),
  })
)