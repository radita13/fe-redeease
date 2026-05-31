import React from 'react';
import { Phone, Mail, Award, CheckCircle, XCircle } from 'lucide-react';
import RatingStars from './RatingStars';

export default function DriverCard({ driver, onEdit, onDelete }) {
  return (
    <div className='bg-surface border-outline-variant/30 flex flex-col justify-between space-y-4 rounded-3xl border p-5 shadow-sm transition-all duration-300 hover:shadow-lg'>
      <div className='flex items-start gap-4'>
        <div className='bg-primary/10 text-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl font-bold'>
          {driver.name?.charAt(0)}
        </div>
        <div className='min-w-0 grow'>
          <div className='flex items-start justify-between gap-2'>
            <h4 className='text-body-lg text-on-surface truncate font-bold'>{driver.name}</h4>
            <span
              className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                driver.isAvailable
                  ? 'bg-tertiary/10 text-tertiary-container'
                  : 'bg-error-container/10 text-error'
              }`}
            >
              {driver.isAvailable ? (
                <>
                  <CheckCircle className='text-tertiary-container h-3 w-3' /> Available
                </>
              ) : (
                <>
                  <XCircle className='text-error h-3 w-3' /> Busy
                </>
              )}
            </span>
          </div>

          <div className='mt-1 flex items-center gap-1.5'>
            <RatingStars rating={driver.rating || 0} readonly size={16} />
            <span className='text-on-surface-variant text-xs font-semibold'>
              ({driver.rating ? driver.rating.toFixed(1) : 'New'})
            </span>
          </div>
        </div>
      </div>

      <div className='text-body-sm text-on-surface-variant space-y-2'>
        <div className='flex items-center gap-2'>
          <Mail className='text-outline h-4 w-4' />
          <span className='truncate'>{driver.email}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Phone className='text-outline h-4 w-4' />
          <span>{driver.phone}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Award className='text-outline h-4 w-4' />
          <span>License: {driver.license}</span>
        </div>
      </div>

      {(onEdit || onDelete) && (
        <div className='border-outline-variant/10 flex justify-end gap-2 border-t pt-3'>
          {onEdit && (
            <button
              onClick={() => onEdit(driver)}
              className='bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors'
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(driver._id)}
              className='bg-error-container/10 text-error hover:bg-error-container/20 cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors'
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
