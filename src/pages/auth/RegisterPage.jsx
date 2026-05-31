import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { User, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const registerSchema = yup.object({
  name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await registerUser(data);
      if (response.success) {
        toast.success('Registration successful! Please log in.');
        navigate('/login');
      } else {
        toast.error(response.message || 'Registration failed, please try again.');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Email is already registered or an error occurred.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='space-y-1 text-center'>
        <h2 className='text-primary text-xl font-bold sm:text-2xl'>Create Account</h2>
        <p className='text-on-surface-variant text-sm font-semibold'>
          Sign up to ride with RideEase
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* Name Field */}
        <div className='space-y-1'>
          <label className='text-on-surface-variant mb-1 block text-xs font-semibold tracking-wider uppercase'>
            Full Name
          </label>
          <div className='relative'>
            <User className='text-outline-variant absolute top-3.5 left-3 h-5 w-5' />
            <input
              type='text'
              placeholder='John Doe'
              {...register('name')}
              className={`bg-surface text-body-md focus:ring-primary/20 w-full rounded-2xl border py-3 pr-4 pl-10 focus:ring-2 focus:outline-none ${
                errors.name
                  ? 'border-error focus:border-error focus:ring-error/20'
                  : 'border-outline-variant/30 focus:border-primary'
              }`}
            />
          </div>
          {errors.name && (
            <p className='text-error mt-1 text-xs font-semibold'>{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className='space-y-1'>
          <label className='text-on-surface-variant mb-1 block text-xs font-semibold tracking-wider uppercase'>
            Email Address
          </label>
          <div className='relative'>
            <Mail className='text-outline-variant absolute top-3.5 left-3 h-5 w-5' />
            <input
              type='email'
              placeholder='email@example.com'
              {...register('email')}
              className={`bg-surface text-body-md focus:ring-primary/20 w-full rounded-2xl border py-3 pr-4 pl-10 focus:ring-2 focus:outline-none ${
                errors.email
                  ? 'border-error focus:border-error focus:ring-error/20'
                  : 'border-outline-variant/30 focus:border-primary'
              }`}
            />
          </div>
          {errors.email && (
            <p className='text-error mt-1 text-xs font-semibold'>{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className='space-y-1'>
          <label className='text-on-surface-variant mb-1 block text-xs font-semibold tracking-wider uppercase'>
            Password
          </label>
          <div className='relative'>
            <Lock className='text-outline-variant absolute top-3.5 left-3 h-5 w-5' />
            <input
              type='password'
              placeholder='••••••••'
              {...register('password')}
              className={`bg-surface text-body-md focus:ring-primary/20 w-full rounded-2xl border py-3 pr-4 pl-10 focus:ring-2 focus:outline-none ${
                errors.password
                  ? 'border-error focus:border-error focus:ring-error/20'
                  : 'border-outline-variant/30 focus:border-primary'
              }`}
            />
          </div>
          {errors.password && (
            <p className='text-error mt-1 text-xs font-semibold'>{errors.password.message}</p>
          )}
        </div>

        <Button
          type='submit'
          disabled={loading}
          className='mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full py-6 text-base font-bold transition-all hover:shadow-lg active:scale-98'
        >
          {loading ? (
            <>
              <Loader2 className='h-5 w-5 animate-spin' /> Signing up...
            </>
          ) : (
            <>
              Sign Up <ArrowRight className='h-5 w-5' />
            </>
          )}
        </Button>
      </form>

      <div className='text-on-surface-variant text-center text-sm font-semibold'>
        Already have an account?{' '}
        <span
          onClick={() => navigate('/login')}
          className='text-primary cursor-pointer font-bold hover:underline'
        >
          Log In
        </span>
      </div>
    </div>
  );
}
