import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { formatCurrency } from '@/utils/calculateFare';

export default function DashboardCharts({ chartData, pieData, statusDistribution = [] }) {
  return (
    <div className='space-y-6'>
      <section className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Booking Trends Bar Chart */}
        <Card className='border-outline-variant/30 bg-surface-container-lowest rounded-2xl p-6 shadow-sm lg:col-span-2'>
          <CardHeader className='mb-6 flex flex-row items-center justify-between space-y-0 p-0'>
            <div>
              <CardTitle className='text-label-lg font-label-lg text-on-surface font-bold tracking-tight uppercase'>
                Booking Trends (Last 7 Days)
              </CardTitle>
              <CardDescription className='text-outline text-xs font-semibold'>
                Daily analytics of taxi ride logs
              </CardDescription>
            </div>
          </CardHeader>
          <div className='h-64'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#eef0ff' vertical={false} />
                <XAxis dataKey='name' fontSize={11} stroke='#777587' tickLine={false} />
                <YAxis fontSize={11} stroke='#777587' tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => [`${value} Bookings`, 'Total Bookings']} />
                <Bar dataKey='bookings' fill='#4231d0' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Fleet Distribution Pie Chart */}
        <Card className='border-outline-variant/30 bg-surface-container-lowest flex flex-col justify-between rounded-2xl p-6 shadow-sm'>
          <CardHeader className='mb-4 p-0'>
            <CardTitle className='text-label-lg font-label-lg text-on-surface font-bold tracking-tight uppercase'>
              Fleet Vehicle Classes
            </CardTitle>
            <CardDescription className='text-outline text-xs font-semibold'>
              Breakdown of cabs registered in the database.
            </CardDescription>
          </CardHeader>
          <div className='relative flex h-44 items-center justify-center'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={pieData}
                  cx='50%'
                  cy='50%'
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey='value'
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} Cabs`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart legends */}
          <div className='border-outline-variant/10 grid grid-cols-3 gap-2 border-t pt-4 text-center text-[11px]'>
            {pieData.map((item) => (
              <div key={item.name} className='space-y-1'>
                <div className='flex items-center justify-center gap-1 font-bold'>
                  <span
                    className='h-2.5 w-2.5 rounded-full'
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span>{item.name}</span>
                </div>
                <p className='text-on-surface font-black'>{item.value} Cabs</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Revenue Trend Line Chart */}
        <Card className='border-outline-variant/30 bg-surface-container-lowest rounded-2xl p-6 shadow-sm lg:col-span-2'>
          <CardHeader className='mb-6 flex flex-row items-center justify-between space-y-0 p-0'>
            <div>
              <CardTitle className='text-label-lg font-label-lg text-on-surface font-bold tracking-tight uppercase'>
                Revenue Trend (Last 7 Days)
              </CardTitle>
              <CardDescription className='text-outline text-xs font-semibold'>
                Daily revenue generated from completed rides
              </CardDescription>
            </div>
          </CardHeader>
          <div className='h-64'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#eef0ff' vertical={false} />
                <XAxis dataKey='name' fontSize={11} stroke='#777587' tickLine={false} />
                <YAxis
                  fontSize={11}
                  stroke='#777587'
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                <Line
                  type='monotone'
                  dataKey='revenue'
                  stroke='#007752'
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Booking Status Distribution Donut Chart */}
        <Card className='border-outline-variant/30 bg-surface-container-lowest flex flex-col justify-between rounded-2xl p-6 shadow-sm'>
          <CardHeader className='mb-4 p-0'>
            <CardTitle className='text-label-lg font-label-lg text-on-surface font-bold tracking-tight uppercase'>
              Booking Status Distribution
            </CardTitle>
            <CardDescription className='text-outline text-xs font-semibold'>
              Breakdown of bookings by their current status.
            </CardDescription>
          </CardHeader>
          <div className='relative flex h-44 items-center justify-center'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx='50%'
                  cy='50%'
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey='value'
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} Bookings`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Status legends */}
          <div className='border-outline-variant/10 grid grid-cols-3 gap-2 border-t pt-4 text-center text-[11px]'>
            {statusDistribution.map((item) => (
              <div key={item.name} className='space-y-1'>
                <div className='flex items-center justify-center gap-1 font-bold'>
                  <span
                    className='h-2.5 w-2.5 rounded-full'
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span>{item.name}</span>
                </div>
                <p className='text-on-surface font-black'>{item.value} Rides</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
