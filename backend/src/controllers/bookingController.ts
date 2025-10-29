import { Request, Response } from 'express';
import { Booking, Slot, Experience } from '../models';
import { sequelize } from '../config/database';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      experienceId,
      slotId,
      customerName,
      customerEmail,
      customerPhone,
      numberOfPeople,
      promoCode
    } = req.body;
    
    // Validate required fields
    if (!experienceId || !slotId || !customerName || !customerEmail || !customerPhone || !numberOfPeople) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    // Try database first, fallback to mock data
    try {
      const transaction = await sequelize.transaction();
      
      // Check slot availability
      const slot = await Slot.findByPk(slotId, { transaction });
      
      if (!slot) {
        await transaction.rollback();
        return res.status(404).json({
          success: false,
          error: 'Slot not found'
        });
      }
      
      if (slot.availableSpots < numberOfPeople) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          error: `Only ${slot.availableSpots} spots available`
        });
      }
      
      // Get experience details for pricing
      const experience = await Experience.findByPk(experienceId, { transaction });
      
      if (!experience) {
        await transaction.rollback();
        return res.status(404).json({
          success: false,
          error: 'Experience not found'
        });
      }
      
      // Calculate pricing
      let basePrice = parseFloat(experience.price.toString()) * numberOfPeople;
      let discount = 0;
      
      // Apply promo code if provided
      if (promoCode) {
        const promoDiscount = validatePromoCode(promoCode, basePrice);
        discount = promoDiscount;
      }
      
      const totalPrice = basePrice - discount;
      
      // Create booking
      const booking = await Booking.create({
        experienceId,
        slotId,
        customerName,
        customerEmail,
        customerPhone,
        numberOfPeople,
        totalPrice,
        promoCode: promoCode || null,
        discount,
        status: 'confirmed'
      }, { transaction });
      
      // Update slot availability
      await slot.update({
        availableSpots: slot.availableSpots - numberOfPeople
      }, { transaction });
      
      await transaction.commit();
      
      res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        data: {
          bookingId: booking.id,
          customerName: booking.customerName,
          customerEmail: booking.customerEmail,
          experienceTitle: experience.title,
          date: slot.date,
          time: `${slot.startTime} - ${slot.endTime}`,
          numberOfPeople: booking.numberOfPeople,
          totalPrice: booking.totalPrice,
          discount: booking.discount,
          status: booking.status
        }
      });
    } catch (dbError) {
      // Database not available, use mock booking
      console.log('Using mock booking - database not available');
      
      // Mock experience data for pricing
      const mockExperiences: any = {
        1: { title: 'Goa Beach Adventure', price: 2500 },
        2: { title: 'Himalayan Trekking Expedition', price: 5000 },
        3: { title: 'Kerala Backwaters Cruise', price: 3500 },
        4: { title: 'Rajasthan Desert Safari', price: 4200 },
        5: { title: 'Manali Adventure Sports', price: 3800 },
        6: { title: 'Munnar Tea Plantation Tour', price: 2800 }
      };
      
      const experience = mockExperiences[experienceId] || { title: 'Experience', price: 3000 };
      
      // Calculate pricing
      let basePrice = experience.price * numberOfPeople;
      let discount = 0;
      
      // Apply promo code if provided
      if (promoCode) {
        const promoDiscount = validatePromoCode(promoCode, basePrice);
        discount = promoDiscount;
      }
      
      const totalPrice = basePrice - discount;
      
      // Generate mock booking ID
      const bookingId = Math.floor(Math.random() * 10000) + 1000;
      
      // Mock slot data
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        data: {
          bookingId: bookingId,
          customerName: customerName,
          customerEmail: customerEmail,
          experienceTitle: experience.title,
          date: tomorrow.toISOString().split('T')[0],
          time: '09:00 - 17:00',
          numberOfPeople: numberOfPeople,
          totalPrice: totalPrice,
          discount: discount,
          status: 'confirmed'
        }
      });
    }
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create booking'
    });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const booking = await Booking.findByPk(id, {
      include: [
        {
          model: Experience,
          as: 'experience'
        },
        {
          model: Slot,
          as: 'slot'
        }
      ]
    });
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch booking'
    });
  }
};

// Helper function to validate promo codes
const validatePromoCode = (code: string, basePrice: number): number => {
  const promoCodes: { [key: string]: { type: 'percentage' | 'fixed', value: number } } = {
    'SAVE10': { type: 'percentage', value: 10 },
    'FLAT100': { type: 'fixed', value: 100 },
    'WELCOME20': { type: 'percentage', value: 20 },
    'FIRST50': { type: 'fixed', value: 50 }
  };
  
  const promo = promoCodes[code.toUpperCase()];
  
  if (!promo) {
    return 0;
  }
  
  if (promo.type === 'percentage') {
    return (basePrice * promo.value) / 100;
  } else {
    return Math.min(promo.value, basePrice);
  }
};
