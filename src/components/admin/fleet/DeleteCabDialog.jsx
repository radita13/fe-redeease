import React from 'react';
import { Button } from '@/components/ui/button';

export default function DeleteCabDialog({ isOpen, cab, onClose, onConfirm }) {
  if (!isOpen || !cab) return null;

  return (
    <div className='bg-on-surface/40 fixed inset-0 z-100 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300'>
      <div className='bg-surface-container-lowest border-outline-variant/30 w-full max-w-md scale-100 transform rounded-2xl border p-6 shadow-2xl transition-transform duration-300'>
        <div className='flex items-start gap-4'>
          <div className='bg-error-container text-error flex h-12 w-12 shrink-0 items-center justify-center rounded-full'>
            <span className='material-symbols-outlined'>warning</span>
          </div>
          <div className='flex-1'>
            <h3 className='text-headline-md font-headline-md text-on-surface mb-2 font-black'>
              Remove Vehicle?
            </h3>
            <p className='text-body-md text-on-surface-variant leading-relaxed font-semibold'>
              Are you sure you want to remove vehicle{' '}
              <span className='text-on-surface font-bold'>{cab.plateNo}</span> from the active fleet
              registry? This action cannot be undone.
            </p>
          </div>
        </div>
        <div className='mt-8 flex items-center justify-end gap-3'>
          <Button
            variant='outline'
            className='border-primary text-primary hover:bg-primary/5 hover:text-primary text-label-lg font-label-lg h-11 shrink-0 cursor-pointer rounded-full border-2 px-6 font-bold transition-all duration-150 active:scale-95'
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant='destructive'
            className='text-label-lg font-label-lg bg-error hover:bg-error/95 hover:shadow-error/25 text-on-error h-11 shrink-0 cursor-pointer rounded-full border-none px-6 font-bold shadow-lg transition-all duration-150 active:scale-95'
            onClick={onConfirm}
          >
            Remove Cab
          </Button>
        </div>
      </div>
    </div>
  );
}
