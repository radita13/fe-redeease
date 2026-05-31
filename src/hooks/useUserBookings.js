import { useState, useEffect, useCallback, useMemo } from 'react';
import { getAllBookings, updateBooking } from '@/services/bookingService';
import { updateRideStatus } from '@/services/rideService';
import { toast } from 'sonner';

export function useUserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modal State
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllBookings();
      if (response.success && response.data) {
        setBookings(response.data);
      } else {
        toast.error(response.message || 'Failed to load bookings list');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while loading bookings data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Derived state: Filter bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const ride = b.ride || {};
      const user = ride.user || {};
      const cab = ride.cab || {};
      const driver = cab.driver || {};

      const matchesSearch =
        b._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (driver.name && driver.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.pickup && ride.pickup.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.dropoff && ride.dropoff.toLowerCase().includes(searchTerm.toLowerCase()));

      const isOngoingRide = b.status === 'confirmed' && ride.status === 'ongoing';
      let matchesStatus = true;
      if (statusFilter !== 'All') {
        if (statusFilter.toLowerCase() === 'ongoing') {
          matchesStatus = isOngoingRide;
        } else {
          if (statusFilter.toLowerCase() === 'confirmed') {
            matchesStatus = b.status === 'confirmed' && ride.status !== 'ongoing';
          } else {
            matchesStatus = b.status === statusFilter.toLowerCase();
          }
        }
      }

      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchTerm, statusFilter]);

  // Derived state: Summary counts
  const stats = useMemo(() => {
    return {
      totalCount: bookings.length,
      pendingCount: bookings.filter((b) => b.status === 'pending').length,
      ongoingCount: bookings.filter((b) => b.status === 'confirmed' && b.ride?.status === 'ongoing').length,
      completedCount: bookings.filter((b) => b.status === 'completed').length,
    };
  }, [bookings]);

  // CSV Exporter
  const handleExportCSV = useCallback(() => {
    if (filteredBookings.length === 0) {
      toast.error('No data available to export');
      return;
    }
    const headers = [
      'Booking ID',
      'Rider Name',
      'Rider Email',
      'Rider Phone',
      'Driver Name',
      'Cab Type',
      'Plate Number',
      'Pickup Location',
      'Drop-off Location',
      'Fare Amount',
      'Booking Status',
      'Ride Status',
      'Created At',
    ];
    const rows = filteredBookings.map((b) => {
      const ride = b.ride || {};
      const user = ride.user || {};
      const cab = ride.cab || {};
      const driver = cab.driver || {};
      return [
        b._id,
        user.name || '-',
        user.email || '-',
        user.phone || '-',
        driver.name || 'Unassigned',
        cab.type || '-',
        cab.plateNo || '-',
        ride.pickup || '-',
        ride.dropoff || '-',
        ride.fare || 0,
        b.status,
        ride.status || '-',
        new Date(b.createdAt).toLocaleString(),
      ];
    });

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rideease_bookings_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Bookings data exported to CSV successfully');
  }, [filteredBookings]);

  const handleOpenDetails = useCallback((booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleApproveConfirm = useCallback(async (bookingId) => {
    setActionLoading(true);
    try {
      const response = await updateBooking(bookingId, { status: 'confirmed' });
      if (response.success) {
        toast.success('Booking approved and confirmed successfully!');
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId
              ? { ...b, status: 'confirmed', ride: b.ride ? { ...b.ride, status: 'confirmed' } : null }
              : b
          )
        );
        setModalOpen(false);
      } else {
        toast.error(response.message || 'Failed to approve booking');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while approving the booking');
    } finally {
      setActionLoading(false);
    }
  }, []);

  const handleDeclineCancel = useCallback(async (bookingId) => {
    setActionLoading(true);
    try {
      const response = await updateBooking(bookingId, { status: 'cancelled' });
      if (response.success) {
        toast.success('Booking cancelled or declined successfully.');
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId
              ? { ...b, status: 'cancelled', ride: b.ride ? { ...b.ride, status: 'cancelled' } : null }
              : b
          )
        );
        setModalOpen(false);
      } else {
        toast.error(response.message || 'Failed to cancel booking');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while cancelling the booking');
    } finally {
      setActionLoading(false);
    }
  }, []);

  const handleStartTrip = useCallback(async (rideId, bookingId) => {
    setActionLoading(true);
    try {
      const response = await updateRideStatus(rideId, 'ongoing');
      if (response.success) {
        toast.success('Trip has started (ongoing)!');
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId ? { ...b, ride: b.ride ? { ...b.ride, status: 'ongoing' } : null } : b
          )
        );
        setModalOpen(false);
      } else {
        toast.error(response.message || 'Failed to start trip');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while starting the trip');
    } finally {
      setActionLoading(false);
    }
  }, []);

  const handleCompleteTrip = useCallback(async (bookingId) => {
    setActionLoading(true);
    try {
      const response = await updateBooking(bookingId, { status: 'completed' });
      if (response.success) {
        toast.success('Trip has been completed!');
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId
              ? { ...b, status: 'completed', ride: b.ride ? { ...b.ride, status: 'completed' } : null }
              : b
          )
        );
        setModalOpen(false);
      } else {
        toast.error(response.message || 'Failed to complete trip');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while completing the trip');
    } finally {
      setActionLoading(false);
    }
  }, []);

  return {
    bookings,
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
    refreshBookings: fetchBookings,
  };
}
