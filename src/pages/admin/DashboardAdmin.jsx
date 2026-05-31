import React from 'react';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import { formatCurrency } from '@/utils/calculateFare';
import { CarFront, MessageSquareWarning, Radio, TrendingUp, Wallet } from 'lucide-react';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import MetricCard from '@/components/admin/dashboard/MetricCard';
import DashboardCharts from '@/components/admin/dashboard/DashboardCharts';
import ReportingSection from '@/components/admin/dashboard/ReportingSection';
import RecentBookingsTable from '@/components/admin/dashboard/RecentBookingsTable';
import OversightAndControls from '@/components/admin/dashboard/OversightAndControls';

export default function AdminDashboard() {
  const {
    user,
    navigate,
    loading,
    stats,
    chartData,
    pieData,
    recentBookings,
    statusDistribution,
    topRoutes,
    avgRating,
    formattedDate,
    formattedTime,
  } = useAdminDashboard();

  if (loading) {
    return (
      <div className='bg-background flex min-h-screen flex-col items-center justify-center space-y-4'>
        <div className='border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent'></div>
        <p className='text-outline text-sm font-bold'>Loading dashboard analytics...</p>
      </div>
    );
  }

  return (
    <div className='animate-fade-in bg-background text-on-surface flex-1 space-y-8 overflow-y-auto p-8'>
      {/* TOP WELCOME HEADER */}
      <DashboardHeader
        user={user}
        stats={stats}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
      />

      {/* METRIC OVERVIEWS */}
      <section className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {/* Total Revenue */}
        <MetricCard
          title='Total Revenue'
          value={formatCurrency(stats.revenue)}
          icon={Wallet}
          borderColor='border-primary'
          valueColor='text-primary'
        >
          <div className='text-tertiary font-label-md flex items-center font-bold'>
            <TrendingUp className='mr-1 size-4' />
            <span>12%</span>
          </div>
        </MetricCard>

        {/* Active Rides */}
        <MetricCard
          title='Active Rides'
          value={stats.activeCabs}
          icon={Radio}
          borderColor='border-tertiary'
        >
          <div className='flex items-center gap-2'>
            <span className='bg-tertiary h-2 w-2 animate-pulse rounded-full'></span>
            <span className='text-label-md font-label-md text-on-surface-variant font-bold'>
              Live Now
            </span>
          </div>
        </MetricCard>

        {/* Pending Bookings */}
        <MetricCard
          title='Pending Bookings'
          value={stats.pendingBookings}
          icon={MessageSquareWarning}
          borderColor='border-secondary'
        >
          <div className='flex items-center gap-1'>
            <span
              className={`h-2 w-2 rounded-full ${stats.pendingBookings > 0 ? 'bg-secondary animate-pulse' : 'bg-outline-variant'}`}
            ></span>
            <span
              className={`text-label-md font-bold ${stats.pendingBookings > 0 ? 'text-secondary' : 'text-outline-variant'}`}
            >
              {stats.pendingBookings > 0 ? 'Attention Required' : 'All Cleared'}
            </span>
          </div>
        </MetricCard>

        {/* Available Fleet */}
        <MetricCard
          title='Available Fleet'
          value={stats.availableCabs}
          icon={CarFront}
          borderColor='border-outline'
        >
          <span className='text-label-md font-label-md text-on-surface-variant font-bold'>
            Cabs Ready
          </span>
        </MetricCard>
      </section>

      {/* ANALYTICS CHARTS */}
      <DashboardCharts chartData={chartData} pieData={pieData} statusDistribution={statusDistribution} />

      {/* INSIGHTS & ANALYTICS */}
      <ReportingSection topRoutes={topRoutes} avgRating={avgRating} stats={stats} loading={loading} />

      {/* RECENT BOOKINGS TABLE */}
      <RecentBookingsTable
        recentBookings={recentBookings}
        onViewAll={() => navigate('/admin/bookings')}
      />

      {/* OVERSIGHT & ACTIONS */}
      <OversightAndControls stats={stats} onNavigate={navigate} />
    </div>
  );
}
