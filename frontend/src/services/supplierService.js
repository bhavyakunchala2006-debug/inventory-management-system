import api from './api';

export const getSuppliersApi = async () => {
  const response = await api.get('/suppliers');
  return response.data.data;
};

export const createSupplierApi = async (data) => {
  const response = await api.post('/suppliers', data);
  return response.data.data;
};

export const updateSupplierApi = async (id, data) => {
  const response = await api.put(`/suppliers/${id}`, data);
  return response.data.data;
};

export const deleteSupplierApi = async (id) => {
  const response = await api.delete(`/suppliers/${id}`);
  return response.data.data;
};
