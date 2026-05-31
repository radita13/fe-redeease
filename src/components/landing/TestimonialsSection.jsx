import React from 'react';
import { Card, CardDescription } from '@/components/ui/card';
import ScrollReveal from '../shared/ScrollReveal';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Rachel Tan',
      image: '/images/testimonials/testi1.jpg',
      stars: 5,
      comment:
        '"The quality of their fleet is unmatched. I booked a car for a weekend getaway and the process was incredibly smooth. It was truly an amazing experience."',
    },
    {
      name: 'Matt',
      image: '/images/testimonials/testi2.jpg',
      stars: 5,
      comment:
        '"RideEase is my go-to for business travel. Reliable, punctual, and the cars are always in pristine condition. Highly recommended!"',
    },
    {
      name: 'Gabriel Williams',
      image: '/images/testimonials/testi3.jpg',
      stars: 5,
      comment:
        '"I love the transparent pricing and the variety of performance cars. It\'s not just a ride; it\'s an experience every time."',
    },
  ];

  return (
    <section id='testimonials' className='bg-surface-container-low scroll-mt-16 py-24'>
      <ScrollReveal direction='up' delay={0.5}>
        <div className='mx-auto max-w-7xl px-6'>
          <div className='mb-16 text-center'>
            <h2 className='text-headline-lg font-headline-lg text-on-surface mb-4 font-bold tracking-tight'>
              What Our Riders Say
            </h2>
            <div className='bg-primary mx-auto h-1.5 w-24 rounded-full'></div>
          </div>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            {testimonials.map((t, idx) => (
              <Card
                key={idx}
                className='bg-surface border-outline-variant/30 gap-6 rounded-3xl border p-8 shadow-sm ring-0 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl'
              >
                <div className='flex items-center gap-4'>
                  <img
                    alt={t.name}
                    className='border-primary/20 h-14 w-14 rounded-full border-2 object-cover'
                    src={t.image}
                  />
                  <div>
                    <h4 className='text-on-surface text-body-lg font-bold'>{t.name}</h4>
                    <div className='text-secondary-container flex'>
                      {[...Array(t.stars)].map((_, i) => (
                        <span
                          key={i}
                          className='material-symbols-outlined text-sm font-semibold'
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <CardDescription className='text-body-md text-on-surface-variant leading-relaxed italic'>
                  {t.comment}
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
