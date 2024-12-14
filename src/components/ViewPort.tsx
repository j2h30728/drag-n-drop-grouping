import styled from "styled-components";
import { useItemsStore, useLayoutStore } from "../store";
import ViewPortItem from "./ViewPort/ViewPortItem";

const ViewPort = () => {
  const items = useItemsStore((state) => state.items);
  const isAllVertically = useLayoutStore((state) => state.isAllVertically);

  const topLevelItems = items.filter((i) => i.parent === undefined);

  return (
    <ViewPortContainer $isAllVertically={isAllVertically}>
      {topLevelItems.map((item) => (
        <ViewPortItem key={item.id} item={item} />
      ))}
    </ViewPortContainer>
  );
};

export default ViewPort;

const ViewPortContainer = styled.main<{ $isAllVertically: boolean }>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => (props.$isAllVertically ? "row" : "column")};
  position: relative;
  flex: 1;
  min-height: 500px;
  border: 1px solid #ccc;
`;
