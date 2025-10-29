import express from 'express';

const router = express.Router();

// Placeholder promo routes
router.post('/validate', (req, res) => {
  const { code } = req.body;
  
  // Mock promo codes
  const validCodes = {
    'SAVE10': { discount: 10, type: 'percentage' },
    'WELCOME': { discount: 500, type: 'fixed' },
    'ADVENTURE': { discount: 15, type: 'percentage' }
  };
  
  if (validCodes[code as keyof typeof validCodes]) {
    res.json({
      success: true,
      data: {
        valid: true,
        ...validCodes[code as keyof typeof validCodes]
      }
    });
  } else {
    res.json({
      success: false,
      error: 'Invalid promo code'
    });
  }
});

export default router;