import { create } from "zustand";

interface LayoutState {
  isAllVertically: boolean;
  isGroupVertically: boolean;
  setIsAllVertically: (value: boolean) => void;
  setIsGroupVertically: (value: boolean) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isAllVertically: true,
  isGroupVertically: true,

  setIsAllVertically: (value: boolean) => set({ isAllVertically: value }),
  setIsGroupVertically: (value: boolean) => set({ isGroupVertically: value }),
}));
