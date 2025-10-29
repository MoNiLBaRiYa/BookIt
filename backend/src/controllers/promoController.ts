import { Request, Response } from 'express';

interface PromoCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
}

const promoCodes: { [key: string]: PromoCode } = {
  'SAVE10': {
    code: 'SAVE10',
    type: 'percentage',
    value: 10,
    description: 'Save 10% on your booking'
  },
  'FLAT100': {
    code: 'FLAT100',
    type: 'fixed',
    value: 100,
    description: 'Get ₹100 off on your booking'
  },
  'WELCOME20': {
    code: 'WELCOME20',
    type: 'percentage',
    value: 20,
    description: 'Welcome offer: 20% off'
  },
  'FIRST50': {
    code: 'FIRST50',
    type: 'fixed',
    value: 50,
    description: 'First booking: ₹50 off'
  }
};

export const validatePromoCode = async (req: Request, res: Response) => {
  try {
    const { code, amount } = req.body;
    
    if (!code || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Code and amount are required'
      });
    }
    
    const promo = promoCodes[code.toUpperCase()];
    
    if (!promo) {
      return res.status(404).json({
        success: false,
        error: 'Invalid promo code'
      });
    }
    
    let discount = 0;
    
    if (promo.type === 'percentage') {
      discount = (amount * promo.value) / 100;
    } else {
      discount = Math.min(promo.value, amount);
    }
    
    const finalAmount = amount - discount;
    
    res.json({
      success: true,
      data: {
        code: promo.code,
        description: promo.description,
        discount: discount,
        originalAmount: amount,
        finalAmount: finalAmount
      }
    });
  } catch (error) {
    console.error('Error validating promo code:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to validate promo code'
    });
  }
};
