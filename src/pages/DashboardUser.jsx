import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useBookings } from '@/hooks/useBookings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Car, Clock, Star, Compass, ArrowRight, X } from 'lucide-react';
import BookingCard from '@/components/shared/BookingCard';
import TrackingMap from '@/components/shared/TrackingMap';
import { toast } from 'sonner';

export default function DashboardUser() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookings, loading, fetchMyBookings, cancelBooking } = useBookings();
  const [trackingTarget, setTrackingTarget] = useState(null);

  useEffect(() => {
    document.title = 'Dashboard | RideEase';
  }, []);

  useEffect(() => {
    fetchMyBookings();
  }, [fetchMyBookings]);

  const activeBookings = bookings.filter((b) => b.status === 'pending' || b.status === 'confirmed');
  const completedBookingsCount = bookings.filter((b) => b.status === 'completed').length;

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

  return (
    <div className='animate-fade-in mx-auto w-full max-w-7xl space-y-8 p-4 sm:p-8'>
      {/* Welcome Hero Card */}
      <div className='from-primary via-primary/90 to-tertiary-container relative overflow-hidden rounded-[32px] bg-linear-to-r p-6 text-white shadow-xl transition-all duration-300 hover:shadow-2xl sm:p-10'>
        <div className='absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/10 blur-2xl'></div>
        <div className='bg-tertiary/20 absolute bottom-0 left-1/3 -mb-10 h-48 w-48 rounded-full blur-3xl'></div>

        <div className='relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center'>
          <div className='space-y-3'>
            <span className='inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur-md'>
              ✨ Welcome back
            </span>
            <h1 className='text-3xl leading-none font-black tracking-tight sm:text-4xl lg:text-5xl'>
              Hello, {user?.name || 'Rider'}!
            </h1>
            <p className='text-body-md max-w-lg font-semibold text-white/80'>
              Where do you want to go today? Explore our fleet of vehicles to get you there in
              comfort.
            </p>
          </div>
          <Button
            onClick={() => navigate('/cabs')}
            size='lg'
            className='text-primary group flex shrink-0 cursor-pointer items-center gap-2 rounded-full border-none bg-white px-8 py-6 text-base font-bold shadow-lg transition-all hover:bg-white/95 active:scale-95'
          >
            Book a Ride{' '}
            <ArrowRight className='h-5 w-5 transition-transform group-hover:translate-x-1' />
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {/* Stat 1 */}
        <Card className='border-outline-variant/30 hover:border-primary/50 gap-0 rounded-2xl p-0 shadow-sm transition-colors'>
          <CardContent className='flex items-center gap-4 p-6'>
            <div className='bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl'>
              <Car className='h-6 w-6' />
            </div>
            <div>
              <p className='text-outline text-xs font-bold tracking-wider uppercase'>
                Total Bookings
              </p>
              <h3 className='text-on-surface mt-0.5 text-2xl font-bold'>{bookings.length}</h3>
            </div>
          </CardContent>
        </Card>

        {/* Stat 2 */}
        <Card className='border-outline-variant/30 hover:border-primary/50 gap-0 rounded-2xl p-0 shadow-sm transition-colors'>
          <CardContent className='flex items-center gap-4 p-6'>
            <div className='bg-tertiary/10 text-tertiary flex h-12 w-12 items-center justify-center rounded-xl'>
              <Star className='h-6 w-6' />
            </div>
            <div>
              <p className='text-outline text-xs font-bold tracking-wider uppercase'>
                Completed Rides
              </p>
              <h3 className='text-on-surface mt-0.5 text-2xl font-bold'>
                {completedBookingsCount}
              </h3>
            </div>
          </CardContent>
        </Card>

        {/* Stat 3 */}
        <Card className='border-outline-variant/30 hover:border-primary/50 gap-0 rounded-2xl p-0 shadow-sm transition-colors'>
          <CardContent className='flex items-center gap-4 p-6'>
            <div className='bg-error/10 text-error flex h-12 w-12 items-center justify-center rounded-xl'>
              <Clock className='h-6 w-6' />
            </div>
            <div>
              <p className='text-outline text-xs font-bold tracking-wider uppercase'>
                Active Bookings
              </p>
              <h3 className='text-on-surface mt-0.5 text-2xl font-bold'>{activeBookings.length}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Bookings Section */}
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-on-surface flex items-center gap-2 text-xl font-bold sm:text-2xl'>
            <Clock className='text-primary h-6 w-6 animate-pulse' /> Active Bookings
          </h2>
          {activeBookings.length > 0 && (
            <span className='bg-primary/10 text-primary rounded-full px-2.5 py-1 text-xs font-bold'>
              {activeBookings.length} Ongoing
            </span>
          )}
        </div>

        {loading ? (
          <div className='flex items-center justify-center py-12'>
            <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent'></div>
          </div>
        ) : activeBookings.length === 0 ? (
          <Card className='border-outline-variant/60 flex flex-col items-center justify-center space-y-4 rounded-3xl border-dashed p-8 text-center'>
            <div className='bg-surface-container-low text-outline flex h-16 w-16 items-center justify-center rounded-full'>
              <Compass className='h-8 w-8' />
            </div>
            <div className='space-y-1'>
              <CardTitle className='text-on-surface text-lg font-bold'>
                No active rides right now
              </CardTitle>
              <CardDescription className='mx-auto max-w-xs'>
                Your active and upcoming cab bookings will appear here. Start a search to book.
              </CardDescription>
            </div>
            <Button
              onClick={() => navigate('/cabs')}
              className='cursor-pointer rounded-full font-bold'
            >
              Find Cabs
            </Button>
          </Card>
        ) : (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {activeBookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onCancel={handleCancel}
                onTrackClick={(b) => setTrackingTarget(b)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Live Map Tracking Modal Overlay */}
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
