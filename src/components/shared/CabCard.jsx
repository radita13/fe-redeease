import React from 'react';
import { Users, Star, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency, calculateFare } from '@/utils/calculateFare';

export default function CabCard({ cab, distance, estimatedPrice, onSelect }) {
  const carImages = {
    Premium: '/images/premium_taxi.png',
    Comfort: '/images/comfort_taxi.png',
    Economy: '/images/economy_taxi.png',
  };

  const imageSrc = cab.image || carImages[cab.type] || carImages.Economy;

  return (
    <div className='bg-surface border-outline-variant/30 flex h-full flex-col overflow-hidden rounded-3xl border shadow-sm transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl'>
      <div className='bg-primary/5 relative h-44 overflow-hidden'>
        <img
          src={imageSrc}
          alt={`${cab.type} Cab`}
          className='h-full w-full object-cover transition-transform duration-500 hover:scale-105'
        />
        <div className='bg-primary text-on-primary absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold shadow-sm'>
          {cab.type}
        </div>
      </div>

      {/* Cab Details */}
      <div className='flex grow flex-col justify-between space-y-4 p-5'>
        <div>
          <div className='flex items-start justify-between'>
            <h4 className='text-body-lg text-on-surface flex items-center gap-1.5 font-bold'>
              <Car className='text-primary h-5 w-5' /> {cab.plateNo}
            </h4>
            <span className='bg-surface-container text-on-surface-variant flex items-center gap-1 rounded-md px-2 py-0.5 text-sm font-semibold'>
              <Users className='text-outline h-4 w-4' /> {cab.capacity} Seats
            </span>
          </div>

          {/* Assigned Driver Details */}
          {cab.driver && (
            <div className='bg-surface-container-low border-outline-variant/10 mt-3 flex items-center gap-3 rounded-xl border p-2.5'>
              <div className='bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-full font-bold'>
                {cab.driver.name?.charAt(0)}
              </div>
              <div className='min-w-0 flex-1'>
                <p className='text-body-sm text-on-surface truncate font-bold'>{cab.driver.name}</p>
                <div className='text-on-surface-variant flex items-center gap-1 text-xs'>
                  <Star className='fill-secondary-container text-secondary-container h-3.5 w-3.5' />
                  <span className='font-semibold'>
                    {cab.driver.rating ? cab.driver.rating.toFixed(1) : 'New'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='border-outline-variant/10 flex items-center justify-between gap-4 border-t pt-2'>
          {estimatedPrice ? (
            <div>
              <p className='text-label-md text-on-surface-variant font-semibold'>Estimated Fare</p>
              <p className='text-body-lg text-primary font-bold'>
                {formatCurrency(estimatedPrice)}
              </p>
            </div>
          ) : (
            <div>
              <div className='flex items-center gap-1.5'>
                <span className='bg-tertiary-container inline-block h-2 w-2 animate-pulse rounded-full'></span>
                <p className='text-label-sm text-on-surface-variant font-semibold'>Available</p>
              </div>
              <p className='text-body-sm text-primary mt-0.5 font-bold'>
                From {formatCurrency(calculateFare(5, cab.type))}
              </p>
            </div>
          )}

          <Button
            onClick={() => onSelect && onSelect(cab)}
            className='cursor-pointer rounded-full px-5 py-2 font-semibold'
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
