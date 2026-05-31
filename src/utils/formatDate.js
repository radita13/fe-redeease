import { format, parseISO } from 'date-fns';

export const formatBookingDate = (dateString) => {
  if (!dateString) return '-';
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
    return format(date, 'dd MMM yyyy, HH:mm');
  } catch (error) {
    return dateString;
  }
};

export const formatSimpleDate = (dateString) => {
  if (!dateString) return '-';
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
    return format(date, 'dd MMM yyyy');
  } catch (error) {
    return dateString;
  }
};
