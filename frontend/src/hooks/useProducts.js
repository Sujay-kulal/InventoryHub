import { useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (searchTerm = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getProducts(searchTerm);
      // Backend returns { success: true, data: [...], count: N }
      setProducts(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (data) => {
    setError(null);
    try {
      await api.createProduct(data);
      await fetchProducts();
    } catch (err) {
      setError(err.message || 'Failed to add product');
      throw err;
    }
  };

  const editProduct = async (id, data) => {
    setError(null);
    try {
      await api.updateProduct(id, data);
      await fetchProducts();
    } catch (err) {
      setError(err.message || 'Failed to update product');
      throw err;
    }
  };

  const removeProduct = async (id) => {
    setError(null);
    try {
      await api.deleteProduct(id);
      await fetchProducts();
    } catch (err) {
      setError(err.message || 'Failed to delete product');
      throw err;
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    editProduct,
    removeProduct
  };
};
