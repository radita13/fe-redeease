import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function DriverFormModal({
  isOpen,
  editingDriver,
  register,
  handleSubmit,
  errors,
  onSubmit,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className='bg-on-surface/40 fixed inset-0 z-100 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300'>
      <div className='bg-surface-container-lowest border-outline-variant/30 w-full max-w-lg scale-100 transform rounded-2xl border p-6 shadow-2xl transition-transform duration-300'>
        <div className='mb-6 flex items-center justify-between'>
          <h3 className='text-headline-md font-headline-md text-on-surface font-black'>
            {editingDriver ? 'Edit Operator Details' : 'Register New Driver'}
          </h3>
          <button
            onClick={onClose}
            className='hover:bg-surface-container text-outline cursor-pointer rounded-full p-1'
          >
            <span className='material-symbols-outlined'>close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 text-xs font-semibold'>
          <div className='space-y-1.5'>
            <Label className='text-on-surface-variant text-xs font-bold tracking-wider uppercase'>
              Driver Full Name
            </Label>
            <Input
              type='text'
              {...register('name')}
              className='bg-surface-container-low border-outline-variant text-body-sm focus-visible:ring-primary h-11 w-full rounded-xl border px-4 transition-all focus-visible:ring-2 focus-visible:ring-offset-0'
              placeholder='e.g. John Doe'
            />
            {errors.name && (
              <p className='text-error mt-0.5 text-[10px]'>{errors.name.message}</p>
            )}
          </div>

          <div className='space-y-1.5'>
            <Label className='text-on-surface-variant text-xs font-bold tracking-wider uppercase'>
              Email Address
            </Label>
            <Input
              type='email'
              {...register('email')}
              className='bg-surface-container-low border-outline-variant text-body-sm focus-visible:ring-primary h-11 w-full rounded-xl border px-4 transition-all focus-visible:ring-2 focus-visible:ring-offset-0'
              placeholder='john.doe@driver.com'
            />
            {errors.email && (
              <p className='text-error mt-0.5 text-[10px]'>{errors.email.message}</p>
            )}
          </div>

          <div className='space-y-1.5'>
            <Label className='text-on-surface-variant text-xs font-bold tracking-wider uppercase'>
              Phone Number
            </Label>
            <Input
              type='text'
              {...register('phone')}
              className='bg-surface-container-low border-outline-variant text-body-sm focus-visible:ring-primary h-11 w-full rounded-xl border px-4 transition-all focus-visible:ring-2 focus-visible:ring-offset-0'
              placeholder='+628xxxxxxxx'
            />
            {errors.phone && (
              <p className='text-error mt-0.5 text-[10px]'>{errors.phone.message}</p>
            )}
          </div>

          <div className='space-y-1.5'>
            <Label className='text-on-surface-variant text-xs font-bold tracking-wider uppercase'>
              Driver License No (SIM A)
            </Label>
            <Input
              type='text'
              {...register('license')}
              className='bg-surface-container-low border-outline-variant text-body-sm focus-visible:ring-primary h-11 w-full rounded-xl border px-4 transition-all focus-visible:ring-2 focus-visible:ring-offset-0'
              placeholder='A-xxxxxxxx'
            />
            {errors.license && (
              <p className='text-error mt-0.5 text-[10px]'>{errors.license.message}</p>
            )}
          </div>

          <div className='flex items-center gap-3 pt-2'>
            <input
              type='checkbox'
              id='isAvailable'
              {...register('isAvailable')}
              className='border-outline-variant text-primary focus:ring-primary accent-primary h-5 w-5 cursor-pointer rounded'
            />
            <Label
              htmlFor='isAvailable'
              className='text-body-sm text-on-surface cursor-pointer font-semibold'
            >
              Available for dispatching / active bookings
            </Label>
          </div>

          <div className='border-outline-variant/10 flex items-center justify-end gap-3 border-t pt-6'>
            <Button
              type='button'
              variant='outline'
              className='border-primary text-primary hover:bg-primary/5 hover:text-primary text-label-lg font-label-lg h-11 shrink-0 cursor-pointer rounded-full border-2 px-6 font-bold transition-all duration-150 active:scale-95'
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='bg-primary text-on-primary hover:bg-primary/95 hover:shadow-primary/25 text-label-lg font-label-lg h-11 shrink-0 cursor-pointer rounded-full border-none px-6 font-bold transition-all duration-150 hover:shadow-lg active:scale-95'
            >
              {editingDriver ? 'Save Changes' : 'Register Operator'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
