import React, { useEffect, useState } from 'react';
import { useBookings } from '@/hooks/useBookings';
import BookingCard from '@/components/shared/BookingCard';
import RatingStars from '@/components/shared/RatingStars';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { History, Clock, CheckCircle, XCircle, Star, Info, X } from 'lucide-react';
import TrackingMap from '@/components/shared/TrackingMap';
import { useAuth } from '@/hooks/useAuth';
import BookingCardSkeleton from '@/components/shared/BookingCardSkeleton';

export default function MyBookingsPage() {
  const { bookings, loading, error, fetchMyBookings, cancelBooking, rateBooking } = useBookings();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [trackingTarget, setTrackingTarget] = useState(null);
  const [ratingTarget, setRatingTarget] = useState(null);
  const [userRating, setUserRating] = useState(5);
  const [userReview, setUserReview] = useState('');
  const [submittingRating, setSubmittingRating] = useState(false);

  useEffect(() => {
    document.title = 'My Bookings | RideEase';
  }, []);

  useEffect(() => {
    fetchMyBookings();
  }, [fetchMyBookings]);

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const res = await cancelBooking(id);
      if (res.success) {
        toast.success('Booking cancelled successfully');
        fetchMyBookings();
      } else {
        toast.error(res.message || 'Failed to cancel booking');
      }
    }
  };

  const handleOpenRateModal = (booking) => {
    setRatingTarget(booking);
    setUserRating(5);
    setUserReview('');
  };

  const handleSubmitRating = async (e) => {
    e.preventDefault();
    if (!ratingTarget) return;

    setSubmittingRating(true);
    try {
      const res = await rateBooking(ratingTarget._id, userRating, userReview.trim());
      if (res.success) {
        toast.success('Your review has been submitted! Thank you.');
        setRatingTarget(null);
        fetchMyBookings();
      } else {
        toast.error(res.message || 'Failed to submit review');
      }
    } catch (err) {
      toast.error('An error occurred while submitting your review');
    } finally {
      setSubmittingRating(false);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'ongoing') return b.status === 'pending' || b.status === 'confirmed';
    if (activeTab === 'completed') return b.status === 'completed';
    if (activeTab === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  return (
    <div className='animate-fade-in mx-auto w-full max-w-7xl space-y-8 p-4 sm:p-8'>
      <div>
        <h1 className='text-on-surface text-3xl font-black tracking-tight'>My Bookings</h1>
        <p className='text-on-surface-variant mt-1 font-semibold'>
          Monitor active trip details and view your cab booking history.
        </p>
      </div>

      <div className='bg-surface-container-low border-outline-variant/30 flex max-w-lg gap-1.5 rounded-2xl border p-1.5'>
        {[
          { id: 'all', label: 'All', icon: History },
          { id: 'ongoing', label: 'Ongoing', icon: Clock },
          { id: 'completed', label: 'Completed', icon: CheckCircle },
          { id: 'cancelled', label: 'Cancelled', icon: XCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              variant='custom'
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`hover:bg-transparent-none flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border-none py-2.5 text-xs font-bold transition-all sm:text-sm ${
                activeTab === tab.id
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <Icon className='h-4 w-4' />
              <span>{tab.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Booking List Container */}
      {loading ? (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <BookingCardSkeleton />
          <BookingCardSkeleton />
        </div>
      ) : error ? (
        <div className='bg-error-container/10 border-error/20 space-y-3 rounded-3xl border p-6 text-center'>
          <Info className='text-error mx-auto h-8 w-8' />
          <p className='text-error font-bold'>{error}</p>
          <Button
            onClick={() => fetchMyBookings()}
            variant='outline'
            className='cursor-pointer rounded-full'
          >
            Reload
          </Button>
        </div>
      ) : filteredBookings.length === 0 ? (
        <Card className='border-outline-variant/60 flex flex-col items-center justify-center space-y-4 rounded-3xl border-dashed p-12 text-center'>
          <div className='bg-surface-container-low text-outline flex h-16 w-16 items-center justify-center rounded-full'>
            <History className='h-8 w-8' />
          </div>
          <div>
            <h3 className='text-on-surface text-lg font-bold'>No bookings found</h3>
            <p className='text-on-surface-variant mx-auto mt-1 max-w-sm text-sm'>
              No ride history found in this tab. Go book a new ride now!
            </p>
          </div>
        </Card>
      ) : (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onCancel={handleCancel}
              onRateClick={handleOpenRateModal}
              onTrackClick={(b) => setTrackingTarget(b)}
            />
          ))}
        </div>
      )}

      {ratingTarget && (
        <div className='animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm'>
          <div className='bg-surface border-outline-variant/30 animate-scale-up w-full max-w-md space-y-6 overflow-hidden rounded-3xl border p-6 shadow-2xl'>
            <div className='space-y-1'>
              <h3 className='text-on-surface flex items-center gap-1.5 text-xl font-black tracking-tight'>
                <Star className='text-primary fill-primary h-5 w-5' /> Rate Your Driver
              </h3>
              <p className='text-on-surface-variant text-xs font-semibold'>
                Provide a review of your trip with driver{' '}
                {ratingTarget?.ride?.cab?.driver?.name || 'us'}.
              </p>
            </div>

            <form onSubmit={handleSubmitRating} className='space-y-4'>
              <div className='bg-surface-container-low border-outline-variant/10 flex flex-col items-center gap-2 rounded-2xl border p-4'>
                <span className='text-outline text-xs font-bold tracking-wider uppercase'>
                  Driver Rating
                </span>
                <RatingStars
                  rating={userRating}
                  onRatingChange={(rating) => setUserRating(rating)}
                  size={32}
                />
                <span className='text-primary mt-1 text-xs font-bold'>
                  {userRating === 5
                    ? 'Excellent!'
                    : userRating === 4
                      ? 'Good'
                      : userRating === 3
                        ? 'Average'
                        : userRating === 2
                          ? 'Poor'
                          : 'Terrible'}
                </span>
              </div>

              <div className='space-y-1'>
                <label className='text-on-surface-variant text-xs font-bold tracking-wider uppercase'>
                  Review (Optional)
                </label>
                <textarea
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  placeholder='Write your ride review here...'
                  rows={3}
                  className='border-outline-variant/30 bg-surface focus:ring-primary/20 focus:border-primary w-full resize-none rounded-2xl border px-4 py-3 text-sm focus:ring-2 focus:outline-none'
                />
              </div>

              <div className='flex justify-end gap-3 pt-2'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setRatingTarget(null)}
                  className='cursor-pointer rounded-full px-5 font-bold'
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  disabled={submittingRating}
                  className='cursor-pointer rounded-full px-6 font-bold'
                >
                  {submittingRating ? 'Sending...' : 'Submit Review'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Live Map Tracking */}
      {trackingTarget && (
        <div className='animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm'>
          <div className='bg-surface border-outline-variant/30 animate-scale-up w-full max-w-2xl space-y-4 overflow-hidden rounded-3xl border p-6 shadow-2xl'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-on-surface text-xl font-black tracking-tight'>
                  Live Cab Tracking
                </h3>
                <p className='text-on-surface-variant text-xs font-semibold'>
                  Booking ID: #{trackingTarget._id?.slice(-8).toUpperCase()}
                </p>
              </div>
              <button
                onClick={() => setTrackingTarget(null)}
                className='text-on-surface-variant hover:text-primary hover:bg-surface-container cursor-pointer rounded-full p-1.5 transition-colors'
              >
                <X className='h-5 w-5' />
              </button>
            </div>

            <TrackingMap
              pickup={trackingTarget.ride?.pickup}
              dropoff={trackingTarget.ride?.dropoff}
              distance={trackingTarget.ride?.distance}
              eta={Math.round((trackingTarget.ride?.distance || 10.5) * 2 + 5)}
              riderName={user?.name}
              driverName={trackingTarget.ride?.cab?.driver?.name}
              className='h-[380px] w-full rounded-2xl'
            />
          </div>
        </div>
      )}
    </div>
  );
}
