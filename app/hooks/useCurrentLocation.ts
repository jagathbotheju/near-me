import { create } from "zustand";

interface Location {
  lat: number;
  lng: number;
}

interface Props {
  location: Location|null;
  setLocation: (location: Location) => void;
}

const useCurrentLocation = create<Props>((set) => ({
  location: null,
  setLocation: (location) => set({ location}),
}));

export default useCurrentLocation;
