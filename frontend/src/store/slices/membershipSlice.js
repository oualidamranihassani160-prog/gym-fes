import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { membershipAPI } from '../../services/api';

export const fetchMemberships = createAsyncThunk(
  'memberships/fetchAll',
  async () => {
    const response = await membershipAPI.getAll();
    return response.data;
  }
);

const membershipSlice = createSlice({
  name: 'memberships',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemberships.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMemberships.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMemberships.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default membershipSlice.reducer;