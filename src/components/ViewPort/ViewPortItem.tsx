import React from "react";
import styled from "styled-components";
import { Item } from "../../utils/types";
import { useItemsStore, useSelectionStore, useLayoutStore } from "../../store";
import { createElement } from "react";

interface ViewPortItemProps {
  item: Item;
}

const ViewPortItem: React.FC<ViewPortItemProps> = ({ item }) => {
  const { items, dragStart, dragOver, drop } = useItemsStore();
  const { selectItem, selectedIds } = useSelectionStore();
  const isGroupVertically = useLayoutStore((state) => state.isGroupVertically);

  const selected = selectedIds.has(item.id);

  const handleDragStart = () => dragStart(item.id);
  const handleDragOver = (e: React.DragEvent) => dragOver(e);
  const handleDrop = () => drop(item.id);
  const handleClick = (e: React.MouseEvent) => selectItem(e, item.id);

  if (item.type === "group") {
    const childrenItems = items.filter((i) => i.parent === item.id);
    return (
      <GroupContainer
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        $color={item.color}
        $isSelected={selected}>
        <span id="group-title">Group</span>
        <ChildrenContainer $isGroupVertically={isGroupVertically}>
          {childrenItems.map((child) => (
            <ViewPortItem key={child.id} item={child} />
          ))}
        </ChildrenContainer>
      </GroupContainer>
    );
  } else {
    return (
      <ItemContainer
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        $color={item.color}
        $isSelected={selected}>
        {createElement(item.type, null, item.type)}
      </ItemContainer>
    );
  }
};

export default ViewPortItem;

const GroupContainer = styled.div<{ $color: string; $isSelected: boolean }>`
  width: 100px;
  height: 200px;
  background-color: ${(props) => props.$color};
  border: ${(props) => (props.$isSelected ? "2px pink solid" : "none")};
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;

  #group-title {
    position: absolute;
    z-index: 10;
    font-weight: 600;
    color: pink;
  }
`;

const ChildrenContainer = styled.div<{ $isGroupVertically: boolean }>`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: ${(props) => (props.$isGroupVertically ? "row" : "column")};
  position: relative;
  width: 100%;
  height: 100%;
`;

const ItemContainer = styled.div<{ $color: string; $isSelected: boolean }>`
  width: 100px;
  height: 200px;
  background-color: ${(props) => props.$color};
  border: ${(props) => (props.$isSelected ? "2px pink solid" : "none")};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
`;
