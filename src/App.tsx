import { createElement, useState } from "react";
import styled from "styled-components";

import getRandomColor from "./utils/getRandomColor";

export const COMPONENTS = {
  Div: "div",
  Span: "span",
  Paragraph: "p",
} as const;

export type ElementType = (typeof COMPONENTS)[keyof typeof COMPONENTS];

export interface Item {
  id: number;
  type: ElementType | "group";
  color: string;
  children?: number[];
  style?: React.CSSProperties;
  parent?: number;
}

const initialItems: Item[] = [
  { id: 0, type: "div", color: getRandomColor() },
  { id: 1, type: "div", color: getRandomColor() },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  const handleAdd = (tag: ElementType) => {
    const newItem: Item = { id: Date.now(), type: tag, color: getRandomColor() };
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <Container>
      <LayPanel>
        <SectionContainer>
          <h3>Align</h3>
          <button>All Vertically</button>
          <button>All Horizontally</button>
          <button>Group Vertically</button>
          <button>Group Horizontally</button>
        </SectionContainer>
        <SectionContainer>
          <h3>Add</h3>
          {Object.entries(COMPONENTS).map(([componentName, componentTag]) => (
            <button type="button" key={componentName} onClick={() => handleAdd(componentTag as ElementType)}>
              {componentName}
            </button>
          ))}
        </SectionContainer>
        <div>
          {items.map((item) => (
            <PanelItem key={item.id} draggable>
              {item.type}
            </PanelItem>
          ))}
        </div>
      </LayPanel>
      <ViewPort>
        {items.map((item) => (
          <ViewPortItem $color={item.color}>{createElement(item.type, null, item.type)}</ViewPortItem>
        ))}
      </ViewPort>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const LayPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: gray;
  padding: 3px;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  border: 1px solid gray;
  background-color: lightgray;
  gap: 3px;
  padding: 3px 1px;

  h3 {
    font-weight: 600;
    font-size: 20px;
  }

  button {
    width: 100%;
    background-color: white;
    border: 1px solid black;
    padding: 2px;
    margin: 3px 0;
  }
`;

const PanelItem = styled.div`
  width: 100%;
  padding: 2px;
  margin-bottom: 3px;
  text-align: left;
  background-color: white;
  cursor: pointer;
`;

const ViewPort = styled.main`
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;

const ViewPortItem = styled.div<{ $color: string }>`
  width: 100px;
  height: 200px;
  background-color: ${(props) => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
`;
