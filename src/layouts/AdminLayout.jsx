import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Menu, Sun, Moon } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export default function AdminLayout() {
  const { isAdmin, isAuthenticated } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Route guard: check if user is admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to='/login' replace />;
  }

  return (
    <div className='bg-background text-on-surface flex h-screen w-screen overflow-hidden'>
      <AdminSidebar isMobileOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />

      <main className='bg-background ml-0 flex h-full flex-1 flex-col overflow-hidden transition-[margin] duration-300 md:ml-[80px] lg:ml-[300px]'>
        <header className='bg-surface-container-low border-outline-variant/20 flex h-16 w-full shrink-0 items-center justify-between border-b px-4 text-on-surface shadow-md md:hidden'>
          <div className='flex items-center gap-2'>
            <img src='/images/assets/logo.png' className='size-8' alt='RideEase Logo' />
            <div className='text-title-medium font-bold text-on-surface'>
              <span className='text-[#4b9dcf]'>Ride</span>
              <span className='text-[#7cd8b3]'>Ease</span>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className='cursor-pointer rounded-full text-on-surface-variant hover:text-primary hover:bg-primary/10'
            >
              {theme === 'dark' ? (
                <Sun className='text-primary h-5 w-5' />
              ) : (
                <Moon className='text-primary h-5 w-5' />
              )}
            </Button>
            <button
              onClick={() => setIsMobileOpen(true)}
              className='text-on-surface-variant cursor-pointer p-1 transition-colors hover:text-primary'
              aria-label='Open navigation menu'
            >
              <Menu className='size-6' />
            </button>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
