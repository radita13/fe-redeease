import { useState, useCallback } from 'react';
import * as cabService from '../services/cabService';

export const useCabs = () => {
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCabs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await cabService.getCabs();
      if (response.success && response.data) {
        setCabs(response.data);
      } else {
        setError(response.message || 'Failed to fetch cabs');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const getCabDetails = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cabService.getCabById(id);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    cabs,
    loading,
    error,
    fetchCabs,
    getCabDetails,
  };
};
