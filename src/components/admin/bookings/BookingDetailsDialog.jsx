import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/calculateFare';

export default function BookingDetailsDialog({
  booking,
  actionLoading,
  onClose,
  onDeclineCancel,
  onApproveConfirm,
  onStartTrip,
  onCompleteTrip,
}) {
  if (!booking) return null;

  return (
    <div className='bg-inverse-surface/60 fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300'>
      <div className='bg-surface-container-lowest animate-in fade-in zoom-in border-outline-variant/20 mx-4 w-full max-w-lg overflow-hidden rounded-3xl border shadow-2xl duration-300'>
        <div className='border-outline-variant/20 flex items-center justify-between border-b px-8 py-6'>
          <div>
            <h3 className='text-headline-md font-headline-md text-on-surface font-black'>
              Booking Details
            </h3>
            <p className='text-label-lg font-label-lg text-primary mt-1'>
              ID: #{booking._id.toUpperCase()}
            </p>
          </div>
          <button
            className='hover:bg-surface-container-high cursor-pointer rounded-full p-2 transition-colors'
            onClick={onClose}
          >
            <span className='material-symbols-outlined text-on-surface-variant'>close</span>
          </button>
        </div>

        {/* Body */}
        <div className='max-h-[60vh] space-y-6 overflow-y-auto p-8'>
          <div className='grid grid-cols-2 gap-6'>
            <div>
              <p className='text-label-md font-label-md text-on-surface-variant mb-1 font-bold tracking-wider uppercase'>
                Rider
              </p>
              <p className='text-body-md text-on-surface font-semibold'>
                {booking.ride?.user?.name || 'Anonymous'}
              </p>
              <p className='text-body-sm text-on-surface-variant font-medium'>
                {booking.ride?.user?.email || '-'}
              </p>
              <p className='text-body-sm text-on-surface-variant font-medium'>
                {booking.ride?.user?.phone || '-'}
              </p>
            </div>
            <div>
              <p className='text-label-md font-label-md text-on-surface-variant mb-1 font-bold tracking-wider uppercase'>
                Vehicle Details
              </p>
              <p className='text-body-md text-on-surface font-semibold'>
                RideEase {booking.ride?.cab?.type || 'Standard'}
              </p>
              <p className='text-body-sm text-on-surface-variant font-medium'>
                Plate No:{' '}
                <span className='text-on-surface font-bold'>
                  {booking.ride?.cab?.plateNo || '-'}
                </span>
              </p>
              <p className='text-body-sm text-on-surface-variant font-medium'>
                Driver:{' '}
                <span className='text-on-surface font-bold'>
                  {booking.ride?.cab?.driver?.name || 'Unassigned'}
                </span>
              </p>
            </div>
          </div>

          {/* Payment Receipt Preview */}
          <div>
            <p className='text-label-md font-label-md text-on-surface-variant mb-2 flex items-center gap-2 font-bold tracking-wider uppercase'>
              Payment Status:
              <Badge
                variant={booking.paymentID ? 'default' : 'secondary'}
                className='rounded-full text-[10px] font-black uppercase'
              >
                {booking.paymentID ? 'Verified' : 'Pending/Cash'}
              </Badge>
            </p>
            {booking.paymentID && (
              <p className='text-on-surface-variant mb-2 text-xs font-semibold'>
                Payment ID: {booking.paymentID}
              </p>
            )}
            <div className='group border-outline-variant/40 bg-surface-container relative aspect-video overflow-hidden rounded-2xl border shadow-inner'>
              <img
                alt='Payment Receipt'
                className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                src='/images/payment_receipt.png'
              />
            </div>
          </div>

          {/* Route Summary */}
          <div className='bg-surface-container-low border-outline-variant/20 flex flex-col gap-4 rounded-xl border p-4'>
            <div className='flex items-center gap-4'>
              <div className='flex flex-col items-center gap-1'>
                <div className='bg-primary ring-primary/20 h-2.5 w-2.5 rounded-full ring-4'></div>
                <div className='border-outline-variant h-6 w-0.5 border-l-2 border-dashed'></div>
                <div className='border-primary h-2.5 w-2.5 rounded-full border-2 bg-white'></div>
              </div>
              <div className='flex min-w-0 flex-col gap-3'>
                <p
                  className='text-label-lg text-on-surface truncate leading-none font-medium'
                  title={booking.ride?.pickup}
                >
                  {booking.ride?.pickup || '-'}
                </p>
                <p
                  className='text-label-lg text-on-surface truncate leading-none font-medium'
                  title={booking.ride?.dropoff}
                >
                  {booking.ride?.dropoff || '-'}
                </p>
              </div>
            </div>

            {/* Divider Line */}
            <div className='bg-outline-variant h-px w-full'></div>

            <div className='text-right'>
              <p className='text-label-md text-on-surface-variant font-bold'>Fare Paid</p>
              <p className='text-headline-sm text-primary font-black'>
                {formatCurrency(booking.ride?.fare || 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className='bg-surface-container-low border-outline-variant/20 flex gap-4 border-t px-8 py-6'>
          {actionLoading ? (
            <div className='flex w-full justify-center py-2'>
              <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent'></div>
            </div>
          ) : (
            <>
              {/* PENDING: Approve/Decline */}
              {booking.status === 'pending' && (
                <>
                  <Button
                    variant='outline'
                    className='border-primary text-primary hover:bg-primary/5 hover:text-primary font-label-lg h-12 flex-1 cursor-pointer rounded-full border-2 font-bold transition-all duration-150 active:scale-95'
                    onClick={() => onDeclineCancel(booking._id)}
                  >
                    Decline Request
                  </Button>
                  <Button
                    className='bg-primary text-on-primary hover:bg-primary/95 hover:shadow-primary/25 font-label-lg flex h-12 flex-[1.5] cursor-pointer items-center justify-center gap-2 rounded-full border-none font-bold shadow-lg transition-all duration-150 hover:shadow-lg active:scale-95'
                    onClick={() => onApproveConfirm(booking._id)}
                  >
                    <span className='material-symbols-outlined text-[20px]'>how_to_reg</span>
                    Approve & Confirm
                  </Button>
                </>
              )}

              {/* CONFIRMED & Requested/Confirmed: Start Trip */}
              {booking.status === 'confirmed' &&
                booking.ride?.status !== 'ongoing' &&
                booking.ride?.status !== 'completed' &&
                booking.ride?.status !== 'cancelled' && (
                  <>
                    <Button
                      variant='destructive'
                      className='bg-error hover:bg-error/95 hover:shadow-error/25 text-on-error font-label-lg h-12 flex-1 cursor-pointer rounded-full border-none font-bold shadow-lg transition-all duration-150 active:scale-95'
                      onClick={() => onDeclineCancel(booking._id)}
                    >
                      Cancel Booking
                    </Button>
                    <Button
                      className='bg-primary text-on-primary hover:bg-primary/95 hover:shadow-primary/25 font-label-lg flex h-12 flex-[1.5] cursor-pointer items-center justify-center gap-2 rounded-full border-none font-bold shadow-lg transition-all duration-150 hover:shadow-lg active:scale-95'
                      onClick={() => onStartTrip(booking.ride._id, booking._id)}
                    >
                      <span className='material-symbols-outlined text-[20px]'>play_arrow</span>
                      Start Trip (Ongoing)
                    </Button>
                  </>
                )}

              {/* CONFIRMED & Ongoing: Complete Trip */}
              {booking.status === 'confirmed' && booking.ride?.status === 'ongoing' && (
                <>
                  <Button
                    variant='destructive'
                    className='bg-error hover:bg-error/95 hover:shadow-error/25 text-on-error font-label-lg h-12 flex-1 cursor-pointer rounded-full border-none font-bold shadow-lg transition-all duration-150 active:scale-95'
                    onClick={() => onDeclineCancel(booking._id)}
                  >
                    Cancel Booking
                  </Button>
                  <Button
                    className='bg-tertiary hover:bg-tertiary/90 text-on-tertiary font-label-lg shadow-tertiary/20 flex h-12 flex-[1.5] cursor-pointer items-center justify-center gap-2 rounded-full border-none font-bold shadow-lg transition-all duration-150 active:scale-95'
                    onClick={() => onCompleteTrip(booking._id)}
                  >
                    <span className='material-symbols-outlined text-[20px]'>done_all</span>
                    Complete Trip
                  </Button>
                </>
              )}

              {/* COMPLETED or CANCELLED: Simple Close Button */}
              {(booking.status === 'completed' || booking.status === 'cancelled') && (
                <Button
                  className='bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant font-label-lg border-outline-variant/30 h-12 w-full cursor-pointer rounded-full border font-bold transition-all duration-150 active:scale-95'
                  onClick={onClose}
                >
                  Close Details
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
