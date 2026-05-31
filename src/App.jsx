import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import AdminLayout from '@/layouts/AdminLayout';
import ProtectedRoute from '@/components/shared/ProtectedRoute';

// Lazy load page components
const LandingPage = lazy(() => import('@/pages/LandingPage'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const DashboardUser = lazy(() => import('@/pages/DashboardUser'));
const CabsPage = lazy(() => import('@/pages/CabsPage'));
const BookCabPage = lazy(() => import('@/pages/BookCabPage'));
const MyBookingsPage = lazy(() => import('@/pages/MyBookingsPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const DashboardAdmin = lazy(() => import('@/pages/admin/DashboardAdmin'));
const UsersPage = lazy(() => import('@/pages/admin/UsersPage'));
const DriversPage = lazy(() => import('@/pages/admin/DriversPage'));
const AddCabPage = lazy(() => import('@/pages/admin/AddCabPage'));
const UserBookings = lazy(() => import('@/pages/admin/UserBookingsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className='bg-background flex min-h-screen items-center justify-center'>
            <div className='border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent'></div>
          </div>
        }
      >
        <Routes>
          <Route path='/' element={<LandingPage />} />

          <Route element={<AuthLayout />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>

          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path='/dashboard' element={<DashboardUser />} />
            <Route path='/cabs' element={<CabsPage />} />
            <Route path='/book/:id' element={<BookCabPage />} />
            <Route path='/my-bookings' element={<MyBookingsPage />} />
            <Route path='/profile' element={<ProfilePage />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path='/admin' element={<DashboardAdmin />} />
            <Route path='/admin/users' element={<UsersPage />} />
            <Route path='/admin/drivers' element={<DriversPage />} />
            <Route path='/admin/add-cab' element={<AddCabPage />} />
            <Route path='/admin/bookings' element={<UserBookings />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
