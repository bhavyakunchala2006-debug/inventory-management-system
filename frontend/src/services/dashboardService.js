import api from './api';

export const getDashboardSummaryApi = async () => {
  const response = await api.get('/dashboard/summary');
  return response.data.data;
};
