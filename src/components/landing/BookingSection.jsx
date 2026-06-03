import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { CalendarDays, MapPin, MapPinned } from 'lucide-react';
import { Button } from '../ui/button';
import { LOCATIONS } from '@/utils/geocoding';

export default function BookingSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [pickupDate, setPickupDate] = useState('');

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null);

  const handleSearchChange = (val, type) => {
    if (type === 'pickup') {
      setPickup(val);
      if (val.trim() === '') {
        setPickupSuggestions([]);
      } else {
        const filtered = LOCATIONS.filter((loc) => loc.toLowerCase().includes(val.toLowerCase()));
        setPickupSuggestions(filtered);
      }
    } else {
      setDropoff(val);
      if (val.trim() === '') {
        setDropoffSuggestions([]);
      } else {
        const filtered = LOCATIONS.filter((loc) => loc.toLowerCase().includes(val.toLowerCase()));
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!pickup.trim()) {
      alert('Please fill in a pick-up location');
      return;
    }
    const targetUrl = `/cabs?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}&pickupDate=${pickupDate}`;
    if (!isAuthenticated) {
      navigate('/login', { state: { from: targetUrl } });
    } else {
      navigate(targetUrl);
    }
  };

  return (
    <section className='relative z-20 mx-auto -mt-10 max-w-6xl scroll-mt-24 px-6 lg:-mt-32'>
      <form
        onSubmit={handleSearchSubmit}
        className='bg-surface-container-lowest border-outline-variant/30 flex flex-col items-stretch gap-2 rounded-[32px] border p-4 shadow-[0_32px_64px_-16px_rgba(66,49,208,0.18)] lg:flex-row lg:items-center lg:p-2.5'
      >
        <div className='grid grow grid-cols-1 gap-2 sm:grid-cols-3'>
          {/* Pickup Location */}
          <div
            className='group hover:bg-surface-container-low border-outline-variant/20 relative cursor-pointer rounded-2xl border-b p-4 transition-colors sm:border-r sm:border-b-0'
            onClick={() => setActiveInput('pickup')}
          >
            <div className='flex items-center gap-3'>
              <MapPin className='text-tertiary size-7' />
              <div className='grow'>
                <p className='text-label-md font-label-md text-on-surface-variant font-semibold'>
                  Pick-up location
                </p>
                <Input
                  type='text'
                  className='text-body-md placeholder:text-outline/70 h-auto w-full border-none bg-transparent p-0 font-bold shadow-none focus:outline-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent'
                  placeholder='Where to?'
                  value={pickup}
                  onChange={(e) => handleSearchChange(e.target.value, 'pickup')}
                  onFocus={() => setActiveInput('pickup')}
                />
              </div>
            </div>
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
                    <span className='material-symbols-outlined text-outline-variant'>
                      location_on
                    </span>
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dropoff Location */}
          <div
            className='group hover:bg-surface-container-low border-outline-variant/20 relative cursor-pointer rounded-2xl border-b p-4 transition-colors sm:border-r sm:border-b-0'
            onClick={() => setActiveInput('dropoff')}
          >
            <div className='flex items-center gap-3'>
              <MapPinned className='text-error size-7' />
              <div className='grow'>
                <p className='text-label-md font-label-md text-on-surface-variant font-semibold'>
                  Drop-off location
                </p>
                <Input
                  type='text'
                  className='text-body-md placeholder:text-outline/70 h-auto w-full border-none bg-transparent p-0 font-bold shadow-none focus:outline-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent'
                  placeholder='Same as pickup'
                  value={dropoff}
                  onChange={(e) => handleSearchChange(e.target.value, 'dropoff')}
                  onFocus={() => setActiveInput('dropoff')}
                />
              </div>
            </div>
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
                    <span className='material-symbols-outlined text-outline-variant'>
                      location_on
                    </span>
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pickup Date */}
          <div className='group hover:bg-surface-container-low relative cursor-pointer rounded-2xl p-4 transition-colors'>
            <div className='flex items-center gap-3'>
              <CalendarDays className='text-primary size-7' />
              <div className='grow'>
                <p className='text-label-md font-label-md text-on-surface-variant font-semibold'>
                  Pick-up date
                </p>
                <Input
                  type='date'
                  className='text-body-md placeholder:text-outline/70 h-auto w-full cursor-pointer border-none bg-transparent p-0 font-bold shadow-none focus:outline-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent'
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          type='submit'
          className='bg-primary text-on-primary hover:bg-primary hover:text-on-primary m-2 flex w-full cursor-pointer items-center justify-center gap-3 rounded-[24px] px-10 py-7 text-lg font-bold transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-95 lg:w-3xs'
        >
          Find a car
          <span className='material-symbols-outlined'>search</span>
        </Button>
      </form>

      {/* Close lists on clicking elsewhere */}
      {activeInput && (pickupSuggestions.length > 0 || dropoffSuggestions.length > 0) && (
        <div className='fixed inset-0 z-10' onClick={() => setActiveInput(null)}></div>
      )}
    </section>
  );
}
