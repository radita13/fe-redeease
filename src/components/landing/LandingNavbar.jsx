import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function LandingNavbar({ handleScrollTo }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/90 border-outline-variant/20 border-b py-3 shadow-md backdrop-blur-md'
          : 'border-b border-transparent bg-transparent py-5'
      }`}
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

      {/* Desktop Menu */}
      <div className='hidden items-center gap-8 md:flex'>
        <Button
          variant='custom'
          onClick={() => handleScrollTo('home')}
          className='text-label-lg font-label-lg text-on-surface-variant hover:text-primary h-auto cursor-pointer p-0 transition-colors hover:bg-transparent'
        >
          Home
        </Button>
        <Button
          variant='custom'
          onClick={() => handleScrollTo('our-fleet')}
          className='text-label-lg font-label-lg text-on-surface-variant hover:text-primary h-auto cursor-pointer p-0 transition-colors'
        >
          Our Fleet
        </Button>
        <Button
          variant='custom'
          onClick={() => handleScrollTo('how-it-works')}
          className='text-label-lg font-label-lg text-on-surface-variant hover:text-primary h-auto cursor-pointer p-0 transition-colors'
        >
          How it Works
        </Button>
        <Button
          variant='custom'
          onClick={() => handleScrollTo('testimonials')}
          className='text-label-lg font-label-lg text-on-surface-variant hover:text-primary h-auto cursor-pointer p-0 transition-colors'
        >
          Testimonials
        </Button>
        <Button
          variant='custom'
          onClick={() => handleScrollTo('about-us')}
          className='text-label-lg font-label-lg text-on-surface-variant hover:text-primary h-auto cursor-pointer p-0 transition-colors'
        >
          About Us
        </Button>
      </div>

      {/* Theme Toggle & Auth/Hamburger */}
      <div className='flex items-center gap-4'>
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

        <div className='hidden items-center gap-4 md:flex'>
          {isAuthenticated ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <div className='flex cursor-pointer items-center gap-2'>
                  <Avatar>
                    <AvatarImage src={user?.avatar || 'https://github.com/shadcn.png'} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col'>
                    <span className='text-label-lg font-label-lg' title={user?.name}>
                      {user?.name && user.name.length > 15
                        ? `${user.name.slice(0, 15)}...`
                        : user?.name}
                    </span>
                    <span
                      className='text-label-md font-label-md text-on-surface-variant'
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
                {isAdmin ? (
                  <DropdownMenuItem
                    onClick={() => {
                      const lastPath = localStorage.getItem('lastAdminPath') || '/admin';
                      navigate(lastPath);
                    }}
                    className='cursor-pointer'
                  >
                    Dashboard Admin
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem
                      onClick={() => navigate('/dashboard')}
                      className='cursor-pointer'
                    >
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate('/profile')}
                      className='cursor-pointer'
                    >
                      Profile
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className='cursor-pointer text-red-600 focus:bg-red-600/10 focus:text-red-600'
                >
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant='custom'
                onClick={() => navigate('/login')}
                className='border-primary text-primary hover:bg-primary/5 hover:text-primary text-label-lg font-label-lg h-auto cursor-pointer rounded-full border-2 px-6 py-2.5 transition-all duration-150 active:scale-95'
              >
                Log In
              </Button>
              <Button
                onClick={() => navigate('/register')}
                className='bg-primary text-on-primary hover:bg-primary/95 hover:shadow-primary/25 text-label-lg font-label-lg h-auto cursor-pointer rounded-full border-none px-6 py-2.5 transition-all duration-150 hover:shadow-lg active:scale-95'
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className='text-on-surface hover:text-primary cursor-pointer p-2 transition-colors focus:outline-none md:hidden'
        >
          <span className='material-symbols-outlined text-3xl'>
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className='bg-surface border-outline-variant/20 animate-fade-in absolute top-full left-0 flex w-full flex-col gap-4 border-b p-6 shadow-xl md:hidden'>
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

          {/* Dashboard / Profile Links */}
          {isAuthenticated && (
            <>
              {isAdmin ? (
                <Button
                  variant='custom'
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const lastPath = localStorage.getItem('lastAdminPath') || '/admin';
                    navigate(lastPath);
                  }}
                  className='text-body-lg text-secondary hover:text-primary h-auto w-full cursor-pointer justify-start p-0 py-2 font-semibold transition-colors'
                >
                  Dashboard Admin
                </Button>
              ) : (
                <>
                  <Button
                    variant='custom'
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/dashboard');
                    }}
                    className='text-body-lg text-on-surface hover:text-primary h-auto w-full cursor-pointer justify-start p-0 py-2 font-semibold transition-colors'
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant='custom'
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/profile');
                    }}
                    className='text-body-lg text-on-surface hover:text-primary h-auto w-full cursor-pointer justify-start p-0 py-2 font-semibold transition-colors'
                  >
                    Profile
                  </Button>
                </>
              )}
              <hr className='border-outline-variant/20' />
            </>
          )}

          {/* Landing Menu Links */}
          <Button
            variant='custom'
            onClick={() => {
              setMobileMenuOpen(false);
              handleScrollTo('home');
            }}
            className='text-body-lg text-on-surface hover:text-primary h-auto w-full cursor-pointer justify-start p-0 py-2 font-semibold transition-colors'
          >
            Home
          </Button>
          <Button
            variant='custom'
            onClick={() => {
              setMobileMenuOpen(false);
              handleScrollTo('our-fleet');
            }}
            className='text-body-lg text-on-surface hover:text-primary h-auto w-full cursor-pointer justify-start p-0 py-2 font-semibold transition-colors'
          >
            Our Fleet
          </Button>
          <Button
            variant='custom'
            onClick={() => {
              setMobileMenuOpen(false);
              handleScrollTo('how-it-works');
            }}
            className='text-body-lg text-on-surface hover:text-primary h-auto w-full cursor-pointer justify-start p-0 py-2 font-semibold transition-colors'
          >
            How it Works
          </Button>
          <Button
            variant='custom'
            onClick={() => {
              setMobileMenuOpen(false);
              handleScrollTo('testimonials');
            }}
            className='text-body-lg text-on-surface hover:text-primary h-auto w-full cursor-pointer justify-start p-0 py-2 font-semibold transition-colors'
          >
            Testimonials
          </Button>
          <Button
            variant='custom'
            onClick={() => {
              setMobileMenuOpen(false);
              handleScrollTo('about-us');
            }}
            className='text-body-lg text-on-surface hover:text-primary h-auto w-full cursor-pointer justify-start p-0 py-2 font-semibold transition-colors'
          >
            About Us
          </Button>

          {/* Bottom Actions */}
          <hr className='border-outline-variant/20' />
          {isAuthenticated ? (
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                logout();
              }}
              className='bg-error text-on-error hover:bg-error/90 text-label-lg font-label-lg h-auto w-full cursor-pointer rounded-full border-none py-3 text-center shadow-lg transition-all'
            >
              Log Out
            </Button>
          ) : (
            <div className='flex flex-col gap-3'>
              <Button
                variant='custom'
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/login');
                }}
                className='border-primary text-primary hover:bg-primary/5 hover:text-primary text-label-lg font-label-lg h-auto w-full cursor-pointer rounded-full border-2 py-3 text-center transition-all'
              >
                Log In
              </Button>
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/register');
                }}
                className='bg-primary text-on-primary hover:bg-primary/95 text-label-lg font-label-lg shadow-primary/25 h-auto w-full cursor-pointer rounded-full border-none py-3 text-center shadow-lg transition-all'
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
