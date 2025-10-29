import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Calendar, Users, Mail, Phone, Home } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface LocationState {
  success: boolean;
  bookingData?: {
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

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  if (!state) {
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

  const { success, bookingData, error } = state;

  if (!success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-4">
          <div className="card p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Booking Failed
            </h1>
            
            <p className="text-gray-600 mb-6">
              {error || 'Something went wrong while processing your booking. Please try again.'}
            </p>

            <div className="space-y-3">
              <button
                onClick={() => navigate(-1)}
                className="w-full btn-secondary"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full btn-primary"
              >
                <Home className="w-4 h-4 inline mr-2" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Booking Confirmed!
          </h1>
          
          <p className="text-lg text-gray-600">
            Your adventure awaits! We've sent a confirmation to your email.
          </p>
        </div>

        {/* Booking Details */}
        {bookingData && (
          <div className="card p-8 mb-6">
            <div className="border-b pb-6 mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
                <span className="badge bg-green-100 text-green-700">
                  {bookingData.status?.toUpperCase() || 'CONFIRMED'}
                </span>
              </div>
              <p className="text-sm text-gray-500">Booking ID: #{bookingData.bookingId}</p>
            </div>

            <div className="space-y-6">
              {/* Experience */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {bookingData.experienceTitle}
                </h3>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-gray-900">
                      {bookingData.date ? format(parseISO(bookingData.date), 'EEEE, MMMM d, yyyy') : 'Date not available'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium text-gray-900">{bookingData.time}</p>
                  </div>
                </div>
              </div>

              {/* Guest Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Number of Guests</p>
                    <p className="font-medium text-gray-900">{bookingData.numberOfPeople}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{bookingData.customerEmail}</p>
                  </div>
                </div>
              </div>

              {/* Customer Name */}
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Booked by</p>
                  <p className="font-medium text-gray-900">{bookingData.customerName}</p>
                </div>
              </div>

              {/* Pricing */}
              <div className="border-t pt-6">
                <div className="space-y-2 text-sm">
                  {bookingData.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount Applied</span>
                      <span>-₹{bookingData.discount?.toLocaleString() || '0'}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-lg pt-2">
                    <span className="font-semibold text-gray-900">Total Paid</span>
                    <span className="text-2xl font-bold text-primary-600">
                      ₹{bookingData.totalPrice?.toLocaleString() || '0'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="card p-6 bg-blue-50 border-blue-200 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Check your email for booking confirmation and details</li>
            <li>• You'll receive a reminder 24 hours before your experience</li>
            <li>• Arrive 15 minutes early at the meeting point</li>
            <li>• Bring a valid ID and this confirmation number</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 btn-primary"
          >
            <Home className="w-4 h-4 inline mr-2" />
            Browse More Experiences
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 btn-secondary"
          >
            Print Confirmation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
