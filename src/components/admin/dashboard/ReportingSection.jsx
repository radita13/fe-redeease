import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Users, Award, TrendingUp, Compass } from 'lucide-react';
import { formatCurrency } from '@/utils/calculateFare';
import RatingStars from '@/components/shared/RatingStars';

export default function ReportingSection({
  topRoutes = [],
  avgRating = 4.8,
  stats = {},
  loading = false,
}) {
  if (loading) {
    return (
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <div className='bg-surface-container-low h-48 animate-pulse rounded-3xl'></div>
        <div className='bg-surface-container-low h-48 animate-pulse rounded-3xl'></div>
        <div className='bg-surface-container-low h-48 animate-pulse rounded-3xl'></div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-2'>
        <TrendingUp className='text-primary h-6 w-6' />
        <h2 className='text-on-surface text-xl font-bold sm:text-2xl'>Insights &amp; Analytics</h2>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Top Routes Table */}
        <Card className='border-outline-variant/30 bg-surface-container-lowest flex flex-col justify-between rounded-2xl p-6 shadow-sm lg:col-span-2'>
          <div>
            <CardHeader className='mb-4 p-0'>
              <CardTitle className='text-label-lg font-label-lg text-on-surface flex items-center gap-2 font-bold tracking-tight uppercase'>
                <Compass className='text-primary h-5 w-5' /> Top 5 Travel Routes
              </CardTitle>
              <CardDescription className='text-outline text-xs font-semibold'>
                Most frequently booked pick-up and drop-off combinations
              </CardDescription>
            </CardHeader>
            <CardContent className='p-0'>
              {topRoutes.length === 0 ? (
                <div className='text-on-surface-variant flex h-40 items-center justify-center text-xs font-semibold'>
                  No travel route analytics available yet.
                </div>
              ) : (
                <div className='overflow-x-auto'>
                  <table className='w-full border-collapse text-left text-sm'>
                    <thead>
                      <tr className='border-outline-variant/10 text-outline border-b text-xs font-bold tracking-wider uppercase'>
                        <th className='py-3 pr-4'>Route Path</th>
                        <th className='px-4 py-3 text-center'>Trips</th>
                        <th className='py-3 pl-4 text-right'>Est. Revenue</th>
                      </tr>
                    </thead>
                    <tbody className='divide-outline-variant/10 divide-y'>
                      {topRoutes.map((route, idx) => (
                        <tr
                          key={idx}
                          className='group hover:bg-surface-container-low/30 transition-colors'
                        >
                          <td className='text-on-surface flex max-w-[320px] min-w-0 items-center gap-2 truncate py-3.5 pr-4 font-semibold'>
                            <div className='bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold'>
                              {idx + 1}
                            </div>
                            <span className='truncate'>{route.route}</span>
                          </td>
                          <td className='text-on-surface-variant px-4 py-3.5 text-center font-bold'>
                            {route.count}
                          </td>
                          <td className='text-primary py-3.5 pl-4 text-right font-black'>
                            {formatCurrency(route.revenue)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </div>
        </Card>

        {/* Side KPI Cards Container */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1'>
          {/* Average Rating KPI */}
          <Card className='border-outline-variant/30 bg-surface-container-lowest flex h-full flex-col justify-between rounded-2xl p-6 shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md'>
            <div>
              <div className='flex items-center justify-between'>
                <p className='text-outline text-xs font-bold tracking-wider uppercase'>
                  Average Driver Rating
                </p>
                <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600'>
                  <Award className='h-5 w-5' />
                </div>
              </div>
              <div className='mt-4 flex items-baseline gap-2'>
                <h3 className='text-on-surface text-4xl font-black'>{avgRating.toFixed(1)}</h3>
                <span className='text-outline text-sm font-semibold'>/ 5.0</span>
              </div>
              <div className='mt-2.5 flex items-center gap-1.5'>
                <RatingStars rating={avgRating} readonly size={16} />
              </div>
            </div>
            <p className='text-outline mt-4 text-xs leading-relaxed font-semibold'>
              Overall average rating given by riders for completed trips.
            </p>
          </Card>

          {/* User Demographic / Total Users Card */}
          <Card className='border-outline-variant/30 bg-surface-container-lowest flex h-full flex-col justify-between rounded-2xl p-6 shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md'>
            <div>
              <div className='flex items-center justify-between'>
                <p className='text-outline text-xs font-bold tracking-wider uppercase'>
                  Rider Community
                </p>
                <div className='bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl'>
                  <Users className='h-5 w-5' />
                </div>
              </div>
              <div className='mt-4'>
                <h3 className='text-on-surface text-4xl font-black'>{stats.usersCount || 0}</h3>
                <p className='text-primary mt-1 flex items-center gap-2 text-xs font-bold'>
                  <span className='bg-primary inline-block h-1.5 w-1.5 animate-pulse rounded-full'></span>
                  Registered Members
                </p>
              </div>
            </div>
            <p className='text-outline mt-4 text-xs leading-relaxed font-semibold'>
              Total users registered on RideEase, actively booking and completing rides.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
