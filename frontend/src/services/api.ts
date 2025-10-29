import axios from 'axios';
import { Experience, BookingData, BookingResponse, PromoCodeValidation } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - server may be slow or unavailable');
    } else if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response from server - check if backend is running');
    } else {
      console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const experiencesAPI = {
  getAll: async (params?: { category?: string; minPrice?: number; maxPrice?: number; search?: string }) => {
    const response = await api.get<{ success: boolean; data: Experience[] }>('/experiences', { params });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<{ success: boolean; data: Experience }>(`/experiences/${id}`);
    return response.data;
  },
};

export const bookingsAPI = {
  create: async (bookingData: BookingData) => {
    const response = await api.post<BookingResponse>('/bookings', bookingData);
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },
};

export const promoAPI = {
  validate: async (code: string, amount: number) => {
    const response = await api.post<PromoCodeValidation>('/promo/validate', { code, amount });
    return response.data;
  },
};

export default api;
