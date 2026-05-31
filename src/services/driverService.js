import apiClient from './apiClient';

export const getDrivers = async () => {
  const response = await apiClient.get('/drivers');
  return response.data;
};

export const getDriverById = async (id) => {
  const response = await apiClient.get(`/drivers/${id}`);
  return response.data;
};

export const addDriver = async (data) => {
  const response = await apiClient.post('/drivers', data);
  return response.data;
};

export const updateDriver = async (id, data) => {
  const response = await apiClient.put(`/drivers/${id}`, data);
  return response.data;
};

export const deleteDriver = async (id) => {
  const response = await apiClient.delete(`/drivers/${id}`);
  return response.data;
};
