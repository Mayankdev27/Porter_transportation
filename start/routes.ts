import router from '@adonisjs/core/services/router'

import UsersController from '#controllers/users_controller'
import VehiclesController from '#controllers/vehicles_controller'
import BookingsController from '#controllers/bookings_controller'
import TripChargesController from '#controllers/trip_charges_controller'
import PaymentsController from '#controllers/payments_controller'


router.get('/users', [UsersController, 'index'])
router.post('/users', [UsersController, 'store'])
router.get('/users/:id/bookings', [UsersController, 'bookings'])
router.get('/vehicles', [VehiclesController, 'index'])
router.post('/vehicles', [VehiclesController, 'store'])
router.post('/bookings', [BookingsController, 'store'])
router.post('/bookings/:id/assign', [BookingsController, 'assign'])
router.patch('/bookings/:id/status', [BookingsController, 'updateStatus'])
router.put('/bookings/:id/status', [BookingsController, 'updateStatus'])
router.post('/trip-charges', [TripChargesController, 'store'])
router.post('/payments', [PaymentsController, 'store'])