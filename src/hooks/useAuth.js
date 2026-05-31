import { useAuthStore } from '../store/authStore';
import * as authService from '../services/authService';

export const useAuth = () => {
  const { user, token, setAuth, clearAuth } = useAuthStore();

  const handleLogin = async (credentials) => {
    const response = await authService.login(credentials);
    if (response.success && response.data) {
      setAuth(response.data.user, response.data.token);
    }
    return response;
  };

  const handleRegister = async (userData) => {
    const response = await authService.register(userData);
    return response;
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.error(e);
    } finally {
      clearAuth();
    }
  };

  const handleUpdateProfile = async (userData) => {
    if (!user) return { success: false, message: 'Not logged in' };
    const response = await authService.updateProfile(user._id, userData);
    if (response.success && response.data) {
      setAuth(response.data, token);
    }
    return response;
  };

  return {
    user,
    token,
    isAuthenticated: !!token,
    isAdmin: user?.role === 'admin',
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
  };
};
