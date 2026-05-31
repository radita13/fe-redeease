import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getCabs, addCab, updateCab, deleteCab } from '@/services/cabService';
import { getDrivers } from '@/services/driverService';
import { toast } from 'sonner';

const cabFormSchema = yup.object({
  driver: yup.string().required('Driver assignment is required'),
  type: yup
    .string()
    .oneOf(['Economy', 'Comfort', 'Premium'], 'Type must be Economy, Comfort, or Premium')
    .required('Vehicle category is required'),
  plateNo: yup.string().required('License plate number is required').trim(),
  capacity: yup
    .number()
    .typeError('Capacity must be a number')
    .required('Capacity is required')
    .min(1, 'Capacity must be at least 1')
    .integer('Capacity must be an integer'),
  image: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .url('Image must be a valid URL'),
  location: yup.string().trim().optional(),
  isAvailable: yup.boolean().default(true),
});

export function useAdminCabs() {
  const [cabs, setCabs] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingCab, setEditingCab] = useState(null);
  const [selectedCab, setSelectedCab] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(cabFormSchema),
    defaultValues: {
      driver: '',
      type: 'Comfort',
      plateNo: '',
      capacity: 4,
      image: '',
      location: '',
      isAvailable: true,
    },
  });

  const selectedType = watch('type');
  const selectedDriver = watch('driver');
  const selectedCapacity = watch('capacity');
  const imageUrl = watch('image');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [cabsRes, driversRes] = await Promise.all([getCabs(), getDrivers()]);
      if (cabsRes.success && cabsRes.data) {
        setCabs(cabsRes.data);
      }
      if (driversRes.success && driversRes.data) {
        setDrivers(driversRes.data);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to retrieve fleet data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenAdd = useCallback(() => {
    setEditingCab(null);
    reset({
      driver: drivers.length > 0 ? drivers[0]._id : '',
      type: 'Comfort',
      plateNo: '',
      capacity: 4,
      image: '',
      location: '',
      isAvailable: true,
    });
    setSheetOpen(true);
  }, [drivers, reset]);

  const handleOpenEdit = useCallback((cab) => {
    setEditingCab(cab);
    reset({
      driver: cab.driver?._id || cab.driver || '',
      type: cab.type,
      plateNo: cab.plateNo,
      capacity: cab.capacity,
      image: cab.image || '',
      location: cab.location || '',
      isAvailable: cab.isAvailable,
    });
    setSheetOpen(true);
  }, [reset]);

  const onSubmit = useCallback(async (data) => {
    const payload = {
      ...data,
      image: data.image === '' ? null : data.image,
    };

    try {
      if (editingCab) {
        const response = await updateCab(editingCab._id, payload);
        if (response.success) {
          toast.success(`Cab ${payload.plateNo} updated successfully`);
          fetchData();
          setSheetOpen(false);
        } else {
          toast.error(response.message || 'Failed to update vehicle');
        }
      } else {
        const response = await addCab(payload);
        if (response.success) {
          toast.success(`Cab ${payload.plateNo} registered successfully`);
          fetchData();
          setSheetOpen(false);
        } else {
          toast.error(response.message || 'Failed to register vehicle');
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'A system error occurred');
    }
  }, [editingCab, fetchData]);

  const handleToggleAvailability = useCallback(async (cab) => {
    try {
      const updatedStatus = !cab.isAvailable;
      const response = await updateCab(cab._id, { isAvailable: updatedStatus });
      if (response.success) {
        setCabs((prev) =>
          prev.map((c) => (c._id === cab._id ? { ...c, isAvailable: updatedStatus } : c)),
        );
        toast.success(
          `Status of ${cab.plateNo} changed to ${updatedStatus ? 'Available' : 'Busy/Ongoing'}`,
        );
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update fleet status');
    }
  }, []);

  const handleOpenDelete = useCallback((cab) => {
    setSelectedCab(cab);
    setDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedCab) return;
    try {
      const response = await deleteCab(selectedCab._id);
      if (response.success) {
        toast.success(`Vehicle ${selectedCab.plateNo} deleted successfully`);
        setCabs((prev) => prev.filter((c) => c._id !== selectedCab._id));
      } else {
        toast.error(response.message || 'Failed to delete vehicle');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while deleting vehicle');
    } finally {
      setDeleteModalOpen(false);
      setSelectedCab(null);
    }
  }, [selectedCab]);

  // Filter Cabs
  const filteredCabs = useMemo(() => {
    return cabs.filter(
      (cab) =>
        cab.plateNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cab.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cab.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cab.driver?.name && cab.driver.name.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [cabs, searchTerm]);

  // Stats calculation
  const stats = useMemo(() => {
    return {
      totalFleet: cabs.length,
      activeFleet: cabs.filter((c) => !c.isAvailable).length,
      availableFleet: cabs.filter((c) => c.isAvailable).length,
    };
  }, [cabs]);

  return {
    cabs,
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
  };
}
