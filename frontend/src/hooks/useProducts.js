import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  setProductFilters,
  clearProductError,
} from '../store/slices/productSlice';

export const useProducts = () => {
  const dispatch = useDispatch();
  const { list, loading, error, filters } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const addProduct = async (productData) => {
    const result = await dispatch(createProduct(productData));
    if (!result.error) {
      dispatch(fetchProducts(filters));
    }
    return result;
  };

  const editProduct = async (id, productData) => {
    const result = await dispatch(updateProduct({ id, data: productData }));
    if (!result.error) {
      dispatch(fetchProducts(filters));
    }
    return result;
  };

  const removeProduct = async (id) => {
    const result = await dispatch(deleteProduct(id));
    if (!result.error) {
      dispatch(fetchProducts(filters));
    }
    return result;
  };

  const updateFilters = (newFilters) => {
    dispatch(setProductFilters(newFilters));
  };

  const clearError = () => {
    dispatch(clearProductError());
  };

  return {
    products: list,
    loading,
    error,
    filters,
    addProduct,
    editProduct,
    removeProduct,
    updateFilters,
    clearError,
    refresh: () => dispatch(fetchProducts(filters)),
  };
};