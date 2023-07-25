import { create } from "zustand";

interface Props {
  category: string;
  setCategory: (cat: string) => void;
}

const useCategory = create<Props>((set) => ({
  category: "fuel_station",
  setCategory: (cat) => set({ category: cat }),
}));

export default useCategory;
