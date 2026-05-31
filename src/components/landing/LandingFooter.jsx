import React from 'react';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function LandingFooter({ handleScrollTo }) {
  const handleScrollToTop = () => {
    if (handleScrollTo) {
      handleScrollTo('home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className='bg-surface-container-low border-outline-variant/20 text-on-surface border-t pt-16 pb-8 transition-colors duration-300'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8'>
          <div className='col-span-2 space-y-6'>
            <div
              className='flex w-fit cursor-pointer items-center gap-2 transition-transform hover:scale-[1.02]'
              onClick={handleScrollToTop}
            >
              <img className='w-12' src='/images/assets/logo.png' alt='RideEase Logo' />
              <div className='text-headline-md text-xl font-bold tracking-tight'>
                <span className='text-[#4b9dcf]'>Ride</span>
                <span className='text-[#7cd8b3]'>Ease</span>
              </div>
            </div>
            <p className='text-body-md text-on-surface-variant/80 max-w-sm leading-relaxed'>
              RideEase is a premier cab booking and car rental service. We offer professional
              drivers and a top-notch fleet of premium vehicles to ensure a safe, comfortable, and
              seamless ride experience.
            </p>
          </div>

          <div className='space-y-6'>
            <h4 className='text-label-lg font-label-lg text-on-surface font-bold tracking-wider uppercase'>
              Quick Links
            </h4>
            <ul className='space-y-3'>
              {[
                { name: 'Home', id: 'home' },
                { name: 'Our Fleet', id: 'our-fleet' },
                { name: 'How It Works', id: 'how-it-works' },
                { name: 'Testimonials', id: 'testimonials' },
                { name: 'About Us', id: 'about-us' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleScrollTo && handleScrollTo(link.id)}
                    className='text-body-md text-on-surface-variant hover:text-primary cursor-pointer font-semibold transition-colors duration-200'
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className='space-y-6'>
            <h4 className='text-label-lg font-label-lg text-on-surface font-bold tracking-wider uppercase'>
              Help & Support
            </h4>
            <ul className='space-y-3'>
              {['FAQ', 'Help Center', 'Support'].map((service, index) => (
                <li key={index} className='text-body-md text-on-surface-variant/80 font-semibold'>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div className='space-y-6'>
            <h4 className='text-label-lg font-label-lg text-on-surface font-bold tracking-wider uppercase'>
              Follow Us
            </h4>
            <div className='flex gap-4 space-y-3'>
              <Link
                to='#'
                rel='noopener noreferrer'
                className='bg-surface-container-lowest hover:bg-primary/20 text-on-surface-variant hover:text-primary border-outline-variant/20 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300'
              >
                <FaInstagram className='h-5 w-5' />
              </Link>
              <Link
                to='#'
                rel='noopener noreferrer'
                className='bg-surface-container-lowest hover:bg-primary/20 text-on-surface-variant hover:text-primary border-outline-variant/20 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300'
              >
                <FaLinkedin className='h-5 w-5' />
              </Link>
              <Link
                to='#'
                rel='noopener noreferrer'
                className='bg-surface-container-lowest hover:bg-primary/20 text-on-surface-variant hover:text-primary border-outline-variant/20 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300'
              >
                <FaWhatsapp className='h-5 w-5' />
              </Link>
            </div>
          </div>
        </div>

        <hr className='border-outline-variant/10 my-10' />

        <div className='flex flex-col items-center justify-between gap-6 md:flex-row'>
          <div className='text-body-sm text-on-surface-variant/60 font-semibold'>
            © 2026 RideEase. All rights reserved.
          </div>
          <div className='flex flex-row items-center gap-10'>
            <Link to='#' className='text-body-sm text-on-surface-variant/60 hover:text-primary'>
              Privacy
            </Link>
            <Link to='#' className='text-body-sm text-on-surface-variant/60 hover:text-primary'>
              Terms & conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
