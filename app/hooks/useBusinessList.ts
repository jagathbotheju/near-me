import { Result } from "@/types";
import { create } from "zustand";

interface Props {
  list: Result[];
  setBusinessList: (list: Result[]) => void;
}

const useBusinessList = create<Props>((set) => ({
  list: [],
  setBusinessList: (list) => set({ list }),
}));

export default useBusinessList;
