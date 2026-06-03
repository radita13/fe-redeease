import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const loginSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await login(data);
      if (response.success) {
        toast.success('Login successful! Welcome back.');
        if (response.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          const from = location.state?.from || '/dashboard';
          navigate(from, { replace: true });
        }
      } else {
        toast.error(response.message || 'Login failed, please check your credentials.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Incorrect email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='space-y-1 text-center'>
        <h2 className='text-primary text-xl font-bold sm:text-2xl'>Welcome Back</h2>
        <p className='text-on-surface-variant text-sm font-semibold'>
          Log in to your RideEase account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
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
              <Loader2 className='h-5 w-5 animate-spin' /> Logging in...
            </>
          ) : (
            <>
              Log In <ArrowRight className='h-5 w-5' />
            </>
          )}
        </Button>
      </form>

      <div className='text-on-surface-variant text-center text-sm font-semibold'>
        Don't have an account?{' '}
        <span
          onClick={() => navigate('/register', { state: location.state })}
          className='text-primary cursor-pointer font-bold hover:underline'
        >
          Sign Up
        </span>
      </div>
    </div>
  );
}
