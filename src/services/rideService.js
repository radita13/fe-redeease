import apiClient from './apiClient';

export const getAllRides = async () => {
  const response = await apiClient.get('/rides');
  return response.data;
};

export const getMyRides = async () => {
  const response = await apiClient.get('/rides/my');
  return response.data;
};

export const getRideEstimate = async (params) => {
  const response = await apiClient.get('/rides/estimate', { params });
  return response.data;
};

export const createRide = async (data) => {
  const response = await apiClient.post('/rides', data);
  return response.data;
};

export const updateRideStatus = async (id, status) => {
  const response = await apiClient.put(`/rides/${id}/status`, { status });
  return response.data;
};

export const cancelRide = async (id) => {
  const response = await apiClient.delete(`/rides/${id}`);
  return response.data;
};
