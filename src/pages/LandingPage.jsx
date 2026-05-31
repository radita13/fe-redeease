import React, { useEffect } from 'react';
import LandingNavbar from '@/components/landing/LandingNavbar';
import HeroSection from '@/components/landing/HeroSection';
import BookingSection from '@/components/landing/BookingSection';
import FeaturedFleetSection from '@/components/landing/FeaturedFleetSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import AboutUsSection from '@/components/landing/AboutUsSection';
import LandingFooter from '@/components/landing/LandingFooter';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function LandingPage() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='bg-background text-on-surface font-body-md min-h-screen overflow-x-hidden'>
      <LandingNavbar handleScrollTo={handleScrollTo} />

      <main>
        <ScrollReveal direction='up' delay={0.1}>
          <HeroSection handleScrollTo={handleScrollTo} />
        </ScrollReveal>

        <ScrollReveal direction='up' delay={0.2}>
          <BookingSection />
        </ScrollReveal>

        <ScrollReveal direction='up' delay={0.3}>
          <FeaturedFleetSection />
        </ScrollReveal>

        <ScrollReveal direction='up' delay={0.4}>
          <HowItWorksSection />
        </ScrollReveal>

        <TestimonialsSection />

        <ScrollReveal direction='up' delay={0.6}>
          <AboutUsSection />
        </ScrollReveal>
      </main>

      <LandingFooter handleScrollTo={handleScrollTo} />
    </div>
  );
}
