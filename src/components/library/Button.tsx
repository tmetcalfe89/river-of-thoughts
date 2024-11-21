import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Property } from "csstype";
import { CSSProperties, useMemo } from "react";

import { IconSides, IconSidesDirection } from "./ButtonUtil";

type ButtonVariant = "primary" | "secondary";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: string;
  icon?: IconProp;
  iconSide?: IconSides;
  gap?: Property.Gap<string | number>;
  variant?: ButtonVariant;
  iconProps?: Omit<FontAwesomeIconProps, "icon">;
}

export default function Button({
  children,
  icon,
  iconSide = IconSides.TOP,
  gap = "0.25em",
  style,
  variant = "primary",
  iconProps = {},
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

  const iClassName = useMemo<string>(() => classNames(variant), [variant]);

  return (
    <button {...props} style={iStyle} className={iClassName}>
      {icon && <FontAwesomeIcon icon={icon} {...iconProps} />}
      <span>{children}</span>
    </button>
  );
}
