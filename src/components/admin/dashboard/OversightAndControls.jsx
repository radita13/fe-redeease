import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function OversightAndControls({ stats, onNavigate }) {
  return (
    <section className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      {/* System Status Oversight Card */}
      <Card className='border-outline-variant/30 bg-surface-container-lowest rounded-2xl p-6 shadow-sm'>
        <h3 className='text-on-surface text-label-lg mb-0 font-bold uppercase'>
          System Status Oversight
        </h3>
        <div className='text-on-surface-variant space-y-2 text-xs font-semibold'>
          <div className='flex items-center justify-between'>
            <span>Completed Rides</span>
            <span className='text-tertiary font-black'>{stats.completedBookings} Bookings</span>
          </div>
          <div className='flex items-center justify-between'>
            <span>Cancelled Rides</span>
            <span className='text-error font-black'>{stats.cancelledBookings} Bookings</span>
          </div>
          <div className='flex items-center justify-between'>
            <span>Total Registered Users</span>
            <span className='text-on-surface font-black'>{stats.usersCount} Members</span>
          </div>
        </div>
      </Card>

      {/* Quick Operator Controls Card */}
      <Card className='border-outline-variant/30 bg-surface-container-lowest space-y-4 rounded-2xl p-6 shadow-sm'>
        <h3 className='text-on-surface text-label-lg mb-0 font-bold tracking-tight uppercase'>
          Quick Operator Controls
        </h3>
        <div className='grid grid-cols-2 gap-3'>
          <Button
            onClick={() => onNavigate('/admin/add-cab')}
            variant='outline'
            className='border-primary text-primary hover:bg-primary/5 hover:text-primary h-11 shrink-0 cursor-pointer rounded-full border-2 text-xs font-bold transition-all duration-150 active:scale-95'
          >
            New Vehicle
          </Button>
          <Button
            onClick={() => onNavigate('/admin/drivers')}
            variant='outline'
            className='border-primary text-primary hover:bg-primary/5 hover:text-primary h-11 shrink-0 cursor-pointer rounded-full border-2 text-xs font-bold transition-all duration-150 active:scale-95'
          >
            New Driver
          </Button>
          <Button
            onClick={() => onNavigate('/admin/bookings')}
            className='bg-primary text-on-primary hover:bg-primary/95 hover:shadow-primary/25 col-span-2 h-11 shrink-0 cursor-pointer rounded-full border-none text-xs font-bold transition-all duration-150 hover:shadow-lg active:scale-95'
          >
            Review Customer Bookings
          </Button>
        </div>
      </Card>
    </section>
  );
}
