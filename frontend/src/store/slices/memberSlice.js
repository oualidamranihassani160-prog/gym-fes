import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { memberAPI } from '../../services/api';

export const fetchMembers = createAsyncThunk(
  'members/fetchAll',
  async (filters = {}) => {
    // map frontend filter keys to backend query params
    const params = { ...filters };
    if (Object.prototype.hasOwnProperty.call(params, 'membershipId')) {
      if (params.membershipId === '' || params.membershipId == null) {
        delete params.membershipId;
      } else {
        params.membership_id = params.membershipId;
        delete params.membershipId;
      }
    }

    const response = await memberAPI.getAll(params);
    return response.data;
  }
);

export const createMember = createAsyncThunk(
  'members/create',
  async (memberData, { rejectWithValue }) => {
    try {
      const response = await memberAPI.create(memberData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.errors || 'Create failed');
    }
  }
);

export const updateMember = createAsyncThunk(
  'members/update',
  async ({ id, data }) => {
    const response = await memberAPI.update(id, data);
    return response.data;
  }
);

export const renewMember = createAsyncThunk(
  'members/renew',
  async ({ id, membershipId }) => {
    const response = await memberAPI.renew(id, membershipId);
    return response.data;
  }
);

export const archiveMember = createAsyncThunk(
  'members/archive',
  async (id) => {
    await memberAPI.delete(id);
    return id;
  }
);

export const forceDeleteMember = createAsyncThunk(
  'members/forceDelete',
  async (id) => {
    await memberAPI.forceDelete(id);
    return id;
  }
);

export const restoreMember = createAsyncThunk(
  'members/restore',
  async (id) => {
    const response = await memberAPI.restore(id);
    return response.data;
  }
);

const memberSlice = createSlice({
  name: 'members',
  initialState: {
    list: [],
    loading: false,
    error: null,
    filters: {
      search: '',
      status: 'all',
      membershipId: '',
    },
    sorting: {
      field: 'created_at',
      direction: 'desc',
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        const index = state.list.findIndex(m => m.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(renewMember.fulfilled, (state, action) => {
        const index = state.list.findIndex(m => m.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(archiveMember.fulfilled, (state, action) => {
        state.list = state.list.filter(m => m.id !== action.payload);
      })
      .addCase(restoreMember.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      });
  },
});

export const { setFilters, setSorting, clearError } = memberSlice.actions;
export default memberSlice.reducer;