import { ArrowRight } from 'lucide-react';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function HeroSection({ handleScrollTo }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClickBooking = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cabs' } });
    } else {
      navigate('/cabs');
    }
  };

  return (
    <section
      id='home'
      className='relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-6 overflow-visible px-6 py-20 lg:flex-row lg:gap-12'
    >
      <div className='z-10 space-y-6 text-center lg:flex-1 lg:space-y-8 lg:text-left'>
        <h1 className='lg:text-display-lg font-display-lg text-on-surface mt-4 mb-2 text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:mt-0'>
          RideEase
          <span className='text-primary mt-2 block text-lg font-bold tracking-wider uppercase italic sm:text-xl md:text-2xl lg:text-3xl'>
            Comfortable For Your Trip
          </span>
        </h1>
        <p className='md:text-body-lg font-body-lg text-on-surface-variant mx-auto max-w-md text-base lg:mx-0'>
          Experience the pinnacle of mobility. RideEase offers a fleet of comfortable, premium, and
          high-performance vehicles for discerning travelers.
        </p>
        <div className='flex flex-wrap justify-center gap-4 lg:justify-start'>
          <button
            onClick={handleClickBooking}
            className='bg-primary text-on-primary text-label-lg font-label-lg shadow-primary/35 group hover:shadow-primary/50 flex cursor-pointer items-center gap-2 rounded-full px-8 py-4 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95'
          >
            Booking now
            <ArrowRight className='transition-transform duration-300 group-hover:translate-x-1.5' />
          </button>
        </div>
      </div>

      <div className='group relative mt-4 h-[320px] w-full sm:h-[400px] lg:mt-0 lg:h-[475px] lg:flex-1'>
        <div className='bg-primary/5 absolute inset-0 -rotate-3 rounded-[40px] transition-transform duration-700 group-hover:rotate-0'></div>
        <img
          alt='Premium Car'
          className='absolute inset-0 z-0 h-full w-full rounded-[40px] object-cover shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]'
          src='/images/hero_taxi.png'
        />

        <div
          className='glass absolute top-8 left-[-10px] hidden animate-bounce rounded-2xl px-5 py-3 shadow-lg sm:left-[-20px] sm:block sm:px-6 sm:py-4'
          style={{ animationDuration: '4s' }}
        >
          <p className='text-label-md font-label-md text-primary font-bold tracking-wider uppercase'>
            Booking
          </p>
          <p className='text-body-lg sm:text-headline-sm text-on-surface font-bold'>
            24/7 Available
          </p>
        </div>
        <div
          className='glass absolute right-[-10px] bottom-16 hidden animate-bounce rounded-2xl px-5 py-3 shadow-lg sm:right-[-20px] sm:block sm:px-6 sm:py-4'
          style={{ animationDuration: '3.5s', animationDelay: '1s' }}
        >
          <p className='text-label-md font-label-md text-primary font-bold tracking-wider uppercase'>
            Drivers
          </p>
          <p className='text-body-lg sm:text-headline-sm text-on-surface font-bold'>
            Top-Rated & Safe
          </p>
        </div>
      </div>
    </section>
  );
}
