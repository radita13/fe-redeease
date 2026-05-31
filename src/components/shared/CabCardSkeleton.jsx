import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function CabCardSkeleton() {
  return (
    <div className='bg-surface border-outline-variant/30 flex h-full flex-col overflow-hidden rounded-3xl border shadow-sm'>
      <Skeleton className='h-44 w-full rounded-b-none' />

      <div className='flex grow flex-col justify-between space-y-4 p-5'>
        <div className='space-y-3'>
          <div className='flex items-start justify-between'>
            <Skeleton className='h-6 w-28 rounded-lg' />
            <Skeleton className='h-6 w-16 rounded-lg' />
          </div>

          <div className='bg-surface-container-low border-outline-variant/10 mt-3 flex items-center gap-3 rounded-xl border p-2.5'>
            <Skeleton className='h-9 w-9 rounded-full' />
            <div className='flex-1 space-y-1.5'>
              <Skeleton className='h-3.5 w-24' />
              <Skeleton className='h-3 w-12' />
            </div>
          </div>
        </div>

        <div className='border-outline-variant/10 flex items-center justify-between gap-4 border-t pt-4'>
          <div className='space-y-1.5'>
            <Skeleton className='h-3 w-20' />
            <Skeleton className='h-5 w-16' />
          </div>
          <Skeleton className='h-10 w-24 rounded-full' />
        </div>
      </div>
    </div>
  );
}
