import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='bg-surface-container-lowest border-outline-variant/20 mt-auto border-t py-12'>
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row'>
        <div className='flex flex-col items-center gap-3 md:items-start'>
          <div className='flex items-center gap-2'>
            <span className='material-symbols-outlined text-primary text-3xl font-semibold'>
              directions_car
            </span>
            <span className='text-label-lg text-on-surface text-lg font-bold tracking-tight'>
              RideEase
            </span>
          </div>
          <p className='text-body-sm text-on-surface-variant max-w-xs text-center leading-relaxed md:text-left'>
            The premium choice for urban mobility and performance cab booking rentals.
          </p>
        </div>
        <div className='flex flex-wrap justify-center gap-8 font-semibold'>
          <Link
            className='text-label-md text-on-surface-variant hover:text-primary text-sm transition-colors'
            to='#'
          >
            Privacy Policy
          </Link>
          <Link
            className='text-label-md text-on-surface-variant hover:text-primary text-sm transition-colors'
            to='#'
          >
            Terms of Service
          </Link>
          <Link
            className='text-label-md text-on-surface-variant hover:text-primary text-sm transition-colors'
            to='#'
          >
            Help Center
          </Link>
        </div>
        <div className='text-label-md text-on-surface-variant text-sm font-semibold'>
          © {new Date().getFullYear()} RideEase Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
