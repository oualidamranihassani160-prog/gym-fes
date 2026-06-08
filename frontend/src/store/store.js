import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import memberReducer from './slices/memberSlice';
import productReducer from './slices/productSlice';
import membershipReducer from './slices/membershipSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    members: memberReducer,
    products: productReducer,
    memberships: membershipReducer,
  },
});