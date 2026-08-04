import api from './api';

export const loginApi = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data.data;
};

export const registerApi = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data.data;
};

export const getProfileApi = async () => {
  const response = await api.get('/auth/profile');
  return response.data.data;
};

export const changePasswordApi = async (passwordData) => {
  const response = await api.put('/auth/change-password', passwordData);
  return response.data.data;
};
