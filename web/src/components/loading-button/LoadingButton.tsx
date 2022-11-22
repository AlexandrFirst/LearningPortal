import React from "react";
import MUILoadingButton, {
  LoadingButtonProps as MUILoadingButtonProps,
} from "@mui/lab/LoadingButton";

type LoadingButtonProps = MUILoadingButtonProps;

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  variant = "contained",
  children,
  ...props
}) => {
  return (
    <MUILoadingButton {...props} variant={variant}>
      {children}
    </MUILoadingButton>
  );
};
