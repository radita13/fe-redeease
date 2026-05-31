import { useState, useEffect, useCallback, useMemo } from 'react';
import { getAllUsers, deleteUser, updateProfile } from '@/services/authService';
import { toast } from 'sonner';

export function useAdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  // Modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [statusMap, setStatusMap] = useState({});

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      if (response.success && response.data) {
        setUsers(response.data);

        // Initialize status toggles for users (based on DB isSuspended)
        const initialStatus = {};
        response.data.forEach((u) => {
          initialStatus[u._id] = u.isSuspended ? false : true;
        });
        setStatusMap(initialStatus);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load users list');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleToggleStatus = useCallback(async (userId) => {
    const currentIsActive = statusMap[userId] !== false;
    const newIsSuspended = currentIsActive;

    setStatusMap((prev) => ({
      ...prev,
      [userId]: !currentIsActive,
    }));

    try {
      const response = await updateProfile(userId, { isSuspended: newIsSuspended });
      if (response.success) {
        toast.success(
          newIsSuspended ? 'Account suspended successfully' : 'Account activated successfully'
        );
      } else {
        setStatusMap((prev) => ({
          ...prev,
          [userId]: currentIsActive,
        }));
        toast.error(response.message || 'Failed to update user status');
      }
    } catch (error) {
      console.error(error);
      setStatusMap((prev) => ({
        ...prev,
        [userId]: currentIsActive,
      }));
      toast.error('An error occurred while updating user status');
    }
  }, [statusMap]);

  const handleOpenDelete = useCallback((user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedUser) return;
    try {
      const response = await deleteUser(selectedUser._id);
      if (response.success) {
        toast.success(`User ${selectedUser.name} deleted successfully`);
        setUsers((prev) => prev.filter((u) => u._id !== selectedUser._id));
      } else {
        toast.error(response.message || 'Failed to delete user');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while deleting user');
    } finally {
      setDeleteModalOpen(false);
      setSelectedUser(null);
    }
  }, [selectedUser]);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.phone && user.phone.includes(searchTerm)) ||
        user._id.includes(searchTerm);

      const matchesRole = roleFilter === 'All' || user.role === roleFilter.toLowerCase();

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  // Export to CSV helper
  const handleExportCSV = useCallback(() => {
    if (filteredUsers.length === 0) {
      toast.error('No data available to export');
      return;
    }
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Role', 'Rating', 'Joined At'];
    const rows = filteredUsers.map((u) => [
      u._id,
      u.name,
      u.email,
      u.phone || '-',
      u.role,
      u.rating || 0,
      new Date(u.createdAt).toLocaleDateString(),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rideease_users_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Data exported to CSV successfully');
  }, [filteredUsers]);

  return {
    users,
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
  };
}
