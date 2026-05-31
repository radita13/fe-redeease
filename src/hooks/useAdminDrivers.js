import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getDrivers, addDriver, updateDriver, deleteDriver } from '@/services/driverService';
import { toast } from 'sonner';

// Define Yup form schema matching backend
const driverFormSchema = yup.object({
  name: yup.string().required('Name is required').trim(),
  email: yup
    .string()
    .email('Please provide a valid email')
    .required('Email is required')
    .lowercase()
    .trim(),
  phone: yup.string().required('Phone number is required').trim(),
  license: yup.string().required('License number is required').trim(),
  isAvailable: yup.boolean().default(true),
});

export function useAdminDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);

  // Setup Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(driverFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      license: '',
      isAvailable: true,
    },
  });

  const fetchDrivers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getDrivers();
      if (response.success && response.data) {
        setDrivers(response.data);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to retrieve drivers list');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  const handleOpenAdd = useCallback(() => {
    setEditingDriver(null);
    reset({
      name: '',
      email: '',
      phone: '',
      license: '',
      isAvailable: true,
    });
    setFormModalOpen(true);
  }, [reset]);

  const handleOpenEdit = useCallback((driver) => {
    setEditingDriver(driver);
    reset({
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      license: driver.license,
      isAvailable: driver.isAvailable,
    });
    setFormModalOpen(true);
  }, [reset]);

  const onSubmit = useCallback(async (data) => {
    try {
      if (editingDriver) {
        // Edit driver
        const response = await updateDriver(editingDriver._id, data);
        if (response.success) {
          toast.success(`Driver ${data.name} updated successfully`);
          fetchDrivers();
          setFormModalOpen(false);
        } else {
          toast.error(response.message || 'Failed to update driver');
        }
      } else {
        // Add driver
        const response = await addDriver(data);
        if (response.success) {
          toast.success(`Driver ${data.name} registered successfully`);
          fetchDrivers();
          setFormModalOpen(false);
        } else {
          toast.error(response.message || 'Failed to register driver');
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'A system error occurred');
    }
  }, [editingDriver, fetchDrivers]);

  const handleToggleAvailability = useCallback(async (driver) => {
    try {
      const updatedStatus = !driver.isAvailable;
      const response = await updateDriver(driver._id, { isAvailable: updatedStatus });
      if (response.success) {
        setDrivers((prev) =>
          prev.map((d) => (d._id === driver._id ? { ...d, isAvailable: updatedStatus } : d)),
        );
        toast.success(
          `Status of ${driver.name} changed to ${updatedStatus ? 'Available' : 'Busy'}`,
        );
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update driver status');
    }
  }, []);

  const handleOpenDelete = useCallback((driver) => {
    setSelectedDriver(driver);
    setDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedDriver) return;
    try {
      const response = await deleteDriver(selectedDriver._id);
      if (response.success) {
        toast.success(`Driver ${selectedDriver.name} deleted successfully`);
        setDrivers((prev) => prev.filter((d) => d._id !== selectedDriver._id));
      } else {
        toast.error(response.message || 'Failed to delete driver');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while deleting driver');
    } finally {
      setDeleteModalOpen(false);
      setSelectedDriver(null);
    }
  }, [selectedDriver]);

  // Filtered Drivers list
  const filteredDrivers = useMemo(() => {
    return drivers.filter(
      (driver) =>
        driver.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.license?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.phone?.includes(searchTerm),
    );
  }, [drivers, searchTerm]);

  return {
    drivers,
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
  };
}
