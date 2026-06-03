import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCabs } from '@/hooks/useCabs';
import { useBookings } from '@/hooks/useBookings';
import { useBookingStore } from '@/store/bookingStore';
import { useAuth } from '@/hooks/useAuth';
import { calculateFare, formatCurrency } from '@/utils/calculateFare';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TrackingMap from '@/components/shared/TrackingMap';
import {
  ArrowLeft,
  MapPin,
  Navigation,
  ShieldCheck,
  Info,
  DollarSign,
  CreditCard,
  Gift,
  CheckCircle2,
  Loader2,
  Calendar,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { LOCATIONS } from '@/utils/geocoding';

// Helper to simulate distance estimation
const getEstimatedDistance = (pickup, dropoff) => {
  if (!pickup || !dropoff) return 10.5;
  const combinedStr = (pickup + dropoff).toLowerCase();
  let hash = 0;
  for (let i = 0; i < combinedStr.length; i++) {
    hash = combinedStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  const dist = 3.5 + (Math.abs(hash) % 250) / 10;
  return Number(dist.toFixed(1));
};

export default function BookCabPage() {
  const { id: cabId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getCabDetails } = useCabs();
  const { requestRide, confirmBooking } = useBookings();
  const storeQuery = useBookingStore();

  const [cab, setCab] = useState(null);
  const [loadingCab, setLoadingCab] = useState(true);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const [pickup, setPickup] = useState(storeQuery.pickup || '');
  const [dropoff, setDropoff] = useState(storeQuery.dropoff || '');
  const [pickupDate, setPickupDate] = useState(() => {
    const rawDate = storeQuery.pickupDate || '';
    if (rawDate && rawDate.length === 10) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${rawDate}T${hours}:${minutes}`;
    }
    return rawDate;
  });

  // Autocomplete Suggestions
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null);

  const handleLocationChange = (val, type) => {
    if (type === 'pickup') {
      setPickup(val);
      if (val.trim() === '') {
        setPickupSuggestions([]);
      } else {
        const filtered = LOCATIONS.filter((loc) =>
          loc.toLowerCase().includes(val.toLowerCase())
        );
        setPickupSuggestions(filtered);
      }
    } else {
      setDropoff(val);
      if (val.trim() === '') {
        setDropoffSuggestions([]);
      } else {
        const filtered = LOCATIONS.filter((loc) =>
          loc.toLowerCase().includes(val.toLowerCase())
        );
        setDropoffSuggestions(filtered);
      }
    }
  };

  const selectSuggestion = (loc, type) => {
    if (type === 'pickup') {
      setPickup(loc);
      setPickupSuggestions([]);
    } else {
      setDropoff(loc);
      setDropoffSuggestions([]);
    }
    setActiveInput(null);
  };

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [vipDriver, setVipDriver] = useState(false);
  const [carbonOffset, setCarbonOffset] = useState(false);

  const fetchDetails = useCallback(async () => {
    setLoadingCab(true);
    const res = await getCabDetails(cabId);
    if (res.success && res.data) {
      setCab(res.data);
    } else {
      toast.error('Failed to load cab details');
      navigate('/cabs');
    }
    setLoadingCab(false);
  }, [cabId, getCabDetails, navigate]);

  useEffect(() => {
    document.title = 'Book a Ride | RideEase';
  }, []);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  // Calculations
  const distance = getEstimatedDistance(pickup, dropoff);
  const baseFare = cab ? calculateFare(distance, cab.type) : 0;
  const vipCost = vipDriver ? 15000 : 0;
  const carbonCost = carbonOffset ? 5000 : 0;
  const totalFare = baseFare + vipCost + carbonCost;
  const etaMinutes = Math.round(distance * 2 + 5);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!pickup.trim() || !dropoff.trim() || !pickupDate) {
      toast.error('Please complete both pickup and drop-off locations.');
      return;
    }

    setBookingInProgress(true);
    try {
      const rideRes = await requestRide({
        cab: cabId,
        pickup: pickup.trim(),
        dropoff: dropoff.trim(),
        fare: totalFare,
        startTime: pickupDate ? new Date(pickupDate) : null,
      });

      if (!rideRes.success) {
        toast.error(rideRes.message || 'Failed to create ride request');
        setBookingInProgress(false);
        return;
      }

      const bookingRes = await confirmBooking(rideRes.data._id);
      if (bookingRes.success) {
        setBookingId(bookingRes.data._id);
        setBookingSuccess(true);
        toast.success('Cab Booking Confirmed Successfully!');
      } else {
        toast.error(bookingRes.message || 'Failed to confirm booking');
      }
    } catch (err) {
      toast.error('An error occurred during the booking process.');
      console.error(err);
    } finally {
      setBookingInProgress(false);
    }
  };

  if (loadingCab) {
    return (
      <div className='flex min-h-[70vh] flex-col items-center justify-center space-y-4'>
        <Loader2 className='border-primary text-primary h-10 w-10 animate-spin' />
        <p className='text-outline text-sm font-bold'>Loading vehicle specifications...</p>
      </div>
    );
  }

  if (bookingSuccess) {
    return (
      <div className='animate-scale-up mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center space-y-6 p-6 text-center'>
        <div className='bg-tertiary/10 text-tertiary-container mx-auto flex h-16 w-16 items-center justify-center rounded-full'>
          <CheckCircle2 className='h-10 w-10' />
        </div>
        <div className='space-y-2'>
          <h2 className='text-on-surface text-3xl font-black tracking-tight'>Booking Confirmed!</h2>
          <p className='text-on-surface-variant text-sm font-semibold'>
            Your booking has been recorded with ID #{bookingId.slice(-8).toUpperCase()}
          </p>
        </div>

        <div className='grid grid-cols-1 items-stretch gap-6 text-left md:grid-cols-2'>
          {/* Real-time Tracking Map */}
          <TrackingMap
            pickup={pickup}
            dropoff={dropoff}
            distance={distance}
            eta={etaMinutes}
            riderName={user?.name}
            driverName={cab?.driver?.name}
            className='h-full min-h-[350px] w-full rounded-3xl'
          />

          {/* Details Column */}
          <div className='flex flex-col justify-between space-y-6'>
            <Card className='border-outline-variant/30 bg-surface-container-low text-body-sm text-on-surface-variant flex-1 space-y-3.5 rounded-2xl p-5'>
              <div className='border-outline-variant/10 flex items-center justify-between border-b pb-2'>
                <span className='text-on-surface font-bold'>Vehicle</span>
                <span className='text-primary font-bold'>
                  {cab?.plateNo} ({cab?.type})
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-outline font-semibold'>Driver</span>
                <span className='text-on-surface font-bold'>{cab?.driver?.name || 'TBD'}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-outline font-semibold'>Route</span>
                <span className='text-on-surface max-w-[200px] truncate font-bold'>
                  {pickup} → {dropoff}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-outline font-semibold'>Fare Paid</span>
                <span className='text-primary font-bold'>{formatCurrency(totalFare)}</span>
              </div>
              <div className='bg-primary/10 text-primary mt-2 flex items-center justify-between rounded-lg p-2.5 text-xs font-bold'>
                <span>Driver ETA</span>
                <span>{etaMinutes} Mins</span>
              </div>
            </Card>

            <div className='flex flex-col gap-2'>
              <Button
                onClick={() => navigate('/my-bookings')}
                className='w-full cursor-pointer rounded-full font-bold'
              >
                View Ride History
              </Button>
              <Button
                variant='outline'
                onClick={() => navigate('/dashboard')}
                className='w-full cursor-pointer rounded-full font-bold'
              >
                Back to Homepage
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='animate-fade-in mx-auto w-full max-w-6xl space-y-8 p-4 sm:p-8 relative'>
      {activeInput && (pickupSuggestions.length > 0 || dropoffSuggestions.length > 0) && (
        <div className='fixed inset-0 z-10' onClick={() => setActiveInput(null)}></div>
      )}
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className='text-on-surface-variant hover:text-primary group flex cursor-pointer items-center gap-1.5 text-sm font-bold transition-colors'
      >
        <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-0.5' /> Back to
        Cab List
      </button>
 
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        {/* Left Column: Form details */}
        <div className='space-y-6 lg:col-span-2 relative z-20'>
          <Card className='border-outline-variant/30 rounded-lg shadow-md relative z-20 overflow-visible'>
            <CardHeader>
              <CardTitle className='text-2xl font-black tracking-tight'>
                Your Ride Details
              </CardTitle>
              <CardDescription>
                Complete your route and optional add-ons to place your booking.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-5'>
              <form onSubmit={handleBooking} className='space-y-5'>
                {/* Route Inputs */}
                <div className='space-y-4'>
                  <div className='space-y-1'>
                    <Label className='text-on-surface-variant mb-1 block text-xs font-bold tracking-wider uppercase'>
                      Pickup Location
                    </Label>
                    <div className='relative'>
                      <MapPin className='text-tertiary-container absolute top-3 left-3 h-5 w-5' />
                      <Input
                        value={pickup}
                        onChange={(e) => handleLocationChange(e.target.value, 'pickup')}
                        onFocus={() => setActiveInput('pickup')}
                        required
                        className='bg-surface-container-low border-outline-variant/30 h-11 rounded-xl pl-10'
                        placeholder='Enter pickup address'
                      />
                      {/* Autocomplete Suggestions */}
                      {activeInput === 'pickup' && pickupSuggestions.length > 0 && (
                        <div className='bg-surface border-outline-variant/20 absolute top-full left-0 z-30 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl border py-2 shadow-xl'>
                          {pickupSuggestions.map((loc) => (
                            <div
                              key={loc}
                              onClick={(e) => {
                                e.stopPropagation();
                                selectSuggestion(loc, 'pickup');
                              }}
                              className='hover:bg-primary/5 text-body-sm text-on-surface flex cursor-pointer items-center gap-2 px-4 py-3 font-semibold transition-colors'
                            >
                              <span className='material-symbols-outlined text-outline-variant text-base'>
                                location_on
                              </span>
                              {loc}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
 
                  <div className='space-y-1'>
                    <Label className='text-on-surface-variant mb-1 block text-xs font-bold tracking-wider uppercase'>
                      Drop-off Location
                    </Label>
                    <div className='relative'>
                      <Navigation className='text-error absolute top-3 left-3 h-5 w-5' />
                      <Input
                        value={dropoff}
                        onChange={(e) => handleLocationChange(e.target.value, 'dropoff')}
                        onFocus={() => setActiveInput('dropoff')}
                        required
                        className='bg-surface-container-low border-outline-variant/30 h-11 rounded-xl pl-10'
                        placeholder='Enter drop-off address'
                      />
                      {/* Autocomplete Suggestions */}
                      {activeInput === 'dropoff' && dropoffSuggestions.length > 0 && (
                        <div className='bg-surface border-outline-variant/20 absolute top-full left-0 z-30 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl border py-2 shadow-xl'>
                          {dropoffSuggestions.map((loc) => (
                            <div
                              key={loc}
                              onClick={(e) => {
                                e.stopPropagation();
                                selectSuggestion(loc, 'dropoff');
                              }}
                              className='hover:bg-primary/5 text-body-sm text-on-surface flex cursor-pointer items-center gap-2 px-4 py-3 font-semibold transition-colors'
                            >
                              <span className='material-symbols-outlined text-outline-variant text-base'>
                                location_on
                              </span>
                              {loc}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
 
                  <div className='space-y-1'>
                    <Label className='text-on-surface-variant mb-1 block text-xs font-bold tracking-wider uppercase'>
                      Departure Date / Time
                    </Label>
                    <div className='relative'>
                      <Calendar className='text-primary absolute top-3 left-3 h-5 w-5' />
                      <Input
                        type='datetime-local'
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className='bg-surface-container-low border-outline-variant/30 h-11 cursor-pointer rounded-xl pl-10'
                      />
                    </div>
                  </div>
                </div>

                {/* Add-ons/Extras */}
                <div className='border-outline-variant/10 space-y-3 border-t pt-4'>
                  <h4 className='text-on-surface text-sm font-bold tracking-wider uppercase'>
                    Additional Services
                  </h4>

                  {/* Extra 1 */}
                  <div
                    onClick={() => setVipDriver(!vipDriver)}
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                      vipDriver
                        ? 'border-primary bg-primary/5'
                        : 'border-outline-variant/30 bg-surface'
                    }`}
                  >
                    <div className='flex items-center gap-3'>
                      <ShieldCheck className='text-primary h-5 w-5' />
                      <div>
                        <p className='text-on-surface text-sm font-bold'>VIP Driver</p>
                        <p className='text-on-surface-variant text-xs'>
                          Priority drivers with top ratings &amp; clean vehicles
                        </p>
                      </div>
                    </div>
                    <span className='text-primary text-xs font-bold'>+ $15.00</span>
                  </div>

                  {/* Extra 2 */}
                  <div
                    onClick={() => setCarbonOffset(!carbonOffset)}
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                      carbonOffset
                        ? 'border-primary bg-primary/5'
                        : 'border-outline-variant/30 bg-surface'
                    }`}
                  >
                    <div className='flex items-center gap-3'>
                      <Gift className='text-tertiary-container h-5 w-5' />
                      <div>
                        <p className='text-on-surface text-sm font-bold'>Climate Offset</p>
                        <p className='text-on-surface-variant text-xs'>
                          Donate to support climate protection &amp; carbon offset
                        </p>
                      </div>
                    </div>
                    <span className='text-primary text-xs font-bold'>+ $5.00</span>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className='border-outline-variant/10 space-y-3 border-t pt-4'>
                  <h4 className='text-on-surface text-sm font-bold tracking-wider uppercase'>
                    Payment Method
                  </h4>
                  <div className='grid grid-cols-3 gap-3'>
                    {[
                      { id: 'cash', label: 'Cash', icon: DollarSign },
                      { id: 'wallet', label: 'Wallet', icon: Gift },
                      { id: 'card', label: 'Credit Card', icon: CreditCard },
                    ].map((pm) => {
                      const Icon = pm.icon;
                      return (
                        <div
                          key={pm.id}
                          onClick={() => setPaymentMethod(pm.id)}
                          className={`flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border p-3 transition-all ${
                            paymentMethod === pm.id
                              ? 'border-primary bg-primary/5 text-primary font-bold'
                              : 'border-outline-variant/30 bg-surface text-on-surface-variant'
                          }`}
                        >
                          <Icon className='h-5 w-5' />
                          <span className='text-xs'>{pm.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Booking button */}
                <Button
                  type='submit'
                  disabled={bookingInProgress}
                  className='mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full py-6 text-base font-bold transition-all hover:shadow-lg active:scale-98'
                >
                  {bookingInProgress ? (
                    <>
                      <Loader2 className='h-5 w-5 animate-spin' /> Contacting Driver...
                    </>
                  ) : (
                    <>Confirm Booking ({formatCurrency(totalFare)})</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Cab specs */}
        <div className='space-y-6'>
          <Card className='border-outline-variant/30 gap-0 overflow-hidden rounded-lg py-0 shadow-md'>
            <div className='bg-primary/5 relative h-44'>
              <img
                src={cab?.image || '/images/premium_taxi.png'}
                alt='Selected Car'
                className='h-full w-full object-cover'
              />
              <span className='bg-primary text-on-primary absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold'>
                {cab?.type}
              </span>
            </div>

            <CardContent className='space-y-4 p-6'>
              <div>
                <h3 className='text-on-surface text-xl font-bold'>{cab?.plateNo}</h3>
                <p className='text-on-surface-variant mt-0.5 flex items-center gap-1 text-xs font-semibold'>
                  <Users className='h-3.5 w-3.5' /> Max {cab?.capacity} Passengers
                </p>
              </div>

              {/* Driver summary */}
              {cab?.driver && (
                <div className='bg-surface-container-low border-outline-variant/10 space-y-2 rounded-2xl border p-4'>
                  <span className='text-outline text-[10px] font-bold tracking-wider uppercase'>
                    Driver Assigned
                  </span>
                  <div className='flex items-center gap-3'>
                    <div className='bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full text-base font-bold'>
                      {cab?.driver?.name?.charAt(0)}
                    </div>
                    <div>
                      <p className='text-on-surface text-sm font-bold'>{cab?.driver?.name}</p>
                      <p className='text-on-surface-variant flex items-center gap-1 text-xs font-medium'>
                        License: {cab?.driver?.license}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Summary */}
              <div className='border-outline-variant/10 space-y-2 border-t pt-4'>
                <span className='text-outline text-xs font-bold tracking-wider uppercase'>
                  Payment Details
                </span>

                <div className='text-body-sm text-on-surface-variant space-y-1.5'>
                  <div className='flex justify-between'>
                    <span>Base Fare ({distance} km)</span>
                    <span className='text-on-surface font-semibold'>
                      {formatCurrency(baseFare)}
                    </span>
                  </div>
                  {vipDriver && (
                    <div className='flex justify-between'>
                      <span>VIP Service</span>
                      <span className='text-on-surface font-semibold'>
                        {formatCurrency(vipCost)}
                      </span>
                    </div>
                  )}
                  {carbonOffset && (
                    <div className='flex justify-between'>
                      <span>Climate Offset</span>
                      <span className='text-on-surface font-semibold'>
                        {formatCurrency(carbonCost)}
                      </span>
                    </div>
                  )}
                  <div className='border-outline-variant/20 text-body-lg text-on-surface flex justify-between border-t border-dashed pt-2 font-bold'>
                    <span>Total Payment</span>
                    <span className='text-primary'>{formatCurrency(totalFare)}</span>
                  </div>
                </div>
              </div>

              {/* Security info banner */}
              <div className='bg-tertiary/5 border-tertiary/10 text-on-surface-variant flex items-start gap-2 rounded-2xl border p-3.5 text-xs leading-relaxed'>
                <Info className='text-tertiary-container mt-0.5 h-4 w-4 shrink-0' />
                <p>
                  Your trip is covered by our safety guarantee. Our drivers are officially certified
                  and vehicles are regularly cleaned.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
