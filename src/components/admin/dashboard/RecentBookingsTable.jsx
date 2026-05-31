import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/utils/calculateFare';

export default function RecentBookingsTable({ recentBookings, onViewAll }) {
  return (
    <section className='bg-surface-container-lowest border-outline-variant/30 overflow-hidden rounded-xl border shadow-sm'>
      <div className='border-outline-variant/30 flex items-center justify-between border-b px-6 py-5'>
        <h3 className='text-label-lg font-label-lg text-on-surface font-bold uppercase'>
          Recent Bookings
        </h3>
        <Button
          variant='ghost'
          size='sm'
          onClick={onViewAll}
          className='text-primary cursor-pointer text-xs font-bold hover:underline'
        >
          View All Bookings
        </Button>
      </div>
      <div className='overflow-x-auto'>
        {recentBookings.length === 0 ? (
          <div className='text-on-surface-variant p-8 text-center text-sm font-semibold'>
            No bookings recorded yet.
          </div>
        ) : (
          <Table className='w-full border-collapse text-left'>
            <TableHeader>
              <TableRow className='bg-surface-container-low border-outline-variant/30 border-b'>
                <TableHead className='text-label-md font-label-md text-outline px-6 py-4 tracking-wider uppercase'>
                  Rider
                </TableHead>
                <TableHead className='text-label-md font-label-md text-outline px-6 py-4 tracking-wider uppercase'>
                  Route
                </TableHead>
                <TableHead className='text-label-md font-label-md text-outline px-6 py-4 tracking-wider uppercase'>
                  Fare
                </TableHead>
                <TableHead className='text-label-md font-label-md text-outline px-6 py-4 tracking-wider uppercase'>
                  Status
                </TableHead>
                <TableHead className='text-label-md font-label-md text-outline px-6 py-4 text-right tracking-wider uppercase'>
                  Created At
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='divide-outline-variant/10 divide-y'>
              {recentBookings.map((b) => (
                <TableRow
                  key={b._id}
                  className='hover:bg-surface-container-low group transition-colors'
                >
                  <TableCell className='px-6 py-3'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-primary/10 text-primary flex h-8 w-8 items-center justify-center overflow-hidden rounded-full text-xs font-bold'>
                        {b.ride?.user?.name ? b.ride.user.name[0] : 'R'}
                      </div>
                      <div>
                        <p className='text-on-surface text-sm font-bold'>
                          {b.ride?.user?.name || 'Unknown Rider'}
                        </p>
                        <p className='text-outline text-[11px]'>
                          Cab: {b.ride?.cab?.type || 'Any'}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='px-6 py-3'>
                    <p className='text-on-surface max-w-xs truncate text-xs font-bold'>
                      {b.ride?.pickup} &rarr; {b.ride?.dropoff}
                    </p>
                  </TableCell>
                  <TableCell className='px-6 py-3'>
                    <p className='text-on-surface text-xs font-black'>
                      {formatCurrency(b.ride?.fare || 0)}
                    </p>
                  </TableCell>
                  <TableCell className='px-6 py-3'>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        b.status === 'completed'
                          ? 'bg-tertiary-container/10 text-tertiary'
                          : b.status === 'cancelled'
                            ? 'bg-error-container/10 text-error'
                            : b.status === 'confirmed'
                              ? 'bg-primary/10 text-primary'
                              : 'bg-secondary/10 text-secondary'
                      }`}
                    >
                      {b.status}
                    </span>
                  </TableCell>
                  <TableCell className='px-6 py-3 text-right'>
                    <p className='text-outline text-xs font-semibold'>
                      {new Date(b.createdAt).toLocaleDateString()}{' '}
                      {new Date(b.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
}
