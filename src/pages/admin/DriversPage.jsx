import React from 'react';
import { useAdminDrivers } from '@/hooks/useAdminDrivers';
import DriversHeader from '@/components/admin/drivers/DriversHeader';
import DriversTable from '@/components/admin/drivers/DriversTable';
import DriverFormModal from '@/components/admin/drivers/DriverFormModal';
import DeleteDriverDialog from '@/components/admin/drivers/DeleteDriverDialog';

export default function DriversPage() {
  const {
    loading,
    searchTerm,
    setSearchTerm,
    formModalOpen,
    setFormModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    editingDriver,
    selectedDriver,
    register,
    handleSubmit,
    errors,
    fetchDrivers,
    handleOpenAdd,
    handleOpenEdit,
    onSubmit,
    handleToggleAvailability,
    handleOpenDelete,
    handleConfirmDelete,
    filteredDrivers,
  } = useAdminDrivers();

  return (
    <div className='bg-background flex h-full flex-1 flex-col overflow-hidden'>
      {/* TOP HEADER / SEARCH & FILTER */}
      <DriversHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onRefresh={fetchDrivers}
        onOpenAdd={handleOpenAdd}
      />

      {/* DRIVERS DATA TABLE */}
      <DriversTable
        drivers={filteredDrivers}
        loading={loading}
        onToggleAvailability={handleToggleAvailability}
        onOpenEdit={handleOpenEdit}
        onOpenDelete={handleOpenDelete}
      />

      {/* FORM MODAL (ADD & EDIT) */}
      <DriverFormModal
        isOpen={formModalOpen}
        editingDriver={editingDriver}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        onClose={() => setFormModalOpen(false)}
      />

      {/* DELETE CONFIRMATION DIALOG */}
      <DeleteDriverDialog
        isOpen={deleteModalOpen}
        driver={selectedDriver}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
