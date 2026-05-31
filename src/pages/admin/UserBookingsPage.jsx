import React from 'react';
import { useUserBookings } from '@/hooks/useUserBookings';
import BookingsHeader from '@/components/admin/bookings/BookingsHeader';
import BookingSummaryPills from '@/components/admin/bookings/BookingSummaryPills';
import BookingsTable from '@/components/admin/bookings/BookingsTable';
import BookingDetailsDialog from '@/components/admin/bookings/BookingDetailsDialog';

export default function UserBookingsPage() {
  const {
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    selectedBooking,
    modalOpen,
    actionLoading,
    filteredBookings,
    stats,
    handleExportCSV,
    handleOpenDetails,
    handleCloseDetails,
    handleApproveConfirm,
    handleDeclineCancel,
    handleStartTrip,
    handleCompleteTrip,
    refreshBookings,
  } = useUserBookings();

  return (
    <div className='bg-background flex h-full flex-1 flex-col overflow-y-auto'>
      {/* TOP HEADER / SEARCH & FILTER */}
      <BookingsHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onRefresh={refreshBookings}
        onExport={handleExportCSV}
      />

      {/* SUMMARY FILTER PILLS */}
      <BookingSummaryPills
        stats={stats}
        statusFilter={statusFilter}
        onSelectFilter={setStatusFilter}
      />

      {/* DATA BOOKINGS TABLE */}
      <BookingsTable
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        bookings={filteredBookings}
        loading={loading}
        onOpenDetails={handleOpenDetails}
      />

      {/* DETAILED BOOKING MODAL */}
      {modalOpen && (
        <BookingDetailsDialog
          booking={selectedBooking}
          actionLoading={actionLoading}
          onClose={handleCloseDetails}
          onDeclineCancel={handleDeclineCancel}
          onApproveConfirm={handleApproveConfirm}
          onStartTrip={handleStartTrip}
          onCompleteTrip={handleCompleteTrip}
        />
      )}
    </div>
  );
}
