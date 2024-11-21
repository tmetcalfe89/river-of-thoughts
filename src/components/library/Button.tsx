import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Property } from "csstype";
import { CSSProperties, ElementType, useMemo } from "react";

import { IconSides, IconSidesDirection } from "./ButtonUtil";
import { Link } from "react-router-dom";

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
  to?: string;
}

export default function Button({
  children,
  icon,
  iconSide = IconSides.TOP,
  gap = "0.25em",
  style,
  variant = "primary",
  iconProps = {},
  to,
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

  const InternalElementType = useMemo<ElementType>(
    () => (to !== undefined ? Link : "button"),
    [to]
  );

  return (
    <InternalElementType
      {...props}
      style={iStyle}
      className={iClassName}
      role="button"
      to={to}
    >
      {icon && <FontAwesomeIcon icon={icon} {...iconProps} />}
      <span>{children}</span>
    </InternalElementType>
  );
}
