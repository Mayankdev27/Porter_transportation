import router from '@adonisjs/core/services/router'

import UsersController from '#controllers/users_controller'
import VehiclesController from '#controllers/vehicles_controller'
import BookingsController from '#controllers/bookings_controller'
import TripChargesController from '#controllers/trip_charges_controller'
import PaymentsController from '#controllers/payments_controller'
import DriversController from '#controllers/drivers_controller'
import ReportsController from '#controllers/reports_controller'
import PgNotesController from '#controllers/pg_notes_controller'



router.group(() => {
  router.get('/pg/notes',[PgNotesController,'index'])
  router.post('/pg/notes', [PgNotesController, 'store'])
  router.put('/pg/notes/:id', [PgNotesController, 'update'])
  router.delete('/pg/notes/:id', [PgNotesController, 'destroy'])
}).prefix('/api')




router.group(() => {
  router.get('/users', [UsersController, 'index'])
  router.post('/users', [UsersController, 'store'])
  router.get('/users/:id/bookings', [UsersController, 'bookings'])
  router.get('/vehicles', [VehiclesController, 'index'])
  router.post('/vehicles', [VehiclesController, 'store'])
  router.post('/drivers', [DriversController, 'store']) // New route
  router.post('/bookings', [BookingsController, 'store'])
  router.post('/bookings/:id/assign', [BookingsController, 'assign'])
  router.patch('/bookings/:id/status', [BookingsController, 'updateStatus'])
  router.put('/bookings/:id/status', [BookingsController, 'updateStatus'])
  router.post('/trip-charges', [TripChargesController, 'store'])
  router.post('/payments', [PaymentsController, 'store'])
    router.get('/reports/booking/:id/pdf', [ReportsController, 'bookingPDF'])
  router.get('/reports/bookings/excel', [ReportsController, 'bookingsExcel'])
}).prefix('/api')