import vine from '@vinejs/vine'

export const createPaymentValidator = vine.compile(
  vine.object({
    booking_id: vine.number(),
    payment_mode: vine.enum(['cash', 'card', 'upi', 'wallet']),
  })
)