import apiClient from './apiClient';

export const login = async (data) => {
  const response = await apiClient.post('/auth/login', data);
  return response.data;
};

export const register = async (data) => {
  const response = await apiClient.post('/auth/register', data);
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post('/auth/logout');
  return response.data;
};

export const getCurrentUser = async (id) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const updateProfile = async (id, data) => {
  const response = await apiClient.put(`/users/${id}`, data);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
};
