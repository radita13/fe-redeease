import { CircleCheck, ClipboardClock, List, RefreshCw } from 'lucide-react';
import React from 'react';

export default function BookingSummaryPills({ stats }) {
  const data = [stats];

  console.log(data);

  return (
    <section className='shrink-0 px-8 pt-6 pb-2'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {/* All Statuses */}
        <div className='bg-surface-container-lowest border-primary flex items-center gap-3 rounded-2xl border px-6 py-4 shadow-md'>
          <div className='bg-primary/10 text-primary rounded-lg p-2'>
            <List className='size-6' />
          </div>
          <div className='text-left'>
            <p className='text-label-md font-label-md text-on-surface-variant tracking-wider uppercase'>
              All
            </p>
            <p className='text-headline-md font-headline-md text-on-surface'>{stats.totalCount}</p>
          </div>
        </div>

        {/* Pending */}
        <div className='bg-surface-container-lowest border-secondary flex items-center gap-3 rounded-2xl border px-6 py-4 shadow-md'>
          <div className='bg-secondary-container/10 text-secondary rounded-lg p-2'>
            <ClipboardClock className='size-6' />
          </div>
          <div className='text-left'>
            <p className='text-label-md font-label-md text-on-surface-variant tracking-wider uppercase'>
              Pending
            </p>
            <p className='text-headline-md font-headline-md text-secondary'>{stats.pendingCount}</p>
          </div>
        </div>

        {/* Confirmed */}
        {/* <div className='bg-surface-container-lowest border-secondary flex items-center gap-3 rounded-2xl border px-6 py-4 shadow-md'>
          <div className='bg-secondary-container/10 text-secondary rounded-lg p-2'>
            <ClipboardClock className='size-6' />
          </div>
          <div className='text-left'>
            <p className='text-label-md font-label-md text-on-surface-variant tracking-wider uppercase'>
              Confirmed
            </p>
            <p className='text-headline-md font-headline-md text-secondary'>
              {stats.confirmedCount}
            </p>
          </div>
        </div> */}

        {/* Ongoing */}
        <div className='bg-surface-container-lowest border-primary flex items-center gap-3 rounded-2xl border px-6 py-4 shadow-md'>
          <div className='bg-primary/10 text-primary rounded-lg p-2'>
            <RefreshCw className='size-6' />
          </div>
          <div className='text-left'>
            <p className='text-label-md font-label-md text-on-surface-variant tracking-wider uppercase'>
              Ongoing
            </p>
            <p className='text-headline-md font-headline-md text-primary'>{stats.ongoingCount}</p>
          </div>
        </div>

        {/* Completed */}
        <div className='bg-surface-container-lowest border-tertiary flex items-center gap-3 rounded-2xl border px-6 py-4 shadow-md'>
          <div className='bg-tertiary-fixed-dim/20 text-tertiary rounded-lg p-2'>
            <CircleCheck className='size-6' />
          </div>
          <div className='text-left'>
            <p className='text-label-md font-label-md text-on-surface-variant tracking-wider uppercase'>
              Completed
            </p>
            <p className='text-headline-md font-headline-md text-tertiary'>
              {stats.completedCount}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
