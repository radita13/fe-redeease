import React from 'react';
import { useAdminCabs } from '@/hooks/useAdminCabs';
import FleetHeader from '@/components/admin/fleet/FleetHeader';
import FleetMetrics from '@/components/admin/fleet/FleetMetrics';
import FleetTable from '@/components/admin/fleet/FleetTable';
import CabFormSheet from '@/components/admin/fleet/CabFormSheet';
import DeleteCabDialog from '@/components/admin/fleet/DeleteCabDialog';

export default function AddCabPage() {
  const {
    drivers,
    loading,
    searchTerm,
    setSearchTerm,
    sheetOpen,
    setSheetOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    editingCab,
    selectedCab,
    register,
    handleSubmit,
    setValue,
    selectedType,
    selectedDriver,
    selectedCapacity,
    imageUrl,
    errors,
    fetchData,
    handleOpenAdd,
    handleOpenEdit,
    onSubmit,
    handleToggleAvailability,
    handleOpenDelete,
    handleConfirmDelete,
    filteredCabs,
    stats,
  } = useAdminCabs();

  return (
    <div className='bg-background flex h-full flex-1 flex-col overflow-hidden'>
      {/* TOP HEADER / SEARCH & FILTER */}
      <FleetHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onRefresh={fetchData}
        onOpenAdd={handleOpenAdd}
      />

      {/* METRIC CARDS */}
      <FleetMetrics stats={stats} />

      {/* FLEET DATA TABLE */}
      <FleetTable
        cabs={filteredCabs}
        loading={loading}
        onToggleAvailability={handleToggleAvailability}
        onOpenEdit={handleOpenEdit}
        onOpenDelete={handleOpenDelete}
      />

      {/* SLIDE-OUT SHEET */}
      <CabFormSheet
        isOpen={sheetOpen}
        editingCab={editingCab}
        drivers={drivers}
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        selectedType={selectedType}
        selectedDriver={selectedDriver}
        selectedCapacity={selectedCapacity}
        imageUrl={imageUrl}
        errors={errors}
        onSubmit={onSubmit}
        onClose={() => setSheetOpen(false)}
      />

      {/* DELETE CONFIRMATION DIALOG */}
      <DeleteCabDialog
        isOpen={deleteModalOpen}
        cab={selectedCab}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
