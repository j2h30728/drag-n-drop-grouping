import { forwardRef } from "react";
import styled from "styled-components";
import { useItemsStore, useLayoutStore } from "../store";
import ViewPortItem from "./ViewPort/ViewPortItem";

const ViewPort = forwardRef<HTMLDivElement>((_, ref) => {
  const items = useItemsStore((state) => state.items);
  const isAllVertically = useLayoutStore((state) => state.isAllVertically);

  const topLevelItems = items.filter((i) => i.parent === undefined);

  return (
    <ViewPortContainer $isAllVertically={isAllVertically} ref={ref}>
      {topLevelItems.map((item) => (
        <ViewPortItem key={item.id} item={item} />
      ))}
    </ViewPortContainer>
  );
});

export default ViewPort;

const ViewPortContainer = styled.div<{ $isAllVertically: boolean }>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => (props.$isAllVertically ? "row" : "column")};
  position: relative;
  flex: 1;
  min-height: 500px;
`;
