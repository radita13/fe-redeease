import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from 'next-themes';
import { Sun, Moon, LogOut, Menu, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = isAuthenticated
    ? isAdmin
      ? [{ label: 'Dashboard Admin', path: '/admin' }]
      : [
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Find Cabs', path: '/cabs' },
          { label: 'My Bookings', path: '/my-bookings' },
          { label: 'Profile', path: '/profile' },
        ]
    : [
        { label: 'Home', path: '/', hash: 'home' },
        { label: 'Our Fleet', path: '/', hash: 'our-fleet' },
        { label: 'How it Works', path: '/', hash: 'how-it-works' },
        { label: 'Testimonials', path: '/', hash: 'testimonials' },
        { label: 'About Us', path: '/', hash: 'about-us' },
      ];

  const handleLinkClick = (link) => {
    setMobileOpen(false);
    if (link.hash) {
      if (location.pathname === '/') {
        const el = document.getElementById(link.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(`/#${link.hash}`);
      }
    } else {
      if (link.path === '/admin') {
        const lastPath = localStorage.getItem('lastAdminPath') || '/admin';
        navigate(lastPath);
      } else {
        navigate(link.path);
      }
    }
  };

  return (
    <nav className='bg-surface/85 border-outline-variant/20 fixed top-0 left-0 z-50 w-full border-b py-3 shadow-sm backdrop-blur-md transition-colors duration-300'>
      <div className='mx-auto flex w-full items-center justify-between px-6'>
        <div
          className='flex cursor-pointer items-center gap-2'
          onClick={() => {
            if (isAuthenticated) {
              if (isAdmin) {
                const lastPath = localStorage.getItem('lastAdminPath') || '/admin';
                navigate(lastPath);
              } else {
                navigate('/dashboard');
              }
            } else {
              navigate('/');
            }
          }}
        >
          <div
            className='flex cursor-pointer items-center gap-2'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img className='w-12' src='/images/assets/logo.png' alt='' />
            <div className='text-headline-md text-xl font-bold tracking-tight'>
              <span className='text-[#4b9dcf]'>Ride</span>
              <span className='text-[#7cd8b3]'>Ease</span>
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className='hidden items-center gap-6 md:flex'>
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link)}
              className='text-label-lg font-label-lg text-on-surface-variant hover:text-primary cursor-pointer transition-colors'
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Theme and Auth CTAs */}
        <div className='hidden items-center gap-4 md:flex'>
          <Button
            variant='ghost'
            size='icon'
            onClick={toggleTheme}
            className='cursor-pointer rounded-full'
          >
            {theme === 'dark' ? (
              <Sun className='text-primary h-5 w-5' />
            ) : (
              <Moon className='text-primary h-5 w-5' />
            )}
          </Button>

          {isAuthenticated ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <div className='flex cursor-pointer items-center gap-2'>
                  <Avatar className='h-9 w-9'>
                    <AvatarImage src={user?.avatar || 'https://github.com/shadcn.png'} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col text-left'>
                    <span className='text-label-lg font-label-lg leading-tight' title={user?.name}>
                      {user?.name && user.name.length > 15
                        ? `${user.name.slice(0, 15)}...`
                        : user?.name}
                    </span>
                    <span
                      className='text-label-md font-label-md text-on-surface-variant leading-tight'
                      title={user?.email}
                    >
                      {user?.email && user.email.length > 15
                        ? `${user.email.slice(0, 15)}...`
                        : user?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-48 cursor-pointer p-2'>
                <DropdownMenuItem onClick={() => navigate('/')} className='cursor-pointer'>
                  Home
                </DropdownMenuItem>

                {isAdmin && (
                  <DropdownMenuItem
                    onClick={() => {
                      const lastPath = localStorage.getItem('lastAdminPath') || '/admin';
                      navigate(lastPath);
                    }}
                    className='cursor-pointer'
                  >
                    Dashboard Admin
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className='cursor-pointer text-red-600 focus:bg-red-600/10 focus:text-red-600'
                >
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className='flex items-center gap-3'>
              <button
                onClick={() => navigate('/login')}
                className='text-label-lg font-label-lg border-primary text-primary hover:bg-primary/5 cursor-pointer rounded-full border-2 px-5 py-2 transition-all duration-150 active:scale-95'
              >
                Log In
              </button>
              <button
                onClick={() => navigate('/register')}
                className='text-label-lg font-label-lg bg-primary text-on-primary hover:shadow-primary/25 cursor-pointer rounded-full px-5 py-2 transition-all duration-150 hover:shadow-lg active:scale-95'
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className='flex items-center gap-3 md:hidden'>
          <Button
            variant='ghost'
            size='icon'
            onClick={toggleTheme}
            className='cursor-pointer rounded-full'
          >
            {theme === 'dark' ? (
              <Sun className='text-primary h-5 w-5' />
            ) : (
              <Moon className='text-primary h-5 w-5' />
            )}
          </Button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className='text-on-surface hover:text-primary cursor-pointer p-2 transition-colors'
          >
            {mobileOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className='bg-surface border-outline-variant/20 absolute top-full left-0 flex w-full flex-col gap-4 border-b p-6 shadow-xl md:hidden'>
          {isAuthenticated && (
            <>
              <div className='flex items-center gap-3 py-2'>
                <Avatar className='h-10 w-10'>
                  <AvatarImage src={user?.avatar || 'https://github.com/shadcn.png'} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col text-left'>
                  <span className='text-body-lg text-on-surface leading-tight font-bold'>
                    {user?.name || 'User'}
                  </span>
                  <span className='text-label-md text-on-surface-variant leading-tight'>
                    {user?.email || ''}
                  </span>
                </div>
              </div>
              <hr className='border-outline-variant/20' />
            </>
          )}

          <button
            onClick={() => handleLinkClick({ label: 'Home', path: '/' })}
            className='text-body-lg text-on-surface hover:text-primary cursor-pointer py-2 text-left font-semibold transition-colors'
          >
            Home
          </button>

          <hr className='border-outline-variant/20' />

          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link)}
              className='text-body-lg text-on-surface hover:text-primary cursor-pointer py-2 text-left font-semibold transition-colors'
            >
              {link.label}
            </button>
          ))}
          {isAdmin && (
            <Link
              to='/admin'
              onClick={() => setMobileOpen(false)}
              className='text-body-lg text-secondary hover:text-primary flex items-center gap-2 py-2 text-left font-semibold transition-colors'
            >
              <Shield className='h-5 w-5' /> Dashboard Admin
            </Link>
          )}
          <hr className='border-outline-variant/20' />
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className='bg-error-container text-error hover:bg-error-container/85 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full py-3 font-semibold transition-colors'
            >
              <LogOut className='h-5 w-5' /> Log Out
            </button>
          ) : (
            <div className='flex flex-col gap-3'>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  navigate('/login');
                }}
                className='text-label-lg font-label-lg border-primary text-primary hover:bg-primary/5 w-full cursor-pointer rounded-full border-2 py-3 text-center transition-all'
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  navigate('/register');
                }}
                className='text-label-lg font-label-lg bg-primary text-on-primary shadow-primary/25 w-full cursor-pointer rounded-full py-3 text-center shadow-lg transition-all'
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
