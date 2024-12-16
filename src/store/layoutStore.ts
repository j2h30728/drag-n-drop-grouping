import { create } from "zustand";

type AlignState = "raw" | "column";
interface LayoutState {
  isAllVertically: boolean;
  groupAlignState: Record<number, AlignState>;
  setIsAllVertically: (value: boolean) => void;
  setGroupAlignState: (id: number, value: AlignState) => void;
  clearGroupAlignState: (id: number) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isAllVertically: true,
  groupAlignState: {},

  setIsAllVertically: (value: boolean) => set({ isAllVertically: value }),
  setGroupAlignState: (id: number, value: AlignState) =>
    set((prev) => ({
      groupAlignState: {
        ...prev.groupAlignState,
        [id]: value,
      },
    })),
  clearGroupAlignState: (id: number) =>
    set((prev) => {
      const newGroupAlignState = { ...prev.groupAlignState };
      delete newGroupAlignState[id];
      return { groupAlignState: newGroupAlignState };
    }),
}));
