import Note from '#models/note'
import type { HttpContext } from '@adonisjs/core/http'


export default class PgNotesController {
async index({response}:HttpContext){
  const data  =  await Note.all();
  return response.status(200).json({
    messages: "All users Data",
    data,
  })
}


  async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'description'])

    const note = await Note.create(data)

    return response.created(note)
  }
  async update({ params, request }: HttpContext) {
    const note = await Note.findOrFail(params.id)

    note.merge(request.only(['title', 'description']))
    await note.save()

    return note
  }

  async destroy({ params, response }: HttpContext) {
    const note = await Note.findOrFail(params.id)
    await note.delete()
    return response.ok({ message: 'Note deleted' })
  }
}
