import { CAB_TYPES } from '../constants/cabTypes';

export const calculateFare = (distanceInKm, type) => {
  const distance = parseFloat(distanceInKm) || 0;
  let baseRate = 15000;
  let perKmRate = 4500;

  switch (type) {
    case CAB_TYPES.COMFORT:
      baseRate = 25000;
      perKmRate = 6000;
      break;
    case CAB_TYPES.PREMIUM:
      baseRate = 40000;
      perKmRate = 9000;
      break;
    case CAB_TYPES.ECONOMY:
    default:
      baseRate = 15000;
      perKmRate = 4500;
      break;
  }

  const rawFare = baseRate + distance * perKmRate;
  return Math.ceil(rawFare / 100) * 100;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount / 1000);
};
