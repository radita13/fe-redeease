import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function BookingCardSkeleton() {
  return (
    <div className='bg-surface border-outline-variant/30 space-y-4 rounded-3xl border p-6 shadow-sm'>
      <div className='flex items-start justify-between gap-4'>
        <div className='space-y-1.5'>
          <Skeleton className='h-3 w-28' />
          <Skeleton className='h-5 w-40' />
        </div>
        <Skeleton className='h-6 w-16 rounded-full' />
      </div>

      <div className='bg-surface-container-low border-outline-variant/10 grid grid-cols-2 gap-4 rounded-2xl border p-3.5'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-8 w-8 rounded-full' />
          <div className='space-y-1'>
            <Skeleton className='h-2.5 w-12' />
            <Skeleton className='h-3.5 w-24' />
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-8 w-8 rounded-full' />
          <div className='space-y-1'>
            <Skeleton className='h-2.5 w-12' />
            <Skeleton className='h-3.5 w-16' />
          </div>
        </div>
      </div>

      <div className='relative space-y-4 pl-6'>
        <div className='border-outline-variant/30 absolute top-2.5 bottom-2.5 left-2.5 w-0.5 border-l-2 border-dashed'></div>

        <div className='relative space-y-1'>
          <div className='bg-surface-container-high border-outline-variant/50 absolute top-1.5 left-[-21px] h-2 w-2 rounded-full border' />
          <Skeleton className='h-2.5 w-12' />
          <Skeleton className='h-3.5 w-3/4' />
        </div>

        <div className='relative space-y-1'>
          <div className='bg-surface-container-high border-outline-variant/50 absolute top-1.5 left-[-21px] h-2 w-2 rounded-full border' />
          <Skeleton className='h-2.5 w-12' />
          <Skeleton className='h-3.5 w-2/3' />
        </div>
      </div>

      <div className='flex justify-end gap-2 pt-2'>
        <Skeleton className='h-8 w-24 rounded-full' />
      </div>
    </div>
  );
}
