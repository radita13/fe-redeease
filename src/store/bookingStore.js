import { create } from 'zustand';

export const useBookingStore = create((set) => ({
  pickup: '',
  dropoff: '',
  pickupDate: '',
  selectedCab: null,
  activeRide: null,
  activeBooking: null,
  setSearchQuery: (query) => set((state) => ({ ...state, ...query })),
  setSelectedCab: (cab) => set({ selectedCab: cab }),
  setActiveRide: (ride) => set({ activeRide: ride }),
  setActiveBooking: (booking) => set({ activeBooking: booking }),
  clearBookingState: () => set({
    pickup: '',
    dropoff: '',
    pickupDate: '',
    selectedCab: null,
    activeRide: null,
    activeBooking: null,
  }),
}));
