import express from 'express';

const router = express.Router();

// Placeholder booking routes
router.post('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Booking functionality coming soon',
    data: { bookingId: 'mock-booking-' + Date.now() }
  });
});

router.get('/:id', (req, res) => {
  res.json({ 
    success: true, 
    data: { 
      id: req.params.id,
      status: 'confirmed',
      message: 'Mock booking data'
    }
  });
});

export default router;