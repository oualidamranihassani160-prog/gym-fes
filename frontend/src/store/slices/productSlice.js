import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productAPI } from '../../services/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (filters = {}) => {
    const params = { ...filters };
    if (Object.prototype.hasOwnProperty.call(params, 'sortBy')) {
      params.sort_by = params.sortBy;
      delete params.sortBy;
    }
    if (Object.prototype.hasOwnProperty.call(params, 'sortDir')) {
      params.sort_dir = params.sortDir;
      delete params.sortDir;
    }

    const response = await productAPI.getAll(params);
    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  'products/create',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await productAPI.create(productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.errors || 'Create failed');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, data }) => {
    const response = await productAPI.update(id, data);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id) => {
    await productAPI.delete(id);
    return id;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    loading: false,
    error: null,
    filters: {
      search: '',
      sortBy: 'name',
      sortDir: 'asc',
    },
  },
  reducers: {
    setProductFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearProductError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter(p => p.id !== action.payload);
      });
  },
});

export const { setProductFilters, clearProductError } = productSlice.actions;
export default productSlice.reducer;