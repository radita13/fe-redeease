import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '@/hooks/useAuth';
import { useBookings } from '@/hooks/useBookings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { User, Mail, Phone, Star, Car, Calendar, Loader2, ShieldCheck, Lock } from 'lucide-react';
import { formatSimpleDate } from '@/utils/formatDate';
import { Label } from '@/components/ui/label';

const profileSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().optional().nullable(),
  password: yup
    .string()
    .optional()
    .test('len', 'Password must be at least 8 characters', (val) => !val || val.length >= 8),
  confirmPassword: yup
    .string()
    .optional()
    .test('match', 'Passwords must match', function (val) {
      return (!val && !this.parent.password) || val === this.parent.password;
    }),
});

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { bookings, fetchMyBookings } = useBookings();
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    document.title = 'My Profile | RideEase';
  }, []);

  useEffect(() => {
    fetchMyBookings();
  }, [fetchMyBookings]);

  const completedRides = bookings.filter((b) => b.status === 'completed').length;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      phone: data.phone,
    };
    if (data.password) {
      payload.password = data.password;
    }

    setUpdating(true);
    try {
      const res = await updateProfile(payload);
      if (res.success) {
        toast.success('Profile updated successfully!');
        reset({
          name: data.name,
          email: user?.email || '',
          phone: data.phone,
          password: '',
          confirmPassword: '',
        });
      } else {
        toast.error(res.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className='animate-fade-in mx-auto w-full max-w-7xl space-y-8 p-4 sm:p-8'>
      <div>
        <h1 className='text-on-surface text-3xl font-black tracking-tight'>My Profile</h1>
        <p className='text-on-surface-variant mt-1 font-semibold'>
          Manage your account details and view your ride stats.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
        <div className='space-y-6 md:col-span-1'>
          <Card className='border-outline-variant/30 space-y-6 rounded-xl p-6 text-center shadow-md'>
            <div className='m-0 space-y-3'>
              <div className='bg-primary/10 border-primary/20 text-primary mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4'>
                <User className='h-12 w-12' />
              </div>
              <div>
                <h3 className='text-on-surface text-xl leading-tight font-bold'>{user?.name}</h3>
                <span className='bg-secondary-container/10 text-secondary mt-1.5 inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-bold capitalize'>
                  <ShieldCheck className='h-3.5 w-3.5' /> {user?.role || 'rider'}
                </span>
              </div>
            </div>

            <div className='border-outline-variant/10 m-0 grid grid-cols-2 gap-4 border-t pt-6'>
              <div className='space-y-1'>
                <div className='text-tertiary-container flex justify-center'>
                  <Star className='fill-secondary-container text-secondary-container h-5 w-5' />
                </div>
                <p className='text-outline text-xs font-bold tracking-wider uppercase'>Rating</p>
                <p className='text-on-surface text-lg font-bold'>
                  {user?.rating ? user.rating.toFixed(1) : '5.0'}
                </p>
              </div>
              <div className='space-y-1'>
                <div className='text-primary flex justify-center'>
                  <Car className='h-5 w-5' />
                </div>
                <p className='text-outline text-xs font-bold tracking-wider uppercase'>Trips</p>
                <p className='text-on-surface text-lg font-bold'>{completedRides}</p>
              </div>
            </div>

            <div className='text-on-surface-variant border-outline-variant/10 flex items-center justify-center gap-1.5 border-t pt-4 text-xs font-medium'>
              <Calendar className='text-outline h-4 w-4' /> Member since :{' '}
              {formatSimpleDate(user?.createdAt)}
            </div>
          </Card>
        </div>

        <div className='md:col-span-2'>
          <Card className='border-outline-variant/30 rounded-xl shadow-md'>
            <CardHeader>
              <CardTitle className='text-2xl font-black tracking-tight'>
                Edit Profile Details
              </CardTitle>
              <CardDescription>Update your profile details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4'>
                <div className='space-y-1'>
                  <Label className='text-on-surface-variant mb-1 block text-sm font-bold tracking-wider'>
                    Full Name
                  </Label>
                  <div className='relative'>
                    <User className='text-outline-variant absolute top-3 left-3 h-5 w-5' />
                    <Input
                      {...register('name')}
                      className={`bg-surface-container-low h-11 rounded-xl pl-10 ${
                        errors.name ? 'border-error' : 'border-outline-variant/30'
                      }`}
                      placeholder='Your Name'
                    />
                  </div>
                  {errors.name && (
                    <p className='text-error mt-1 text-xs font-semibold'>{errors.name.message}</p>
                  )}
                </div>

                <div className='space-y-1'>
                  <Label className='text-on-surface-variant mb-1 block text-sm font-bold tracking-wider'>
                    Email Address
                  </Label>
                  <div className='relative'>
                    <Mail className='text-outline-variant absolute top-3 left-3 h-5 w-5' />
                    <Input
                      type='email'
                      {...register('email')}
                      disabled
                      className={`bg-surface-container-low h-11 cursor-not-allowed rounded-xl pl-10 opacity-60 ${
                        errors.email ? 'border-error' : 'border-outline-variant/30'
                      }`}
                      placeholder='email@example.com'
                    />
                  </div>
                  {errors.email && (
                    <p className='text-error mt-1 text-xs font-semibold'>{errors.email.message}</p>
                  )}
                </div>

                <div className='space-y-1'>
                  <Label className='text-on-surface-variant mb-1 block text-sm font-bold tracking-wider'>
                    Phone Number
                  </Label>
                  <div className='relative'>
                    <Phone className='text-outline-variant absolute top-3 left-3 h-5 w-5' />
                    <Input
                      {...register('phone')}
                      className='bg-surface-container-low border-outline-variant/30 h-11 rounded-xl pl-10'
                      placeholder='e.g. +62812345678'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='space-y-1'>
                    <Label className='text-on-surface-variant mb-1 block text-sm font-bold tracking-wider'>
                      New Password (Optional)
                    </Label>
                    <div className='relative'>
                      <Lock className='text-outline-variant absolute top-3 left-3 h-5 w-5' />
                      <Input
                        type='password'
                        {...register('password')}
                        className={`bg-surface-container-low h-11 rounded-xl pl-10 ${
                          errors.password ? 'border-error' : 'border-outline-variant/30'
                        }`}
                        placeholder='Min. 8 characters'
                      />
                    </div>
                    {errors.password && (
                      <p className='text-error mt-1 text-xs font-semibold'>
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className='space-y-1'>
                    <Label className='text-on-surface-variant mb-1 block text-sm font-bold tracking-wider'>
                      Confirm New Password
                    </Label>
                    <div className='relative'>
                      <Lock className='text-outline-variant absolute top-3 left-3 h-5 w-5' />
                      <Input
                        type='password'
                        {...register('confirmPassword')}
                        className={`bg-surface-container-low h-11 rounded-xl pl-10 ${
                          errors.confirmPassword ? 'border-error' : 'border-outline-variant/30'
                        }`}
                        placeholder='Re-type password'
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className='text-error mt-1 text-xs font-semibold'>
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className='flex w-full justify-end'>
                  <Button
                    type='submit'
                    disabled={updating}
                    className='flex h-11 cursor-pointer items-center gap-2 rounded-full px-8 font-bold'
                  >
                    {updating ? (
                      <>
                        <Loader2 className='h-5 w-5 animate-spin' /> Saving Changes...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
