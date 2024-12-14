import styled from "styled-components";

import { useItemsStore, useSelectionStore } from "../../store";

const PanelItemList = () => {
  const items = useItemsStore((state) => state.items);
  const selectedIds = useSelectionStore((state) => state.selectedIds);
  const dragStart = useItemsStore((state) => state.dragStart);
  const dragOver = useItemsStore((state) => state.dragOver);
  const drop = useItemsStore((state) => state.drop);
  const selectItem = useSelectionStore((state) => state.selectItem);

  const isSelected = (id: number) => selectedIds.has(id);

  return (
    <ListContainer>
      {items.map((item) => (
        <PanelItem
          key={item.id}
          draggable
          onDragStart={() => dragStart(item.id)}
          onDragOver={dragOver}
          onDrop={() => drop(item.id)}
          $isSelected={isSelected(item.id)}
          onClick={(e) => selectItem(e, item.id)}>
          {item.type}
        </PanelItem>
      ))}
    </ListContainer>
  );
};

export default PanelItemList;

const ListContainer = styled.div`
  overflow-y: auto;
  max-height: 400px;
`;

const PanelItem = styled.div<{ $isSelected: boolean }>`
  width: 100%;
  border: ${(props) => (props.$isSelected ? "2px pink solid" : "none")};
  padding: 2px;
  margin-bottom: 3px;
  text-align: left;
  background-color: white;
  cursor: pointer;
`;
