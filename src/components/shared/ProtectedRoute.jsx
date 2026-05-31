import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (isAdmin) {
    const lastAdminPath = localStorage.getItem('lastAdminPath') || '/admin';
    return <Navigate to={lastAdminPath} replace />;
  }

  return children;
}
