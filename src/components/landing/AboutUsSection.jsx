import React from 'react';

export default function AboutUsSection() {
  return (
    <section id='about-us' className='mx-auto max-w-7xl scroll-mt-16 px-6 py-24'>
      <div className='grid grid-cols-1 items-center gap-16 lg:grid-cols-2'>
        <div className='space-y-8 text-center lg:text-left'>
          <h2 className='text-display-lg font-headline-lg text-on-surface font-extrabold tracking-tight'>
            Fast, Reliable, &amp; <br />
            <span className='text-primary'>Secure Transport</span>
          </h2>
          <p className='text-body-lg text-on-surface-variant mx-auto max-w-xl leading-relaxed lg:mx-0'>
            RideEase was founded on the principle that mobility should be effortless and inspiring.{' '}
            <strong>Our vision</strong> combines cutting-edge technology with a commitment to luxury
            and safety, ensuring every journey is as memorable as the destination.
          </p>
          <div className='mx-auto grid max-w-sm grid-cols-2 gap-8 lg:mx-0'>
            <div>
              <p className='text-display-lg text-primary mb-1 font-black'>99%</p>
              <p className='text-label-lg text-on-surface-variant text-xs font-bold tracking-wider uppercase'>
                Reliability Rate
              </p>
            </div>
            <div>
              <p className='text-display-lg text-tertiary mb-1 font-black'>15m</p>
              <p className='text-label-lg text-on-surface-variant text-xs font-bold tracking-wider uppercase'>
                Avg. Arrival Time
              </p>
            </div>
          </div>
        </div>
        <div className='relative mx-auto aspect-square max-w-md overflow-hidden rounded-[48px] shadow-2xl lg:max-w-none'>
          <img
            alt='About RideEase'
            className='h-full w-full object-cover transition-transform duration-700 hover:scale-105'
            src='/images/about_taxi.png'
          />
        </div>
      </div>
    </section>
  );
}
