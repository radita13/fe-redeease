import apiClient from './apiClient';

export const getAllBookings = async () => {
  const response = await apiClient.get('/bookings');
  return response.data;
};

export const getMyBookings = async () => {
  const response = await apiClient.get('/bookings/my');
  return response.data;
};

export const createBooking = async (rideId) => {
  const response = await apiClient.post('/bookings', { ride: rideId });
  return response.data;
};

export const updateBooking = async (id, data) => {
  const response = await apiClient.put(`/bookings/${id}`, data);
  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await apiClient.delete(`/bookings/${id}`);
  return response.data;
};
