import { Property } from "csstype";

export enum IconSides {
  TOP,
  BOTTOM,
  START,
  END,
}

export const IconSidesDirection: Record<IconSides, Property.FlexDirection> = {
  [IconSides.TOP]: "column",
  [IconSides.BOTTOM]: "column-reverse",
  [IconSides.END]: "row-reverse",
  [IconSides.START]: "row",
};
