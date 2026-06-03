import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCabs } from '@/hooks/useCabs';
import { useBookingStore } from '@/store/bookingStore';
import { calculateFare } from '@/utils/calculateFare';
import CabCard from '@/components/shared/CabCard';
import CabCardSkeleton from '@/components/shared/CabCardSkeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Navigation, SlidersHorizontal, Search, Sparkles, Info } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Label } from '@/components/ui/label';
import { LOCATIONS } from '@/utils/geocoding';

// Pseudo-random but deterministic distance generator based on pickup + dropoff text
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

export default function CabsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { cabs, loading, error, fetchCabs } = useCabs();
  const { setSearchQuery, setSelectedCab } = useBookingStore();

  const { isAuthenticated } = useAuth();

  // Search details from URL
  const urlPickup = searchParams.get('pickup') || '';
  const urlDropoff = searchParams.get('dropoff') || '';
  const urlPickupDate = searchParams.get('pickupDate') || '';

  // Local editable states
  const [pickup, setPickup] = useState(urlPickup);
  const [dropoff, setDropoff] = useState(urlDropoff);
  const [pickupDate, setPickupDate] = useState(urlPickupDate);

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

  // Filters
  const [typeFilter, setTypeFilter] = useState('All');
  const [capacityFilter, setCapacityFilter] = useState('All');

  // Simulated distance & ETA
  const distance = getEstimatedDistance(urlPickup, urlDropoff);
  const etaMinutes = Math.round(distance * 2 + 5);

  useEffect(() => {
    document.title = 'Available Rides | RideEase';
  }, []);

  useEffect(() => {
    fetchCabs();
    setSearchQuery({
      pickup: urlPickup,
      dropoff: urlDropoff,
      pickupDate: urlPickupDate,
    });
  }, [fetchCabs, urlPickup, urlDropoff, urlPickupDate, setSearchQuery]);

  const handleUpdateSearch = (e) => {
    e.preventDefault();
    setSearchParams({
      pickup,
      dropoff,
      pickupDate,
    });
  };

  const handleSelectCab = (cab) => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          from: `/cabs?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}&pickupDate=${pickupDate}`,
        },
      });
    } else {
      setSelectedCab(cab);
      setSearchQuery({
        pickup: pickup,
        dropoff: dropoff,
        pickupDate: pickupDate,
      });
      navigate(`/book/${cab._id}`);
    }
  };

  const filteredCabs = cabs.filter((cab) => {
    if (!cab.isAvailable) return false;

    if (typeFilter !== 'All' && cab.type !== typeFilter) return false;
    if (capacityFilter !== 'All') {
      const seats = parseInt(capacityFilter);
      if (cab.capacity < seats) return false;
    }

    return true;
  });

  return (
    <div className='animate-fade-in mx-auto w-full max-w-7xl space-y-8 p-4 sm:p-8 relative'>
      {activeInput && (pickupSuggestions.length > 0 || dropoffSuggestions.length > 0) && (
        <div className='fixed inset-0 z-10' onClick={() => setActiveInput(null)}></div>
      )}
      <div>
        <h1 className='text-on-surface text-3xl font-black tracking-tight'>Available Rides</h1>
        <p className='text-on-surface-variant mt-1 font-semibold'>
          Choose the best vehicle for your travel details below.
        </p>
      </div>

      <Card className='border-outline-variant/30 rounded-[10px] p-0 shadow-md relative z-20 overflow-visible'>
        <CardContent className='p-5 sm:p-6'>
          <form
            onSubmit={handleUpdateSearch}
            className='grid grid-cols-1 items-end gap-3 md:grid-cols-5'
          >
            <div className='space-y-1.5 md:col-span-2'>
              <Label className='text-on-surface-variant text-xs font-bold tracking-wider uppercase'>
                Pickup Location
              </Label>
              <div className='relative'>
                <MapPin className='text-tertiary-container absolute top-3 left-3 h-5 w-5' />
                <Input
                  value={pickup}
                  onChange={(e) => handleLocationChange(e.target.value, 'pickup')}
                  onFocus={() => setActiveInput('pickup')}
                  className='bg-surface-container-low border-outline-variant/30 h-11 rounded-xl pl-10'
                  placeholder='Pickup point'
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

            <div className='space-y-1.5 md:col-span-2'>
              <Label className='text-on-surface-variant text-xs font-bold tracking-wider uppercase'>
                Dropoff Location
              </Label>
              <div className='relative'>
                <Navigation className='text-error absolute top-3 left-3 h-5 w-5' />
                <Input
                  value={dropoff}
                  onChange={(e) => handleLocationChange(e.target.value, 'dropoff')}
                  onFocus={() => setActiveInput('dropoff')}
                  className='bg-surface-container-low border-outline-variant/30 h-11 rounded-xl pl-10'
                  placeholder='Dropoff point'
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

            <div>
              <Button
                type='submit'
                className='flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl font-bold'
              >
                <Search className='h-4 w-4' /> Update Search
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Main Content Layout */}
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
        {/* Sidebar Filters */}
        <div className='space-y-6 lg:col-span-1'>
          <div className='bg-surface border-outline-variant/30 space-y-6 rounded-3xl border p-6 shadow-sm'>
            <div className='flex items-center justify-between'>
              <h3 className='text-on-surface flex items-center gap-2 font-bold'>
                <SlidersHorizontal className='text-primary h-5 w-5' /> Filters
              </h3>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => {
                  setTypeFilter('All');
                  setCapacityFilter('All');
                }}
                className='text-primary hover:bg-primary/5 h-8 cursor-pointer rounded-full px-3 text-xs font-bold'
              >
                Reset
              </Button>
            </div>

            {/* Vehicle Type Filter */}
            <div className='space-y-2.5'>
              <Label className='text-outline text-xs font-bold tracking-wider uppercase'>
                Vehicle Class
              </Label>
              <div className='flex flex-col gap-1.5'>
                {['All', 'Economy', 'Comfort', 'Premium'].map((t) => (
                  <button
                    key={t}
                    type='button'
                    onClick={() => setTypeFilter(t)}
                    className={`w-full cursor-pointer rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-all ${
                      typeFilter === t
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface hover:bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Capacity Filter */}
            <div className='space-y-2.5'>
              <Label className='text-outline text-xs font-bold tracking-wider uppercase'>
                Minimum Capacity
              </Label>
              <div className='flex flex-col gap-1.5'>
                {['All', '4', '6'].map((cap) => (
                  <button
                    key={cap}
                    type='button'
                    onClick={() => setCapacityFilter(cap)}
                    className={`w-full cursor-pointer rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-all ${
                      capacityFilter === cap
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface hover:bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {cap === 'All' ? 'Any Capacity' : `${cap}+ Passengers`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Route Summary */}
          {urlPickup && urlDropoff && (
            <Card className='border-outline-variant/30 gap-0 overflow-hidden rounded-3xl p-0 shadow-sm'>
              <div className='bg-primary/5 border-outline-variant/10 border-b p-5'>
                <h4 className='text-primary flex items-center gap-1.5 font-bold'>
                  <Sparkles className='h-5 w-5' /> Trip Details
                </h4>
              </div>
              <CardContent className='text-body-sm text-on-surface-variant space-y-3.5 p-5'>
                <div className='flex items-center justify-between'>
                  <span className='text-outline font-semibold'>Estimated Distance:</span>
                  <span className='text-on-surface font-bold'>{distance} km</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-outline font-semibold'>Estimated Time (ETA):</span>
                  <span className='text-on-surface font-bold'>{etaMinutes} mins</span>
                </div>
                {urlPickupDate && (
                  <div className='flex items-center justify-between'>
                    <span className='text-outline font-semibold'>Booking Date:</span>
                    <span className='text-on-surface font-bold'>{urlPickupDate}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Listings Grid */}
        <div className='space-y-6 lg:col-span-3'>
          {/* Transparent Pricing Info Banner */}
          <div className='bg-primary/5 border-primary/10 flex items-center gap-3.5 rounded-3xl border p-4 shadow-sm'>
            <div className='bg-primary/15 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl'>
              <Info className='h-5 w-5' />
            </div>
            <div className='min-w-0'>
              <h4 className='text-on-surface text-sm font-bold'>Transparent Pricing</h4>
              <p className='text-on-surface-variant mt-0.5 text-xs font-semibold'>
                Estimation fare calculate otamaticaly based on distance and type of vehicle
              </p>
            </div>
          </div>

          {loading ? (
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              <CabCardSkeleton />
              <CabCardSkeleton />
              <CabCardSkeleton />
            </div>
          ) : error ? (
            <div className='bg-error-container/10 border-error/20 space-y-3 rounded-3xl border p-6 text-center'>
              <Info className='text-error mx-auto h-8 w-8' />
              <p className='text-error font-bold'>{error}</p>
              <Button
                onClick={() => fetchCabs()}
                variant='outline'
                className='cursor-pointer rounded-full'
              >
                Try Again
              </Button>
            </div>
          ) : filteredCabs.length === 0 ? (
            <Card className='border-outline-variant/60 flex flex-col items-center justify-center space-y-4 rounded-3xl border-dashed p-12 text-center'>
              <div className='bg-surface-container-low text-outline flex h-16 w-16 items-center justify-center rounded-full'>
                <SlidersHorizontal className='h-8 w-8' />
              </div>
              <div>
                <h3 className='text-on-surface text-lg font-bold'>No cabs match your filters</h3>
                <p className='text-on-surface-variant mx-auto mt-1 max-w-sm text-sm'>
                  Try adjusting your filters or resetting them to view the entire available fleet.
                </p>
              </div>
              <Button
                onClick={() => {
                  setTypeFilter('All');
                  setCapacityFilter('All');
                }}
                className='cursor-pointer rounded-full font-bold'
              >
                Reset Filters
              </Button>
            </Card>
          ) : (
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {filteredCabs.map((cab) => (
                <CabCard
                  key={cab._id}
                  cab={cab}
                  distance={distance}
                  estimatedPrice={calculateFare(distance, cab.type)}
                  onSelect={handleSelectCab}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
