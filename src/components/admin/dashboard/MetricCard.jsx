import React from 'react';

export default function MetricCard({
  title,
  value,
  icon: Icon,
  borderColor,
  valueColor = '',
  children,
}) {
  return (
    <div className='border-outline-variant/30 bg-surface-container-lowest h-32 rounded-xl border-x border-b shadow-sm'>
      <div
        className={`flex h-full flex-col justify-between rounded-t-xl border-t-2 p-6 ${borderColor}`}
      >
        <div className='flex items-start justify-between'>
          <span className='text-label-md font-label-md text-on-surface-variant font-bold tracking-wider uppercase'>
            {title}
          </span>
          <Icon className='size-5' />
        </div>
        <div className='flex items-end justify-between'>
          <p className={`text-headline-md font-headline-md font-black ${valueColor}`}>{value}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
