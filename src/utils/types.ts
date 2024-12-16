import { CSSProperties } from "react";

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
  style?: CSSProperties;
  parent?: number;
}

export type SelectedItem = Map<number, Item>;
