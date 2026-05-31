import { Outlet } from 'react-router-dom';
import Navbar from '@/components/shared/Navbar';

export default function MainLayout() {
  return (
    <div className='bg-background text-on-surface flex min-h-screen flex-col'>
      <Navbar />
      <main className='flex flex-1 flex-col pt-20'>
        <Outlet />
      </main>
    </div>
  );
}
