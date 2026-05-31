import apiClient from './apiClient';

export const getCabs = async () => {
  const response = await apiClient.get('/cabs');
  return response.data;
};

export const getCabById = async (id) => {
  const response = await apiClient.get(`/cabs/${id}`);
  return response.data;
};

export const addCab = async (data) => {
  const response = await apiClient.post('/cabs', data);
  return response.data;
};

export const updateCab = async (id, data) => {
  const response = await apiClient.put(`/cabs/${id}`, data);
  return response.data;
};

export const deleteCab = async (id) => {
  const response = await apiClient.delete(`/cabs/${id}`);
  return response.data;
};
