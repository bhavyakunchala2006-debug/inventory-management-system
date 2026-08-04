import api from './api';

export const getProductsApi = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data.data;
};

export const getProductByIdApi = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data.data;
};

export const createProductApi = async (formData) => {
  const response = await api.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};

export const updateProductApi = async (id, formData) => {
  const response = await api.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};

export const deleteProductApi = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data.data;
};

export const adjustStockApi = async (stockData) => {
  const response = await api.post('/products/stock-adjustment', stockData);
  return response.data.data;
};
