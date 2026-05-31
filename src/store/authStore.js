import { create } from 'zustand';

const getInitialUser = () => {
  try {
    const saved = localStorage.getItem('rideease_user');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const getInitialToken = () => {
  return localStorage.getItem('rideease_token') || null;
};

export const useAuthStore = create((set) => ({
  user: getInitialUser(),
  token: getInitialToken(),
  setAuth: (user, token) => {
    localStorage.setItem('rideease_user', JSON.stringify(user));
    localStorage.setItem('rideease_token', token);
    set({ user, token });
  },
  clearAuth: () => {
    localStorage.removeItem('rideease_user');
    localStorage.removeItem('rideease_token');
    set({ user: null, token: null });
  },
}));
