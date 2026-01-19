import Booking from '#models/booking'
import PDFDocument from 'pdfkit'
import ExcelJS from 'exceljs'

export default class ReportsService {


  async generateBookingPDF(bookingId: number) {
    const booking = await Booking.query()
      .where('id', bookingId)
      .preload('user')
      .preload('vehicle')
      .preload('trip', (query) => {
        query.preload('driver', (q) => q.preload('user'))
      })
      .preload('tripCharge')
      .preload('payment')
      .firstOrFail()

    const doc = new PDFDocument({ margin: 50 })

    doc.fontSize(24).font('Helvetica-Bold').text('BOOKINGS DETAILS', { align: 'center' })
    doc.moveDown()

    doc.fontSize(14).font('Helvetica-Bold').text('Customer Details')
    doc.fontSize(11).font('Helvetica')
    doc.text(`Name: ${booking.user.name}`)
    doc.text(`Email: ${booking.user.email}`)
    doc.text(`Mobile: ${booking.user.mobile}`)
    doc.moveDown()

    doc.fontSize(14).font('Helvetica-Bold').text('Booking Information')
    doc.fontSize(11).font('Helvetica')
    doc.text(`Pickup: ${booking.pickup_address}`)
    doc.text(`Drop: ${booking.drop_address}`)
    doc.text(`Distance: ${booking.distance_km} km`)
    doc.text(`Vehicle: ${booking.vehicle_type.toUpperCase()}`)
    doc.text(`Status: ${booking.status.toUpperCase()}`)

    return doc
  }

  async generateBookingsExcel() {
    const bookings = await Booking.query()
      .preload('user')
      .preload('vehicle')
      .preload('tripCharge')
      .preload('payment')

    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet('Bookings')

    sheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Customer', key: 'customer', width: 20 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Pickup', key: 'pickup', width: 30 },
      { header: 'Drop', key: 'drop', width: 30 },
      { header: 'Distance', key: 'distance', width: 12 },
      { header: 'Vehicle', key: 'vehicle', width: 12 },
      { header: 'Amount', key: 'amount', width: 12 },
      { header: 'Status', key: 'status', width: 12 },
    ]

    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } }
    sheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0070C0' },
    }

    bookings.forEach((booking) => {
      sheet.addRow({
        id: booking.id,
        customer: booking.user.name,
        email: booking.user.email,
        pickup: booking.pickup_address,
        drop: booking.drop_address,
        distance: `${booking.distance_km} km`,
        vehicle: booking.vehicle_type.toUpperCase(),
        amount: booking.tripCharge?.total_amount,
        status: booking.status.toUpperCase(),
      })
    })

    return workbook
  }
}
