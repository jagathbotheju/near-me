import { Result } from "@/types";
import { create } from "zustand";

interface Props {
  selectedBusiness: Result | null;
  setSelectedBusiness: (business: Result | null) => void;
}

const useSelectedBusiness = create<Props>((set) => ({
  selectedBusiness: null,
  setSelectedBusiness: (business) => set({ selectedBusiness: business }),
}));

export default useSelectedBusiness;
