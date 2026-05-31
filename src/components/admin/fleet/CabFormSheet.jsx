import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CabFormSheet({
  isOpen,
  editingCab,
  drivers,
  register,
  handleSubmit,
  setValue,
  selectedType,
  selectedDriver,
  selectedCapacity,
  imageUrl,
  errors,
  onSubmit,
  onClose,
}) {
  const [imgStatus, setImgStatus] = React.useState('idle');

  React.useEffect(() => {
    if (imageUrl) {
      setImgStatus('loading');
    } else {
      setImgStatus('idle');
    }
  }, [imageUrl]);

  if (!isOpen) return null;

  return (
    <>
      {/* SLIDE-OUT SHEET OVERLAY */}
      <div
        className='bg-inverse-surface/40 fixed inset-0 z-60 backdrop-blur-sm transition-opacity duration-300'
        onClick={onClose}
      ></div>

      {/* SLIDE-OUT SHEET */}
      <aside
        className={`bg-surface fixed top-0 right-0 z-70 flex h-full w-full max-w-[480px] flex-col shadow-2xl transition-transform duration-300`}
      >
        <div className='border-outline-variant/30 bg-surface-container-lowest flex items-center justify-between border-b p-6'>
          <h3 className='text-headline-md font-headline-md text-on-surface font-black'>
            {editingCab ? 'Edit Fleet Vehicle' : 'Register New Vehicle'}
          </h3>
          <button
            className='hover:bg-surface-variant flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors'
            onClick={onClose}
          >
            <span className='material-symbols-outlined'>close</span>
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-1 flex-col overflow-hidden text-xs font-semibold'
        >
          <div className='flex-1 space-y-5 overflow-y-auto p-6'>
            {/* DRIVER SELECTION */}
            <div className='space-y-1.5'>
              <Label className='text-on-surface-variant text-xs font-bold tracking-wider uppercase'>
                Driver Assignment
              </Label>
              <Select value={selectedDriver || ''} onValueChange={(val) => setValue('driver', val)}>
                <SelectTrigger className='bg-surface-container-low border-outline-variant text-body-sm focus-visible:ring-primary h-12! w-full cursor-pointer rounded-xl! border px-4 transition-all focus-visible:ring-2 focus-visible:ring-offset-0 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5'>
                  <SelectValue placeholder='-- Choose Operator --' />
                </SelectTrigger>
                <SelectContent className='bg-surface-container border-outline-variant z-80 max-h-60 overflow-y-auto rounded-xl border'>
                  {drivers.map((d) => (
                    <SelectItem key={d._id} value={d._id}>
                      {d.name} (License: {d.license})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.driver && (
                <p className='text-error mt-0.5 text-[10px]'>{errors.driver.message}</p>
              )}
            </div>

            {/* PLATE NO */}
            <div className='space-y-1.5'>
              <Label className='text-on-surface-variant text-xs font-bold tracking-wider uppercase'>
                License Plate No
              </Label>
              <Input
                type='text'
                {...register('plateNo')}
                className='bg-surface-container-low border-outline-variant focus-visible:ring-primary h-12 w-full rounded-xl border px-4 transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-0'
                placeholder='e.g. B 1234 XYZ'
              />
              {errors.plateNo && (
                <p className='text-error mt-0.5 text-[10px]'>{errors.plateNo.message}</p>
              )}
            </div>

            {/* GRID INPUTS: CAPACITY & CATEGORY */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1.5'>
                <Label className='text-on-surface-variant text-xs font-bold tracking-wider uppercase'>
                  Capacity (Seats)
                </Label>
                <Select
                  value={selectedCapacity ? String(selectedCapacity) : '4'}
                  onValueChange={(val) => setValue('capacity', parseInt(val, 10))}
                >
                  <SelectTrigger className='bg-surface-container-low border-outline-variant text-body-sm focus-visible:ring-primary h-12! w-full cursor-pointer rounded-xl! border px-4 transition-all focus-visible:ring-2 focus-visible:ring-offset-0'>
                    <SelectValue placeholder='Select Seats' />
                  </SelectTrigger>
                  <SelectContent className='bg-surface-container border-outline-variant z-80 rounded-xl border'>
                    <SelectItem value='2'>2 Seats</SelectItem>
                    <SelectItem value='4'>4 Seats</SelectItem>
                    <SelectItem value='6'>6 Seats</SelectItem>
                    <SelectItem value='8'>8 Seats</SelectItem>
                  </SelectContent>
                </Select>
                {errors.capacity && (
                  <p className='text-error mt-0.5 text-[10px]'>{errors.capacity.message}</p>
                )}
              </div>

              <div className='space-y-1.5'>
                <Label className='text-on-surface-variant text-xs font-bold tracking-wider uppercase'>
                  Vehicle Class
                </Label>
                <Select
                  value={selectedType || 'Comfort'}
                  onValueChange={(val) => setValue('type', val)}
                >
                  <SelectTrigger className='bg-surface-container-low border-outline-variant text-body-sm focus-visible:ring-primary h-12! w-full cursor-pointer rounded-xl! border px-4 transition-all focus-visible:ring-2 focus-visible:ring-offset-0'>
                    <SelectValue placeholder='Select Class' />
                  </SelectTrigger>
                  <SelectContent className='bg-surface-container border-outline-variant z-80 rounded-xl border'>
                    <SelectItem value='Economy'>Economy</SelectItem>
                    <SelectItem value='Comfort'>Comfort</SelectItem>
                    <SelectItem value='Premium'>Premium</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className='text-error mt-0.5 text-[10px]'>{errors.type.message}</p>
                )}
              </div>
            </div>

            {/* LOCATION */}
            <div className='space-y-1.5'>
              <Label className='text-on-surface-variant text-xs font-bold tracking-wider uppercase'>
                Current Location (Station)
              </Label>
              <Input
                type='text'
                {...register('location')}
                className='bg-surface-container-low border-outline-variant focus-visible:ring-primary h-12 w-full rounded-xl border px-4 transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-0'
                placeholder='e.g. Sudirman, Jakarta'
              />
              {errors.location && (
                <p className='text-error mt-0.5 text-[10px]'>{errors.location.message}</p>
              )}
            </div>

            {/* VEHICLE PHOTO */}
            <div className='space-y-1.5'>
              <Label className='text-on-surface-variant text-xs font-bold tracking-wider uppercase'>
                Vehicle Photo Image URL
              </Label>
              <Input
                type='text'
                {...register('image')}
                className='bg-surface-container-low border-outline-variant focus-visible:ring-primary h-12 w-full rounded-xl border px-4 transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-0'
                placeholder='https://images.unsplash.com/... or leave blank'
              />
              {errors.image && (
                <p className='text-error mt-0.5 text-[10px]'>{errors.image.message}</p>
              )}

              {/* IMAGE PREVIEW */}
              {imageUrl && !errors.image && (
                <div className='mt-2.5 overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-low p-2'>
                  <p className='text-[10px] text-on-surface-variant mb-1.5 font-bold uppercase tracking-wider'>
                    Image Preview:
                  </p>
                  <div className='relative flex aspect-video w-full items-center justify-center rounded-lg bg-surface-container-high overflow-hidden border border-outline-variant/20'>
                    {imgStatus === 'loading' && (
                      <div className='absolute inset-0 flex flex-col items-center justify-center bg-surface-container-high text-on-surface-variant/60 gap-1.5 p-4 text-center'>
                        <span className='material-symbols-outlined text-headline-sm animate-spin'>sync</span>
                        <span className='text-[10px] font-bold'>Loading image preview...</span>
                      </div>
                    )}
                    {imgStatus === 'error' && (
                      <div className='absolute inset-0 flex flex-col items-center justify-center bg-surface-container-high text-error gap-1.5 p-4 text-center'>
                        <span className='material-symbols-outlined text-headline-sm'>broken_image</span>
                        <span className='text-[10px] font-bold'>Unable to load image. Check the URL.</span>
                      </div>
                    )}
                    <img
                      src={imageUrl}
                      alt="Vehicle Preview"
                      className={`h-full w-full object-cover transition-opacity duration-300 ${
                        imgStatus === 'loaded' ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'
                      }`}
                      onLoad={() => setImgStatus('loaded')}
                      onError={() => setImgStatus('error')}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* IS AVAILABLE */}
            <div className='flex items-center gap-3 pt-2'>
              <input
                type='checkbox'
                id='cabIsAvailable'
                {...register('isAvailable')}
                className='border-outline-variant text-primary focus:ring-primary accent-primary h-5 w-5 cursor-pointer rounded'
              />
              <Label
                htmlFor='cabIsAvailable'
                className='text-body-sm text-on-surface cursor-pointer font-semibold'
              >
                Available for dispatching / bookings
              </Label>
            </div>
          </div>

          <div className='border-outline-variant/30 bg-surface-container-lowest flex gap-4 border-t p-6'>
            <Button
              type='button'
              variant='outline'
              className='border-primary text-primary hover:bg-primary/5 hover:text-primary font-label-lg text-label-lg h-12 flex-1 cursor-pointer rounded-full border-2 font-bold transition-all duration-150 active:scale-95'
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='bg-primary text-on-primary hover:bg-primary/95 hover:shadow-primary/25 font-label-lg text-label-lg h-12 flex-1 cursor-pointer rounded-full border-none font-bold transition-all duration-150 hover:shadow-lg active:scale-95'
            >
              Save Vehicle
            </Button>
          </div>
        </form>
      </aside>
    </>
  );
}
