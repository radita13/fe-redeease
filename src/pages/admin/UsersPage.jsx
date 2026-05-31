import React from 'react';
import { useAdminUsers } from '@/hooks/useAdminUsers';
import UsersHeader from '@/components/admin/users/UsersHeader';
import UsersTable from '@/components/admin/users/UsersTable';
import SuspendConfirmationDialog from '@/components/admin/users/SuspendConfirmationDialog';

export default function UsersPage() {
  const {
    loading,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    deleteModalOpen,
    setDeleteModalOpen,
    selectedUser,
    statusMap,
    fetchUsers,
    handleToggleStatus,
    handleOpenDelete,
    handleConfirmDelete,
    handleExportCSV,
    filteredUsers,
  } = useAdminUsers();

  return (
    <div className='bg-background flex h-full flex-1 flex-col overflow-hidden'>
      {/* TOP HEADER / SEARCH & FILTER */}
      <UsersHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onRefresh={fetchUsers}
        onExport={handleExportCSV}
      />

      {/* USERS DATA TABLE */}
      <UsersTable
        users={filteredUsers}
        loading={loading}
        statusMap={statusMap}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        onToggleStatus={handleToggleStatus}
        onOpenDelete={handleOpenDelete}
      />

      {/* SUSPEND DIALOG */}
      <SuspendConfirmationDialog
        isOpen={deleteModalOpen}
        user={selectedUser}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
