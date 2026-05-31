import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardHeader({ user, stats, formattedDate, formattedTime }) {
  const { theme, setTheme } = useTheme();

  return (
    <header className='flex items-center justify-between'>
      <div>
        <h2 className='text-headline-md font-headline-md text-on-surface font-black'>
          Enterprise Overview
        </h2>
        <p className='text-body-sm font-body-sm text-on-surface-variant font-semibold'>
          Welcome back, {user?.name || 'Admin'}. Here's what's happening today.
        </p>
      </div>
      <div className='flex items-center gap-4'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className='text-on-surface-variant hover:text-primary hover:bg-primary/10 cursor-pointer rounded-full'
          title='Toggle Theme'
        >
          {theme === 'dark' ? (
            <Sun className='text-primary h-5 w-5' />
          ) : (
            <Moon className='text-primary h-5 w-5' />
          )}
        </Button>
        <button className='text-on-surface-variant hover:bg-surface-container relative cursor-pointer rounded-full p-2 transition-colors'>
          <span className='material-symbols-outlined'>notifications</span>
          {stats.pendingBookings > 0 && (
            <span className='bg-error border-background absolute top-2 right-2 h-2 w-2 rounded-full border-2'></span>
          )}
        </button>
        <div className='bg-outline-variant h-8 w-px'></div>
        <div className='flex flex-col items-end'>
          <p className='text-label-md font-label-md text-on-surface font-bold'>{formattedDate}</p>
          <p className='text-label-md font-label-md text-on-surface-variant'>{formattedTime}</p>
        </div>
      </div>
    </header>
  );
}
