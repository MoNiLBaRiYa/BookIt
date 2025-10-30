import express from 'express';
import { createBooking, getBookingById } from '../controllers/bookingController';

const router = express.Router();

// POST /api/bookings - Create a new booking
router.post('/', createBooking);

// GET /api/bookings/:id - Get booking by ID
router.get('/:id', getBookingById);

export default router;