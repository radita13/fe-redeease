import React from 'react';
import {
  Calendar,
  MapPin,
  DollarSign,
  ShieldAlert,
  Star,
  MessageSquare,
  Navigation,
} from 'lucide-react';
import { formatBookingDate } from '@/utils/formatDate';
import { formatCurrency } from '@/utils/calculateFare';
import RatingStars from './RatingStars';

export default function BookingCard({ booking, onCancel, onRateClick, onTrackClick }) {
  const ride = booking.ride || {};
  const cab = ride.cab || {};
  const driver = cab.driver || {};

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-secondary-container/10 text-secondary';
      case 'confirmed':
        return 'bg-primary/10 text-primary';
      case 'completed':
        return 'bg-tertiary/10 text-tertiary-container';
      case 'cancelled':
      default:
        return 'bg-error-container/10 text-error';
    }
  };

  const isCancellable =
    booking.status === 'pending' ||
    booking.status === 'confirmed' ||
    ride.status === 'requested' ||
    ride.status === 'confirmed';
  const isTrackable = booking.status === 'confirmed';

  return (
    <div className='bg-surface border-outline-variant/30 space-y-4 rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <span className='text-outline-variant text-xs font-bold tracking-widest uppercase'>
            Booking ID: #{booking._id?.slice(-8).toUpperCase()}
          </span>
          <h4 className='text-body-lg text-on-surface mt-1 font-bold'>
            {cab.type || 'Economy'} Cab •{' '}
            <span className='text-primary'>{cab.plateNo || 'TBD'}</span>
          </h4>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusColor(booking.status)}`}
        >
          {booking.status}
        </span>
      </div>

      {/* Date & Fare */}
      <div className='bg-surface-container-low border-outline-variant/10 text-body-sm text-on-surface-variant grid grid-cols-2 gap-4 rounded-2xl border p-3.5'>
        <div className='flex items-center gap-2'>
          <Calendar className='text-primary h-4.5 w-4.5' />
          <div>
            <p className='text-outline text-xs font-semibold'>Date & Time</p>
            <p className='text-on-surface font-bold'>{formatBookingDate(booking.createdAt)}</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <DollarSign className='text-tertiary-container h-4.5 w-4.5' />
          <div>
            <p className='text-outline text-xs font-semibold'>Total Fare</p>
            <p className='text-on-surface font-bold'>{formatCurrency(ride.fare || 0)}</p>
          </div>
        </div>
      </div>

      <div className='text-body-sm relative space-y-3 pl-6'>
        <div className='border-outline-variant/50 absolute top-2.5 bottom-2.5 left-2.5 w-0.5 border-l-2 border-dashed'></div>

        <div className='relative flex items-start gap-3'>
          <MapPin className='text-tertiary-container bg-surface absolute left-[-21px] h-4.5 w-4.5 rounded-full' />
          <div>
            <p className='text-outline text-xs font-semibold'>Pick-up</p>
            <p className='text-on-surface mt-0.5 leading-tight font-bold'>{ride.pickup}</p>
          </div>
        </div>

        <div className='relative flex items-start gap-3'>
          <MapPin className='text-error bg-surface absolute left-[-21px] h-4.5 w-4.5 rounded-full' />
          <div>
            <p className='text-outline text-xs font-semibold'>Drop-off</p>
            <p className='text-on-surface mt-0.5 leading-tight font-bold'>{ride.dropoff}</p>
          </div>
        </div>
      </div>

      {driver.name && (
        <div className='border-outline-variant/10 text-body-sm flex items-center justify-between border-t pt-3'>
          <div className='flex items-center gap-3'>
            <div className='bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-full font-bold'>
              {driver.name.charAt(0)}
            </div>
            <div>
              <p className='text-on-surface font-bold'>{driver.name}</p>
              <p className='text-on-surface-variant text-xs font-medium'>Your Driver</p>
            </div>
          </div>
        </div>
      )}

      {/* Live Tracking Status for Confirmed Bookings */}
      {booking.status === 'confirmed' && (
        <div className='border-outline-variant/10 space-y-2 border-t pt-3'>
          <div className='flex items-center justify-between text-xs'>
            <span className='text-outline font-semibold'>Live Tracking Status</span>
            <span className='text-primary flex animate-pulse items-center gap-1.5 font-bold'>
              <span className='bg-primary inline-block h-2 w-2 rounded-full'></span>
              Driver Approaching...
            </span>
          </div>
          {/* Custom progress bar tracking phase */}
          <div className='bg-surface-container-low border-outline-variant/10 relative h-2 w-full overflow-hidden rounded-full border'>
            <div className='bg-primary h-full w-1/3 animate-pulse rounded-full'></div>
          </div>
          <p className='text-on-surface-variant text-[11px] font-medium'>
            Driver is currently on the way to your pickup location. Click "Track Live" to view live
            map simulation.
          </p>
        </div>
      )}

      {/* Ratings Displayed */}
      {booking.status === 'completed' && booking.rating && (
        <div className='bg-surface-container-lowest border-outline-variant/10 space-y-2 rounded-2xl border border-t p-3 pt-3'>
          <div className='flex items-center gap-2'>
            <span className='text-outline text-xs font-semibold'>Your Rating:</span>
            <RatingStars rating={booking.rating} readonly size={16} />
          </div>
          {booking.review && (
            <div className='text-body-sm text-on-surface-variant flex items-start gap-1.5'>
              <MessageSquare className='text-outline mt-0.5 h-4 w-4' />
              <p className='italic'>"{booking.review}"</p>
            </div>
          )}
        </div>
      )}

      {/* Interactive Actions */}
      <div className='flex justify-end gap-2 pt-2'>
        {isTrackable && onTrackClick && (
          <button
            onClick={() => onTrackClick(booking)}
            className='relative flex cursor-pointer items-center gap-1.5 overflow-hidden rounded-full border border-amber-400/20 bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-amber-500/20 transition-all hover:bg-amber-600 active:scale-95'
          >
            <Navigation className='h-3.5 w-3.5 animate-bounce' />
            <span>Track Live</span>
            <span className='relative flex h-1.5 w-1.5'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75'></span>
              <span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-white'></span>
            </span>
          </button>
        )}

        {isCancellable && onCancel && (
          <button
            onClick={() => onCancel(booking._id)}
            className='bg-error-container/10 text-error hover:bg-error-container/20 flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 text-xs font-bold transition-all active:scale-95'
          >
            <ShieldAlert className='h-4 w-4' /> Cancel Booking
          </button>
        )}

        {booking.status === 'completed' && !booking.rating && onRateClick && (
          <button
            onClick={() => onRateClick(booking)}
            className='bg-primary text-on-primary flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 text-xs font-bold transition-all hover:shadow-md active:scale-95'
          >
            <Star className='h-4 w-4' /> Rate &amp; Review
          </button>
        )}
      </div>
    </div>
  );
}
