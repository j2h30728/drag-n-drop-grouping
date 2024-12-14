import { create } from "zustand";

interface SelectionState {
  selectedIds: Set<number>;
  selectItem: (e: React.MouseEvent, id: number) => void;
  clearSelection: () => void;
  setSelection: (ids: Set<number>) => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selectedIds: new Set<number>(),

  selectItem: (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    const isShift = e.shiftKey;

    set((state) => {
      if (!isShift) {
        return { selectedIds: new Set([id]) };
      }

      const newSelection = new Set(state.selectedIds);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return { selectedIds: newSelection };
    });
  },

  clearSelection: () => set({ selectedIds: new Set<number>() }),

  setSelection: (ids: Set<number>) => set({ selectedIds: ids }),
}));
