import React from 'react';

export default function FleetMetrics({ stats }) {
  const { totalFleet, activeFleet, availableFleet } = stats;

  return (
    <section className='grid grid-cols-1 gap-6 p-8 pb-0 md:grid-cols-3'>
      <div className='border-outline-variant/30 bg-surface-container-lowest rounded-xl border-x border-b shadow-sm transition-all duration-300 hover:shadow-md'>
        <div className='border-primary rounded-t-xl border-t-2 p-6'>
          <p className='text-label-md font-label-md text-on-surface-variant mb-1 font-bold'>
            TOTAL FLEET
          </p>
          <div className='flex items-end gap-2'>
            <span className='text-display-lg font-display-lg text-on-surface font-black'>
              {totalFleet}
            </span>
            <span className='text-label-md font-label-md text-primary mb-2 font-bold'>
              Cabs Total
            </span>
          </div>
        </div>
      </div>

      <div className='border-outline-variant/30 bg-surface-container-lowest rounded-xl border-x border-b shadow-sm transition-all duration-300 hover:shadow-md'>
        <div className='border-tertiary rounded-t-xl border-t-2 p-6'>
          <p className='text-label-md font-label-md text-on-surface-variant mb-1 font-bold'>
            ACTIVE / DISPATCHED
          </p>
          <div className='flex items-end gap-2'>
            <span className='text-display-lg font-display-lg text-on-surface font-black'>
              {activeFleet}
            </span>
            <span className='text-label-md font-label-md text-tertiary mb-2 font-bold'>
              On road now
            </span>
          </div>
        </div>
      </div>

      <div className='border-outline-variant/30 bg-surface-container-lowest rounded-xl border-x border-b shadow-sm transition-all duration-300 hover:shadow-md'>
        <div className='border-outline rounded-t-xl border-t-2 p-6'>
          <p className='text-label-md font-label-md text-on-surface-variant mb-1 font-bold'>
            AVAILABLE
          </p>
          <div className='flex items-end gap-2'>
            <span className='text-display-lg font-display-lg text-on-surface font-black'>
              {availableFleet}
            </span>
            <span className='text-label-md font-label-md text-outline mb-2 font-bold'>
              Ready for orders
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
