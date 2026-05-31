import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Badge, Calendar, CarFront, LayoutDashboard, Users, LogOut, X } from 'lucide-react';

export default function AdminSidebar({ isMobileOpen, onClose }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Bookings', path: '/admin/bookings', icon: Calendar },
    { label: 'Fleet', path: '/admin/add-cab', icon: CarFront },
    { label: 'Drivers', path: '/admin/drivers', icon: Badge },
    { label: 'Users', path: '/admin/users', icon: Users },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden'
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`bg-surface-container-low border-outline-variant/20 fixed top-0 left-0 z-50 flex h-full flex-col border-r py-6 shadow-xl transition-transform duration-300 ease-in-out ${isMobileOpen ? 'w-[280px] translate-x-0' : '-translate-x-full'} md:w-[80px] md:translate-x-0 lg:w-[300px]`}
      >
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className='text-on-surface-variant hover:text-primary absolute top-2 right-2 cursor-pointer p-1 transition-colors md:hidden'
          aria-label='Close sidebar'
        >
          <X className='size-6' />
        </button>

        {/* Logo / Brand Header */}
        <div
          className='mb-8 cursor-pointer px-4 lg:px-6'
          onClick={() => {
            navigate('/admin');
            onClose();
          }}
        >
          <div className='flex items-center justify-center gap-2 lg:justify-start'>
            <img
              src='/images/assets/logo.png'
              className='size-12 transition-all duration-300 lg:size-14'
              alt='RideEase Logo'
            />
            <div className='text-headline-lg text-on-surface block font-bold transition-all duration-300 md:hidden lg:block'>
              <span className='text-[#4b9dcf]'>Ride</span>
              <span className='text-[#7cd8b3]'>Ease</span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className='flex-1 space-y-1.5'>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`mx-2 flex items-center justify-start gap-3 rounded-md px-4 py-3 transition-all duration-200 md:justify-center md:gap-0 md:px-3 lg:mx-4 lg:justify-start lg:gap-3 lg:px-4 ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container shadow-primary/20 translate-x-0 font-bold shadow-lg lg:translate-x-1'
                    : 'text-on-surface-variant hover:bg-primary/10 hover:text-primary font-semibold'
                }`}
              >
                <Icon className='size-5 shrink-0' />
                <span className='text-label-md font-label-md block truncate transition-all duration-300 md:hidden lg:block'>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Profile / Footer Section */}
        <div className='mt-auto px-4 lg:px-6'>
          <div className='border-outline-variant/20 mt-2 flex flex-col gap-4 border-t py-4 md:items-center lg:flex-row lg:items-start'>
            <div className='bg-surface-container-highest border-outline-variant/30 h-10 w-10 shrink-0 overflow-hidden rounded-full border'>
              <img
                alt='Admin avatar'
                className='h-full w-full object-cover'
                src={user?.avatar || '/images/admin_avatar.png'}
              />
            </div>

            {/* Profile Info & Logout (Desktop / Mobile View) */}
            <div className='block flex-1 overflow-hidden md:hidden lg:block'>
              <p className='text-label-md font-label-md text-on-surface truncate font-bold'>
                {user?.name || 'Marcus Chen'}
              </p>
              <button
                onClick={handleLogout}
                className='text-on-surface-variant/70 mt-1 flex cursor-pointer items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase transition-colors'
              >
                <LogOut className='size-3' />
                Logout
              </button>
            </div>

            {/* Standalone Logout Icon Button (Tablet View Only) */}
            <button
              onClick={handleLogout}
              title='Logout'
              className='text-on-surface-variant/70 hover:bg-primary/10 hover:text-error hidden cursor-pointer rounded-md p-2 transition-colors md:flex lg:hidden'
            >
              <LogOut className='size-5' />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
