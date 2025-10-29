export interface Experience {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  duration: string;
  category: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  included: string[];
  slots?: Slot[];
}

export interface Slot {
  id: number;
  experienceId: number;
  date: string;
  startTime: string;
  endTime: string;
  availableSpots: number;
  totalSpots: number;
}

export interface BookingData {
  experienceId: number;
  slotId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numberOfPeople: number;
  promoCode?: string;
}

export interface BookingResponse {
  success: boolean;
  message?: string;
  data?: {
    bookingId: number;
    customerName: string;
    customerEmail: string;
    experienceTitle: string;
    date: string;
    time: string;
    numberOfPeople: number;
    totalPrice: number;
    discount: number;
    status: string;
  };
  error?: string;
}

export interface PromoCodeValidation {
  success: boolean;
  data?: {
    code: string;
    description: string;
    discount: number;
    originalAmount: number;
    finalAmount: number;
  };
  error?: string;
}
