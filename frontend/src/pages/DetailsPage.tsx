import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, Users, Calendar, CheckCircle, ArrowLeft } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import LoadingSpinner from '../components/LoadingSpinner';
import { Experience, Slot } from '../types';
import { experiencesAPI } from '../services/api';

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  useEffect(() => {
    if (id) {
      fetchExperience();
    }
  }, [id]);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const response = await experiencesAPI.getById(Number(id));
      setExperience(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load experience details.');
      console.error('Error fetching experience:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!selectedSlot) {
      alert('Please select a date and time slot');
      return;
    }
    if (numberOfPeople > selectedSlot.availableSpots) {
      alert(`Only ${selectedSlot.availableSpots} spots available`);
      return;
    }
    navigate('/checkout', {
      state: {
        experience,
        slot: selectedSlot,
        numberOfPeople,
      },
    });
  };

  const groupSlotsByDate = (slots: Slot[]) => {
    const grouped: { [key: string]: Slot[] } = {};
    slots?.forEach((slot) => {
      if (!grouped[slot.date]) {
        grouped[slot.date] = [];
      }
      grouped[slot.date].push(slot);
    });
    return grouped;
  };

  if (loading) return <LoadingSpinner />;

  if (error || !experience) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Experience not found'}</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const groupedSlots = groupSlotsByDate(experience.slots || []);
  const totalPrice = experience.price * numberOfPeople;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Experiences
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Experience Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="card overflow-hidden">
              <img
                src={experience.imageUrl}
                alt={experience.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Title and Basic Info */}
            <div className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {experience.title}
                  </h1>
                  <div className="flex items-center text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-1" />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-1" />
                      <span>{experience.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="badge bg-primary-100 text-primary-700">
                  {experience.category}
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="font-semibold">{experience.rating}</span>
                  <span className="text-gray-500 ml-1">
                    ({experience.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About this experience</h2>
              <p className="text-gray-600 leading-relaxed">{experience.description}</p>
            </div>

            {/* Highlights */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Highlights</h2>
              <ul className="space-y-3">
                {experience.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What's Included */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">What's included</h2>
              <ul className="space-y-3">
                {experience.included.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <div className="mb-6">
                <span className="text-gray-600">From</span>
                <p className="text-4xl font-bold text-gray-900">₹{experience.price.toLocaleString()}</p>
                <span className="text-sm text-gray-500">per person</span>
              </div>

              {/* Number of People */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Number of People
                </label>
                <input
                  type="number"
                  min="1"
                  max={selectedSlot?.availableSpots || 10}
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(Math.max(1, parseInt(e.target.value) || 1))}
                  className="input-field"
                />
              </div>

              {/* Available Slots */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Select Date & Time
                </label>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {Object.entries(groupedSlots).length === 0 ? (
                    <p className="text-gray-500 text-sm">No available slots</p>
                  ) : (
                    Object.entries(groupedSlots).map(([date, slots]) => (
                      <div key={date} className="border rounded-lg p-3">
                        <p className="font-medium text-gray-900 mb-2">
                          {date ? format(parseISO(date), 'EEEE, MMMM d, yyyy') : 'Date not available'}
                        </p>
                        <div className="space-y-2">
                          {slots.map((slot) => (
                            <button
                              key={slot.id}
                              onClick={() => setSelectedSlot(slot)}
                              disabled={slot.availableSpots === 0}
                              className={`w-full p-3 rounded-lg border-2 text-left transition-all ${selectedSlot?.id === slot.id ? 'border-primary-600 bg-primary-50' : slot.availableSpots === 0 ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50' : 'border-gray-200 hover:border-primary-300'}`}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900">
                                  {slot.startTime} - {slot.endTime}
                                </span>
                                <span className={`text-sm ${slot.availableSpots === 0 ? 'text-red-600' : 'text-green-600'}`}>
                                  {slot.availableSpots === 0 ? 'Sold Out' : `${slot.availableSpots} spots left`}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">₹{experience.price.toLocaleString()} × {numberOfPeople} {numberOfPeople === 1 ? 'person' : 'people'}</span>
                  <span className="font-semibold text-gray-900">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-primary-600">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={handleBookNow}
                disabled={!selectedSlot}
                className="w-full btn-primary"
              >
                {selectedSlot ? 'Continue to Checkout' : 'Select a slot to continue'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
