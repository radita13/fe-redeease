import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/utils/calculateFare';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function BookingsTable({
  bookings,
  loading,
  onOpenDetails,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <section className='flex-1 p-8'>
      <div className='mb-4 w-48'>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className='bg-surface-container-low border-outline-variant text-label-lg h-12! w-full cursor-pointer rounded-xl! border px-4 transition-all *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5'>
            <SelectValue placeholder='Select Status' />
          </SelectTrigger>
          <SelectContent position='popper' className='z-50'>
            <SelectItem value='All'>All Statuses</SelectItem>
            <SelectItem value='Pending'>Pending</SelectItem>
            <SelectItem value='Confirmed'>Confirmed</SelectItem>
            <SelectItem value='Ongoing'>Ongoing</SelectItem>
            <SelectItem value='Completed'>Completed</SelectItem>
            <SelectItem value='Cancelled'>Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='bg-surface-container-lowest border-outline-variant/30 overflow-hidden rounded-2xl border shadow-sm'>
        {loading ? (
          <div className='flex flex-col items-center justify-center space-y-4 py-20'>
            <div className='border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent'></div>
            <p className='text-outline text-sm font-bold'>Loading bookings list...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className='text-on-surface-variant p-12 text-center text-sm font-semibold'>
            No bookings data found.
          </div>
        ) : (
          <Table className='w-full border-collapse text-left'>
            <TableHeader className='bg-surface-container-low border-outline-variant/30 border-b'>
              <TableRow className='hover:bg-transparent'>
                <TableHead className='text-label-md font-label-md text-on-surface-variant px-6 py-4 font-bold tracking-wider uppercase'>
                  Booking ID
                </TableHead>
                <TableHead className='text-label-md font-label-md text-on-surface-variant px-6 py-4 font-bold tracking-wider uppercase'>
                  Rider
                </TableHead>
                <TableHead className='text-label-md font-label-md text-on-surface-variant px-6 py-4 font-bold tracking-wider uppercase'>
                  Driver Name
                </TableHead>
                <TableHead className='text-label-md font-label-md text-on-surface-variant px-6 py-4 font-bold tracking-wider uppercase'>
                  Cab Type
                </TableHead>
                <TableHead className='text-label-md font-label-md text-on-surface-variant px-6 py-4 font-bold tracking-wider uppercase'>
                  Route
                </TableHead>
                <TableHead className='text-label-md font-label-md text-on-surface-variant px-6 py-4 font-bold tracking-wider uppercase'>
                  Status
                </TableHead>
                <TableHead className='text-label-md font-label-md text-on-surface-variant px-6 py-4 text-right font-bold tracking-wider uppercase'>
                  Amount
                </TableHead>
                <TableHead className='text-label-md font-label-md text-on-surface-variant px-6 py-4 text-center font-bold tracking-wider uppercase'>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='divide-outline-variant/20 divide-y'>
              {bookings.map((b) => {
                const ride = b.ride || {};
                const user = ride.user || {};
                const cab = ride.cab || {};
                const driver = cab.driver || {};
                const isOngoing = b.status === 'confirmed' && ride.status === 'ongoing';

                return (
                  <TableRow
                    key={b._id}
                    className='hover:bg-surface-container-low group border-outline-variant/10 cursor-pointer border-b transition-colors'
                    onClick={() => onOpenDetails(b)}
                  >
                    <TableCell
                      className='text-body-sm text-on-surface max-w-[120px] truncate px-6 py-4 font-medium'
                      title={b._id}
                    >
                      #{b._id.slice(-8).toUpperCase()}
                    </TableCell>
                    <TableCell className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold uppercase'>
                          {user.name ? user.name.slice(0, 2) : 'RD'}
                        </div>
                        <div>
                          <span className='text-body-md text-on-surface block font-bold'>
                            {user.name || 'Anonymous'}
                          </span>
                          <span className='text-outline block text-xs'>{user.phone || '-'}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='text-body-md text-on-surface px-6 py-4'>
                      {driver.name || <span className='text-on-surface-variant/40 italic'>—</span>}
                    </TableCell>
                    <TableCell className='px-6 py-4'>
                      <Badge
                        variant={
                          cab.type === 'Premium'
                            ? 'default'
                            : cab.type === 'Comfort'
                              ? 'secondary'
                              : 'outline'
                        }
                        className={`text-label-md font-label-md rounded-full px-3 py-1 font-bold ${
                          cab.type === 'Premium'
                            ? 'bg-primary-container/20 text-primary-container border-primary-container/30 border'
                            : cab.type === 'Comfort'
                              ? 'bg-secondary-container/20 text-secondary border-secondary-container/30 border'
                              : 'bg-outline-variant/30 text-on-surface-variant border-outline-variant/40 border'
                        }`}
                      >
                        {cab.type || '-'}
                      </Badge>
                    </TableCell>
                    <TableCell className='px-6 py-4'>
                      <div className='flex max-w-[180px] flex-col gap-0.5'>
                        <span
                          className='text-label-lg text-on-surface truncate font-semibold'
                          title={ride.pickup}
                        >
                          {ride.pickup || '-'}
                        </span>
                        <span className='material-symbols-outlined text-outline self-start text-[14px]'>
                          south
                        </span>
                        <span
                          className='text-label-md text-on-surface-variant truncate'
                          title={ride.dropoff}
                        >
                          {ride.dropoff || '-'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className='px-6 py-4'>
                      {isOngoing ? (
                        <Badge className='bg-primary/10 text-primary hover:bg-primary/15 border-primary/30 rounded-full border px-3 py-1 text-xs font-bold'>
                          Ongoing
                        </Badge>
                      ) : b.status === 'pending' ? (
                        <Badge className='bg-secondary-container/10 text-secondary hover:bg-secondary-container/15 border-secondary-container/30 animate-pulse-subtle rounded-full border px-3 py-1 text-xs font-bold'>
                          Pending
                        </Badge>
                      ) : b.status === 'confirmed' ? (
                        <Badge className='bg-primary-container/10 text-primary-container hover:bg-primary-container/15 border-primary-container/30 rounded-full border px-3 py-1 text-xs font-bold'>
                          Confirmed
                        </Badge>
                      ) : b.status === 'completed' ? (
                        <Badge className='bg-tertiary-container/10 text-tertiary hover:bg-tertiary-container/15 border-tertiary-container/30 rounded-full border px-3 py-1 text-xs font-bold'>
                          Completed
                        </Badge>
                      ) : (
                        <Badge className='bg-error/10 text-error hover:bg-error/15 border-error/30 rounded-full border px-3 py-1 text-xs font-bold'>
                          Cancelled
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className='text-body-md text-on-surface px-6 py-4 text-right font-semibold'>
                      {formatCurrency(ride.fare || 0)}
                    </TableCell>
                    <TableCell
                      className='px-6 py-4 text-center'
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => onOpenDetails(b)}
                        className='hover:bg-surface-container text-outline group-hover:text-primary cursor-pointer rounded-lg p-2 transition-colors'
                      >
                        <span className='material-symbols-outlined'>visibility</span>
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
}
