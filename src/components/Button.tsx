import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Property } from "csstype";
import { CSSProperties, useMemo } from "react";

import { IconSides, IconSidesDirection } from "./ButtonUtil";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: string;
  icon?: IconProp;
  iconSide?: IconSides;
  gap?: Property.Gap<string | number>;
}

export default function Button({
  children,
  icon,
  iconSide = IconSides.TOP,
  gap = "0.25em",
  style,
  ...props
}: ButtonProps) {
  const iStyle = useMemo<CSSProperties>(
    () => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: IconSidesDirection[iconSide],
      gap,
      ...style,
    }),
    [gap, iconSide, style]
  );

  return (
    <button {...props} style={iStyle}>
      {icon && <FontAwesomeIcon icon={icon} />}
      <span>{children}</span>
    </button>
  );
}
