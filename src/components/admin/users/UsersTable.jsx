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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function UsersTable({
  users,
  loading,
  statusMap,
  onToggleStatus,
  onOpenDelete,
  roleFilter,
  setRoleFilter,
}) {
  return (
    <section className='flex-1 overflow-y-auto p-8'>
      <div className='flex flex-col gap-5'>
        <div className='relative w-full sm:w-48'>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className='bg-surface-container-low border-outline-variant text-label-lg focus-visible:ring-primary h-12! w-full rounded-xl! border px-4 focus-visible:ring-2 focus-visible:ring-offset-0'>
              <SelectValue placeholder='All Roles' />
            </SelectTrigger>
            <SelectContent className='bg-surface-container border-outline-variant text-label-lg rounded-xl border'>
              <SelectItem value='All'>All Roles</SelectItem>
              <SelectItem value='User'>User</SelectItem>
              <SelectItem value='Admin'>Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='bg-surface-container-lowest border-outline-variant/30 overflow-hidden rounded-xl border shadow-sm'>
          {loading ? (
            <div className='flex flex-col items-center justify-center space-y-4 py-20'>
              <div className='border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent'></div>
              <p className='text-outline text-sm font-bold'>Loading users list...</p>
            </div>
          ) : users.length === 0 ? (
            <div className='text-on-surface-variant p-12 text-center text-sm font-semibold'>
              No users found matching your search and filter criteria.
            </div>
          ) : (
            <Table className='w-full border-collapse text-left'>
              <TableHeader className='bg-surface-container-low border-outline-variant/30 border-b'>
                <TableRow className='hover:bg-transparent'>
                  <TableHead className='text-label-md font-label-md text-outline px-6 py-4 tracking-wider uppercase'>
                    User
                  </TableHead>
                  <TableHead className='text-label-md font-label-md text-outline px-6 py-4 tracking-wider uppercase'>
                    Contact Info
                  </TableHead>
                  <TableHead className='text-label-md font-label-md text-outline px-6 py-4 tracking-wider uppercase'>
                    Role
                  </TableHead>
                  <TableHead className='text-label-md font-label-md text-outline px-6 py-4 text-center tracking-wider uppercase'>
                    Rating
                  </TableHead>
                  <TableHead className='text-label-md font-label-md text-outline px-6 py-4 tracking-wider uppercase'>
                    Joined
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
                {users.map((u) => {
                  const isActive = statusMap[u._id] !== false;
                  return (
                    <TableRow
                      key={u._id}
                      className='hover:bg-surface-container-low group transition-colors'
                    >
                      <TableCell className='px-6 py-4'>
                        <div className='flex items-center gap-3'>
                          <div className='bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full text-sm font-black'>
                            {u.name ? u.name[0].toUpperCase() : 'U'}
                          </div>
                          <div>
                            <p className='text-body-md text-on-surface font-bold'>{u.name}</p>
                            <p className='text-label-md text-outline'>ID: {u._id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className='px-6 py-4'>
                        <p className='text-body-sm text-on-surface font-semibold'>{u.email}</p>
                        <p className='text-label-md text-outline'>{u.phone || '-'}</p>
                      </TableCell>
                      <TableCell className='px-6 py-4'>
                        <Badge
                          variant={u.role === 'admin' ? 'secondary' : 'default'}
                          className={`text-label-md rounded-full px-3 py-1 font-bold ${
                            u.role === 'admin'
                              ? 'bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/15 border'
                              : 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 border'
                          }`}
                        >
                          {u.role}
                        </Badge>
                      </TableCell>
                      <TableCell className='px-6 py-4 text-center'>
                        <p className='text-body-md text-on-surface flex items-center justify-center gap-1 font-bold'>
                          <span className='material-symbols-outlined text-secondary fill-1 text-[16px]'>
                            star
                          </span>
                          {u.rating ? u.rating.toFixed(1) : '0.0'}
                        </p>
                      </TableCell>
                      <TableCell className='px-6 py-4'>
                        <p className='text-body-sm text-on-surface font-semibold'>
                          {new Date(u.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </TableCell>
                      <TableCell className='px-6 py-4'>
                        <button
                          onClick={() => onToggleStatus(u._id)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            isActive ? 'bg-primary' : 'bg-outline-variant'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              isActive ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          ></span>
                        </button>
                      </TableCell>
                      <TableCell className='px-6 py-4 text-right'>
                        <div className='flex items-center justify-end gap-2'>
                          <button
                            onClick={() => onOpenDelete(u)}
                            className='text-outline hover:text-error hover:bg-error/10 cursor-pointer rounded-lg p-2 transition-all'
                            title='Suspend Account'
                          >
                            <span className='material-symbols-outlined'>delete</span>
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </section>
  );
}
