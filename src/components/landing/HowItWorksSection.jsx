import React from 'react';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar, CarFront } from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <section
      id='how-it-works'
      className='relative mt-20 flex min-h-screen w-full scroll-mt-16 items-center overflow-hidden py-24'
    >
      <div className='absolute inset-0 z-0 overflow-hidden'>
        <img
          alt='Night City Driving'
          className='h-full w-full scale-102 transform-gpu object-cover brightness-50 will-change-transform'
          src='/images/night_city_driving.png'
        />
        <div className='from-background to-surface-container-low via-background/0 absolute inset-0 scale-102 transform-gpu bg-linear-to-b will-change-transform'></div>
      </div>
      <div className='relative z-10 mx-auto w-full max-w-7xl px-6 text-center'>
        <h2 className='text-display-lg lg:text-headline-lg font-headline-lg mb-16 font-extrabold tracking-tight text-white'>
          How it Works
        </h2>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {/* Card 1 */}
          <Card className='glass-dark group gap-0 rounded-[40px] p-8 text-left ring-0 transition-transform duration-500 hover:translate-y-[-10px]'>
            <div className='bg-primary/20 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110'>
              <MapPin className='text-primary-fixed-dim text-3xl font-semibold' />
            </div>
            <CardTitle className='font-headline-md mb-4 text-2xl font-bold text-white'>
              Choose Location
            </CardTitle>
            <CardDescription className='text-body-md leading-relaxed text-white/70'>
              Select your pick-up and drop-off points from our service center.
            </CardDescription>
            <div className='text-display-lg mt-8 font-black tracking-tight text-white/10 select-none'>
              01
            </div>
          </Card>

          {/* Card 2 */}
          <Card className='glass-dark group gap-0 rounded-[40px] p-8 text-left ring-0 transition-transform delay-100 duration-500 hover:translate-y-[-10px]'>
            <div className='bg-tertiary/20 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110'>
              <Calendar className='text-tertiary-fixed-dim text-3xl font-semibold' />
            </div>
            <CardTitle className='font-headline-md mb-4 text-2xl font-bold text-white'>
              Pick Up Date
            </CardTitle>
            <CardDescription className='text-body-md leading-relaxed text-white/70'>
              Tell us when you need the vehicle. Our fleet is ready 24/7 for your spontaneous
              adventures.
            </CardDescription>
            <div className='text-display-lg mt-8 font-black tracking-tight text-white/10 select-none'>
              02
            </div>
          </Card>

          {/* Card 3 */}
          <Card className='glass-dark group gap-0 rounded-[40px] p-8 text-left ring-0 transition-transform delay-200 duration-500 hover:translate-y-[-10px]'>
            <div className='bg-secondary-container/20 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110'>
              <CarFront className='text-secondary-fixed-dim text-3xl font-semibold' />
            </div>
            <CardTitle className='font-headline-md mb-4 text-2xl font-bold text-white'>
              Book Your Car
            </CardTitle>
            <CardDescription className='text-body-md leading-relaxed text-white/70'>
              Confirm your selection and get instant booking details with real-time tracking
              enabled.
            </CardDescription>
            <div className='text-display-lg mt-8 font-black tracking-tight text-white/10 select-none'>
              03
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
