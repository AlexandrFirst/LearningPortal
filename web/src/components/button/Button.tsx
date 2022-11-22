import React from "react";
import {
  ButtonProps as MuiButtonProps,
  default as MuiButton,
} from "@mui/material/Button";

interface ButtonProps extends MuiButtonProps {}

export const Button: React.FC<ButtonProps> = ({
  variant = "contained",
  ...props
}) => {
  return <MuiButton {...props} variant={variant} />;
};
