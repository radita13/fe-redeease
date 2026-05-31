import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function BookingsHeader({ searchTerm, setSearchTerm, onRefresh, onExport }) {
  const { theme, setTheme } = useTheme();

  return (
    <header className='bg-surface border-outline-variant/30 sticky top-0 z-40 flex min-h-20 shrink-0 flex-col items-start justify-between gap-4 border-b px-6 py-4 md:h-20 md:flex-row md:items-center md:px-8 md:py-0'>
      <div className='w-full md:w-auto'>
        <h2 className='text-headline-md font-headline-md text-on-surface leading-tight font-black'>
          Bookings Management
        </h2>
        <p className='text-on-surface-variant mt-1 text-xs font-semibold'>
          Manage, approve, and monitor customer booking records
        </p>
      </div>

      <div className='flex w-full items-center gap-4 px-0 md:max-w-2xl md:flex-1 md:px-8'>
        <div className='group relative flex-1'>
          <span className='material-symbols-outlined text-outline group-focus-within:text-primary absolute top-1/2 left-4 z-10 -translate-y-1/2 transition-colors'>
            search
          </span>
          <Input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='bg-surface-container-low border-outline-variant text-body-md focus-visible:ring-primary h-12 w-full rounded-xl border pr-4 pl-12 transition-all focus-visible:ring-2 focus-visible:ring-offset-0'
            placeholder='Search by ID, rider name, or locations...'
          />
        </div>
      </div>

      <div className='flex w-full items-center justify-end gap-3 md:w-auto md:justify-start'>
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
        <button
          onClick={onRefresh}
          className='hover:bg-surface-variant text-on-surface-variant cursor-pointer rounded-full p-2.5 transition-colors'
          title='Refresh bookings'
        >
          <span className='material-symbols-outlined'>refresh</span>
        </button>
        <div className='bg-outline-variant h-6 w-px'></div>
        <button
          onClick={onExport}
          className='border-primary text-primary hover:bg-primary/5 hover:text-primary text-label-lg font-label-lg h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full border-2 px-6 font-bold transition-all duration-150 active:scale-95 flex'
        >
          <span className='material-symbols-outlined text-sm'>download</span>
          Export CSV
        </button>
      </div>
    </header>
  );
}
