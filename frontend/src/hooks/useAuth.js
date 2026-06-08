import { useSelector, useDispatch } from 'react-redux';
import { login, logout, clearError } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { admin, token, loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (credentials) => {
    const result = await dispatch(login(credentials));
    return result;
  };

  const handleLogout = async () => {
    await dispatch(logout());
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    admin,
    token,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
    clearError: clearAuthError,
    isAuthenticated: !!token,
  };
};