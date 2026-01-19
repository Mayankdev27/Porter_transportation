import type { HttpContext } from '@adonisjs/core/http'
import ReportsService from '#services/report_service'

export default class ReportsController {
  private reportsService = new ReportsService()

  async bookingPDF({ params, response }: HttpContext) {
    const doc = await this.reportsService.generateBookingPDF(params.id)

    response.header('Content-Type', 'application/pdf')
    response.header(
      'Content-Disposition',
      `attachment; filename=Bookings_details-${params.id}.pdf`
    )

    response.stream(doc)
    doc.end()
  }

  async bookingsExcel({ response }: HttpContext) {
    const workbook = await this.reportsService.generateBookingsExcel()

    response.header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    response.header('Content-Disposition', 'attachment; filename=bookings.xlsx')

    const buffer = await workbook.xlsx.writeBuffer()
    return response.send(buffer)
  }
}
