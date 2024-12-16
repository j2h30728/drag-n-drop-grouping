import { create } from "zustand";
import { Item, ElementType, SelectedItem } from "../utils/types";
import getRandomColor from "../utils/getRandomColor";

interface ItemsState {
  items: Item[];
  draggedId: number | null;
  addItem: (tag: ElementType) => void;
  dragStart: (id: number) => void;
  dragOver: (e: React.DragEvent) => void;
  drop: (id: number) => void;
  groupSelectedElements: (selectedItems: SelectedItem) => Item | undefined;
  unGroupSelectedElements: (selectedIds: SelectedItem) => Item[];
}

export const useItemsStore = create<ItemsState>((set, get) => ({
  items: [
    { id: 0, type: "div", color: getRandomColor() },
    { id: 1, type: "div", color: getRandomColor() },
  ],
  draggedId: null,

  addItem: (tag: ElementType) => {
    const newItem: Item = { id: Date.now(), type: tag, color: getRandomColor() };
    set((state) => ({ items: [...state.items, newItem] }));
  },

  dragStart: (id: number) => {
    set({ draggedId: id });
  },

  dragOver: (e: React.DragEvent) => {
    e.preventDefault();
  },

  drop: (id: number) => {
    const { draggedId, items } = get();
    if (draggedId === null) return;

    const draggedIndex = items.findIndex((item) => item.id === draggedId);
    const dropIndex = items.findIndex((item) => item.id === id);

    if (draggedIndex === -1 || dropIndex === -1) return;

    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(dropIndex, 0, draggedItem);

    set({ items: updatedItems, draggedId: null });
  },
  groupSelectedElements: (selectedItems: SelectedItem) => {
    if (selectedItems.size < 2) return;

    const groupId = Date.now();
    const childIds = Array.from(selectedItems.keys());

    const groupItem: Item = {
      id: groupId,
      type: "group",
      children: childIds,
      color: getRandomColor(),
      style: {
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        border: "2px dashed gray",
      },
    };
    const updatedItems = get().items.map((item) => {
      if (childIds.includes(item.id)) {
        return {
          ...item,
          parent: groupId,
          style: {
            ...item.style,
            position: "absolute" as React.CSSProperties["position"],
          },
        };
      }
      return item;
    });

    set({
      items: [...updatedItems, groupItem],
    });
    return groupItem;
  },

  unGroupSelectedElements: (selectedItems: SelectedItem) => {
    let newItems = [...get().items];
    const groups = newItems.filter((item) => item.type === "group" && selectedItems.has(item.id));

    groups.forEach((group) => {
      if (group.children && group.children.length > 0) {
        newItems = newItems.map((item) => {
          if (group.children?.includes(item.id)) {
            return { ...item, parent: undefined };
          }
          return item;
        });
        newItems = newItems.filter((i) => i.id !== group.id);
      }
    });

    set({ items: newItems });
    return groups;
  },
}));
