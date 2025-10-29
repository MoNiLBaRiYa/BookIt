import express from 'express';
import { validatePromoCode } from '../controllers/promoController';

const router = express.Router();

// POST /api/promo/validate - Validate a promo code
router.post('/validate', validatePromoCode);

export default router;
