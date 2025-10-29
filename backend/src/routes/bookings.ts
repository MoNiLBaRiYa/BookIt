import express from 'express';
import { body } from 'express-validator';
import { createBooking, getBookingById } from '../controllers/bookingController';

const router = express.Router();

// POST /api/bookings - Create a new booking
router.post(
  '/',
  [
    body('experienceId').isInt().withMessage('Experience ID must be a number'),
    body('slotId').isInt().withMessage('Slot ID must be a number'),
    body('customerName').trim().notEmpty().withMessage('Customer name is required'),
    body('customerEmail').isEmail().withMessage('Valid email is required'),
    body('customerPhone').trim().notEmpty().withMessage('Phone number is required'),
    body('numberOfPeople').isInt({ min: 1 }).withMessage('Number of people must be at least 1'),
  ],
  createBooking
);

// GET /api/bookings/:id - Get booking by ID
router.get('/:id', getBookingById);

export default router;
