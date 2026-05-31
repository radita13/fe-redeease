import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function DriversTable({
  drivers,
  loading,
  onToggleAvailability,
  onOpenEdit,
  onOpenDelete,
}) {
  return (
    <section className='grow overflow-y-auto p-8'>
      <div className='bg-surface-container-lowest border-outline-variant/30 overflow-hidden rounded-xl border shadow-sm'>
        {loading ? (
          <div className='flex flex-col items-center justify-center space-y-4 py-20'>
            <div className='border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent'></div>
            <p className='text-outline text-sm font-bold'>Loading driver data...</p>
          </div>
        ) : drivers.length === 0 ? (
          <div className='text-on-surface-variant p-12 text-center text-sm font-semibold'>
            No registered drivers match your search criteria.
          </div>
        ) : (
          <Table className='w-full border-collapse text-left'>
            <TableHeader className='bg-surface-container-low border-outline-variant/30 border-b'>
              <TableRow className='hover:bg-transparent'>
                <TableHead className='text-label-md font-label-md text-outline px-6 py-4 tracking-wider uppercase'>
                  Driver
                </TableHead>
                <TableHead className='text-label-md font-label-md text-outline px-6 py-4 tracking-wider uppercase'>
                  Contact
                </TableHead>
                <TableHead className='text-label-md font-label-md text-outline px-6 py-4 tracking-wider uppercase'>
                  License No
                </TableHead>
                <TableHead className='text-label-md font-label-md text-outline px-6 py-4 text-center tracking-wider uppercase'>
                  Rating
                </TableHead>
                <TableHead className='text-label-md font-label-md text-outline px-6 py-4 tracking-wider uppercase'>
                  Status
                </TableHead>
                <TableHead className='text-label-md font-label-md text-outline px-6 py-4 text-right tracking-wider uppercase'>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='divide-outline-variant/10 divide-y'>
              {drivers.map((d) => (
                <TableRow
                  key={d._id}
                  className='hover:bg-surface-container-low group transition-colors'
                >
                  <TableCell className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-tertiary-container/10 text-tertiary flex h-10 w-10 items-center justify-center rounded-full text-sm font-black'>
                        {d.name ? d.name[0].toUpperCase() : 'D'}
                      </div>
                      <div>
                        <p className='text-body-md text-on-surface font-bold'>{d.name}</p>
                        <p className='text-label-md text-outline font-semibold'>ID: {d._id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='px-6 py-4'>
                    <p className='text-body-sm text-on-surface font-semibold'>{d.email}</p>
                    <p className='text-label-md text-outline'>{d.phone}</p>
                  </TableCell>
                  <TableCell className='px-6 py-4'>
                    <span className='bg-surface-container border-outline-variant/40 text-label-lg text-on-surface rounded-md border px-3 py-1 font-mono font-bold'>
                      {d.license}
                    </span>
                  </TableCell>
                  <TableCell className='px-6 py-4 text-center'>
                    <p className='text-body-md text-on-surface flex items-center justify-center gap-1 font-bold'>
                      <span className='material-symbols-outlined text-secondary fill-1 text-[18px]'>
                        star
                      </span>
                      {d.rating ? d.rating.toFixed(1) : '0.0'}
                    </p>
                  </TableCell>
                  <TableCell className='px-6 py-4'>
                    <button
                      onClick={() => onToggleAvailability(d)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        d.isAvailable ? 'bg-tertiary' : 'bg-outline-variant'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          d.isAvailable ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      ></span>
                    </button>
                  </TableCell>
                  <TableCell className='px-6 py-4 text-right'>
                    <div className='flex items-center justify-end gap-2'>
                      <button
                        onClick={() => onOpenEdit(d)}
                        className='text-outline hover:text-primary hover:bg-primary/10 cursor-pointer rounded-lg p-2 transition-all'
                        title='Edit Driver'
                      >
                        <span className='material-symbols-outlined'>edit</span>
                      </button>
                      <button
                        onClick={() => onOpenDelete(d)}
                        className='text-outline hover:text-error hover:bg-error/10 cursor-pointer rounded-lg p-2 transition-all'
                        title='Delete Driver'
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
