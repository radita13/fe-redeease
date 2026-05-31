import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function FleetTable({
  cabs,
  loading,
  onToggleAvailability,
  onOpenEdit,
  onOpenDelete,
}) {
  return (
    <section className='flex-1 overflow-y-auto p-8'>
      <div className='bg-surface-container-lowest border-outline-variant/30 overflow-hidden rounded-xl border shadow-sm'>
        {loading ? (
          <div className='flex flex-col items-center justify-center space-y-4 py-20'>
            <div className='border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent'></div>
            <p className='text-outline text-sm font-bold'>Loading fleet data...</p>
          </div>
        ) : cabs.length === 0 ? (
          <div className='text-on-surface-variant p-12 text-center text-sm font-semibold'>
            No vehicles match your search criteria.
          </div>
        ) : (
          <Table className='w-full border-collapse text-left'>
            <TableHeader className='bg-surface-container-low border-outline-variant/30 border-b'>
              <TableRow className='hover:bg-transparent'>
                <TableHead className='text-label-md font-label-md text-outline px-6 py-4 tracking-wider uppercase'>
                  Vehicle
                </TableHead>
                <TableHead className='text-label-md font-label-md text-outline px-6 py-4 tracking-wider uppercase'>
                  Plate No
                </TableHead>
                <TableHead className='text-label-md font-label-md text-outline px-6 py-4 tracking-wider uppercase'>
                  Category
                </TableHead>
                <TableHead className='text-label-md font-label-md text-outline px-6 py-4 tracking-wider uppercase'>
                  Assigned Driver
                </TableHead>
                <TableHead className='text-label-md font-label-md text-outline px-6 py-4 text-center tracking-wider uppercase'>
                  Capacity
                </TableHead>
                <TableHead className='text-label-md font-label-md text-outline px-6 py-4 tracking-wider uppercase'>
                  Availability
                </TableHead>
                <TableHead className='text-label-md font-label-md text-outline px-6 py-4 text-right tracking-wider uppercase'>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='divide-outline-variant/10 divide-y'>
              {cabs.map((cab) => (
                <TableRow
                  key={cab._id}
                  className='hover:bg-surface-container-low group transition-colors'
                >
                  <TableCell className='px-6 py-4'>
                    <div className='flex items-center gap-4'>
                      <img
                        className='bg-primary/5 h-12 w-12 rounded-lg object-cover'
                        src={
                          cab.image ||
                          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80'
                        }
                        alt='Vehicle'
                      />
                      <div>
                        <p className='text-label-lg font-label-lg text-on-surface font-bold'>
                          {cab.type} Class
                        </p>
                        <p className='text-body-sm text-on-surface-variant flex items-center gap-1'>
                          <span className='material-symbols-outlined text-sm'>map_pin</span>
                          {cab.location || 'Sudirman, Jakarta'}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='text-on-surface px-6 py-4 font-mono font-bold'>
                    {cab.plateNo}
                  </TableCell>
                  <TableCell className='px-6 py-4'>
                    <Badge
                      variant={
                        cab.type === 'Premium'
                          ? 'default'
                          : cab.type === 'Comfort'
                            ? 'secondary'
                            : 'outline'
                      }
                      className={`text-label-md rounded-full px-3 py-1 font-bold ${
                        cab.type === 'Premium'
                          ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 border'
                          : cab.type === 'Comfort'
                            ? 'bg-secondary-container/10 text-secondary border-secondary/20 hover:bg-secondary/15 border'
                            : 'bg-tertiary/10 text-tertiary border-tertiary/20 hover:bg-tertiary/15 border'
                      }`}
                    >
                      {cab.type}
                    </Badge>
                  </TableCell>
                  <TableCell className='px-6 py-4'>
                    {cab.driver ? (
                      <div className='flex items-center gap-2'>
                        <span className='material-symbols-outlined text-on-surface-variant'>
                          badge
                        </span>
                        <div>
                          <p className='text-body-sm text-on-surface font-bold'>
                            {cab.driver.name || cab.driver}
                          </p>
                          <p className='text-outline text-[10px] font-semibold'>
                            SIM: {cab.driver.license || '-'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className='text-error flex items-center gap-1 text-xs font-bold'>
                        <span className='material-symbols-outlined text-sm'>warning</span>
                        Unassigned
                      </span>
                    )}
                  </TableCell>
                  <TableCell className='text-on-surface px-6 py-4 text-center font-black'>
                    {cab.capacity} Seats
                  </TableCell>
                  <TableCell className='px-6 py-4'>
                    <button
                      onClick={() => onToggleAvailability(cab)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        cab.isAvailable ? 'bg-primary' : 'bg-outline-variant'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          cab.isAvailable ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      ></span>
                    </button>
                  </TableCell>
                  <TableCell className='px-6 py-4 text-right'>
                    <div className='flex items-center justify-end gap-2'>
                      <button
                        onClick={() => onOpenEdit(cab)}
                        className='text-outline hover:text-primary hover:bg-primary/10 cursor-pointer rounded-lg p-2 transition-all'
                        title='Edit Vehicle'
                      >
                        <span className='material-symbols-outlined'>edit</span>
                      </button>
                      <button
                        onClick={() => onOpenDelete(cab)}
                        className='text-outline hover:text-error hover:bg-error/10 cursor-pointer rounded-lg p-2 transition-all'
                        title='Remove Vehicle'
                      >
                        <span className='material-symbols-outlined'>delete</span>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
}
