import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import CabCard from '@/components/shared/CabCard';

const STATIC_CABS = [
  {
    _id: 'mock-premium',
    plateNo: 'B 8888 EV',
    type: 'Premium',
    capacity: 4,
    isAvailable: true,
    driver: { name: 'Aditya Pratama', rating: 4.9 },
    image: '/images/premium_taxi.png',
  },
  {
    _id: 'mock-comfort',
    plateNo: 'B 7777 RDE',
    type: 'Comfort',
    capacity: 6,
    isAvailable: true,
    driver: { name: 'Siti Rahma', rating: 4.8 },
    image: '/images/comfort_taxi.png',
  },
  {
    _id: 'mock-economy',
    plateNo: 'B 1111 ECO',
    type: 'Economy',
    capacity: 4,
    isAvailable: true,
    driver: { name: 'Rian Hidayat', rating: 4.7 },
    image: '/images/economy_taxi.png',
  },
];

export default function FeaturedFleetSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSelectCab = (cab) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <section id='our-fleet' className='mx-auto max-w-7xl scroll-mt-24 px-6 py-24'>
      <div className='mb-16 text-center'>
        <h2 className='text-headline-lg font-headline-lg text-on-surface mb-4 font-bold tracking-tight'>
          Our Premium Fleet
        </h2>
        <p className='text-on-surface-variant mx-auto max-w-md font-semibold'>
          Choose from our list of comfortable vehicles that suit your needs.
        </p>
        <div className='bg-primary mx-auto mt-4 h-1.5 w-24 rounded-full'></div>
      </div>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {STATIC_CABS.map((cab) => (
          <CabCard key={cab._id} cab={cab} onSelect={handleSelectCab} />
        ))}
      </div>
    </section>
  );
}
