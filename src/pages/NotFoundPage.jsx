import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();

  const handleBackToSafety = () => {
    if (!isAuthenticated) {
      navigate('/');
    } else if (isAdmin) {
      const lastAdminPath = localStorage.getItem('lastAdminPath') || '/admin';
      navigate(lastAdminPath);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className='bg-background text-on-surface animate-fade-in flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center'>
      <div className='relative mb-8 flex items-center justify-center'>
        <div className='bg-primary/5 absolute -inset-4 animate-pulse rounded-full blur-2xl'></div>
        <h1 className='text-primary text-[120px] leading-none font-black tracking-tighter opacity-15 select-none sm:text-[180px]'>
          404
        </h1>
      </div>

      <div className='max-w-md space-y-4'>
        <h2 className='text-headline-lg font-headline-lg text-on-surface font-black tracking-tight sm:text-4xl'>
          Oops! Pages Not Found
        </h2>
        <p className='text-body-lg text-on-surface-variant leading-relaxed font-semibold'>
          The page you are looking for does not exist, has been moved, or you do not have access
          rights to open it.
        </p>
      </div>

      <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
        <Button
          onClick={handleBackToSafety}
          className='bg-primary text-on-primary! hover:bg-primary-container text-label-lg font-label-lg flex cursor-pointer items-center gap-2 rounded-full px-8 py-6 font-bold shadow-lg transition-all hover:shadow-xl active:scale-95'
        >
          <Home className='h-5 w-5' />
          {!isAuthenticated ? 'Home' : isAdmin ? 'Dashboard Admin' : 'Dashboard'}
        </Button>

        {!isAuthenticated && (
          <Button
            variant='outline'
            onClick={() => navigate('/login')}
            className='border-outline-variant hover:bg-surface-variant text-label-lg font-label-lg flex cursor-pointer items-center gap-2 rounded-full px-8 py-6 font-bold transition-all active:scale-95'
          >
            Log In
          </Button>
        )}
      </div>
    </div>
  );
}
