import React, { createContext, useState, useCallback } from 'react';
import { getProductsApi } from '../services/productService';
import { getCategoriesApi } from '../services/categoryService';
import { getSuppliersApi } from '../services/supplierService';

export const InventoryContext = createContext(null);

export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1, limit: 10 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductsApi(params);
      setProducts(data.products || []);
      setPagination(data.pagination || { total: 0, page: 1, pages: 1, limit: 10 });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await getCategoriesApi();
      setCategories(data || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err.message);
    }
  }, []);

  const fetchSuppliers = useCallback(async () => {
    try {
      const data = await getSuppliersApi();
      setSuppliers(data || []);
    } catch (err) {
      console.error('Failed to fetch suppliers:', err.message);
    }
  }, []);

  return (
    <InventoryContext.Provider
      value={{
        products,
        categories,
        suppliers,
        pagination,
        loading,
        error,
        fetchProducts,
        fetchCategories,
        fetchSuppliers,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
