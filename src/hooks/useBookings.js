import { useState, useCallback } from 'react';
import * as bookingService from '../services/bookingService';
import * as rideService from '../services/rideService';
import { useBookingStore } from '../store/bookingStore';

export const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { activeRide, activeBooking, setActiveRide, setActiveBooking } = useBookingStore();

  const fetchMyBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await bookingService.getMyBookings();
      if (response.success && response.data) {
        setBookings(response.data);
      } else {
        setError(response.message || 'Failed to fetch bookings');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRequestRide = async (rideDetails) => {
    setLoading(true);
    setError(null);
    try {
      const response = await rideService.createRide(rideDetails);
      if (response.success && response.data) {
        setActiveRide(response.data);
      }
      return response;
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'An error occurred';
      setError(errMsg);
      return { success: false, message: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async (rideId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await bookingService.createBooking(rideId);
      if (response.success && response.data) {
        setActiveBooking(response.data);
      }
      return response;
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'An error occurred';
      setError(errMsg);
      return { success: false, message: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await bookingService.cancelBooking(id);
      if (response.success) {
        setBookings((prev) => prev.map((b) => b._id === id ? { ...b, status: 'cancelled' } : b));
      }
      return response;
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'An error occurred';
      setError(errMsg);
      return { success: false, message: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const handleRateBooking = async (id, rating, review) => {
    setLoading(true);
    setError(null);
    try {
      const response = await bookingService.updateBooking(id, { rating, review, status: 'completed' });
      if (response.success) {
        setBookings((prev) => prev.map((b) => b._id === id ? { ...b, rating, review, status: 'completed' } : b));
      }
      return response;
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'An error occurred';
      setError(errMsg);
      return { success: false, message: errMsg };
    } finally {
      setLoading(false);
    }
  };

  return {
    bookings,
    activeRide,
    activeBooking,
    loading,
    error,
    fetchMyBookings,
    requestRide: handleRequestRide,
    confirmBooking: handleConfirmBooking,
    cancelBooking: handleCancelBooking,
    rateBooking: handleRateBooking,
  };
};
