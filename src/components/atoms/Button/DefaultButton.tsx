import React from "react";
import Button from "@material-ui/core/Button";

interface Props {
  children?: React.ReactNode;
  onClick?(props: any): any;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  color?: "primary" | "secondary";
}

export default ({
  children,
  onClick,
  type = undefined,
  className,
  color = "primary",
  ...rest
}: Props) => (
  <Button
    variant="contained"
    color={color}
    onClick={onClick}
    type={type}
    className={className}
    {...rest}
  >
    {children}
  </Button>
);
