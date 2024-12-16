import { create } from "zustand";
import { Item, SelectedItem } from "../utils/types";

interface SelectionState {
  selectedItems: SelectedItem;
  selectItem: (e: React.MouseEvent, id: Item) => void;
  clearSelection: () => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selectedItems: new Map<number, Item>(),

  selectItem: (e: React.MouseEvent, item: Item) => {
    e.preventDefault();
    const isShift = e.shiftKey;

    set((state) => {
      if (!isShift) {
        return { selectedItems: new Map().set(item.id, item) };
      }

      const newSelection = new Map([...state.selectedItems]);
      if (newSelection.has(item.id)) {
        newSelection.delete(item.id);
      } else {
        newSelection.set(item.id, item);
      }
      return { selectedItems: newSelection };
    });
  },

  clearSelection: () => set({ selectedItems: new Map<number, Item>() }),
}));
