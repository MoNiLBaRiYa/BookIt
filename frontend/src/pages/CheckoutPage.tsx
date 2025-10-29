import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Tag, Loader } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { bookingsAPI, promoAPI } from '../services/api';
import { Experience, Slot } from '../types';

interface LocationState {
  experience: Experience;
  slot: Slot;
  numberOfPeople: number;
}

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
  });

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!state?.experience || !state?.slot) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No booking information found</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const { experience, slot, numberOfPeople } = state;
  const basePrice = experience.price * numberOfPeople;
  const finalPrice = basePrice - discount;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Invalid email format';
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.customerPhone.replace(/\D/g, ''))) {
      newErrors.customerPhone = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    setPromoLoading(true);
    setPromoError('');

    try {
      const response = await promoAPI.validate(promoCode, basePrice);
      if (response.success && response.data) {
        setDiscount(response.data.discount);
        setPromoApplied(true);
        setPromoError('');
      }
    } catch (error: any) {
      setPromoError(error.response?.data?.error || 'Invalid promo code');
      setPromoApplied(false);
      setDiscount(0);
    } finally {
      setPromoLoading(false);
    }
  };

  const handleRemovePromo = () => {
    setPromoCode('');
    setPromoApplied(false);
    setDiscount(0);
    setPromoError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setBookingLoading(true);

    try {
      const bookingData = {
        experienceId: experience.id,
        slotId: slot.id,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        numberOfPeople,
        promoCode: promoApplied ? promoCode : undefined,
      };

      const response = await bookingsAPI.create(bookingData);

      if (response.success) {
        navigate('/result', {
          state: {
            success: true,
            bookingData: response.data,
          },
        });
      }
    } catch (error: any) {
      navigate('/result', {
        state: {
          success: false,
          error: error.response?.data?.error || 'Booking failed. Please try again.',
        },
      });
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete your booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className={`input-field ${errors.customerName ? 'border-red-500' : ''}`}
                      placeholder="Enter your full name"
                    />
                    {errors.customerName && (
                      <p className="text-red-600 text-sm mt-1">{errors.customerName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      className={`input-field ${errors.customerEmail ? 'border-red-500' : ''}`}
                      placeholder="your@email.com"
                    />
                    {errors.customerEmail && (
                      <p className="text-red-600 text-sm mt-1">{errors.customerEmail}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      className={`input-field ${errors.customerPhone ? 'border-red-500' : ''}`}
                      placeholder="10-digit phone number"
                    />
                    {errors.customerPhone && (
                      <p className="text-red-600 text-sm mt-1">{errors.customerPhone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Promo Code</h2>
                
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      disabled={promoApplied}
                      className="input-field"
                      placeholder="Enter promo code"
                    />
                  </div>
                  {!promoApplied ? (
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      disabled={promoLoading}
                      className="btn-secondary whitespace-nowrap"
                    >
                      {promoLoading ? (
                        <Loader className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Tag className="w-4 h-4 mr-2 inline" />
                          Apply
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="btn-secondary whitespace-nowrap"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {promoApplied && discount > 0 && (
                  <p className="text-green-600 text-sm mt-2 flex items-center">
                    <Tag className="w-4 h-4 mr-1" />
                    Promo code applied! You saved ₹{discount.toLocaleString()}
                  </p>
                )}

                {promoError && (
                  <p className="text-red-600 text-sm mt-2">{promoError}</p>
                )}

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium mb-1">Available Promo Codes:</p>
                  <p className="text-xs text-blue-700">SAVE10, FLAT100, WELCOME20, FIRST50</p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={bookingLoading}
                className="w-full btn-primary text-lg py-4"
              >
                {bookingLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader className="w-5 h-5 animate-spin mr-2" />
                    Processing...
                  </span>
                ) : (
                  'Confirm Booking'
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h2>

              <div className="space-y-4">
                <div>
                  <img
                    src={experience.imageUrl}
                    alt={experience.title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-gray-900">{experience.title}</h3>
                  <p className="text-sm text-gray-600">{experience.location}</p>
                </div>

                <div className="border-t pt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="font-medium text-gray-900">
                      {format(parseISO(slot.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time</span>
                    <span className="font-medium text-gray-900">
                      {slot.startTime} - {slot.endTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests</span>
                    <span className="font-medium text-gray-900">{numberOfPeople}</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">₹{experience.price.toLocaleString()} × {numberOfPeople}</span>
                    <span className="text-gray-900">₹{basePrice.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-primary-600">
                      ₹{finalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
