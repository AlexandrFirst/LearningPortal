import React from "react";
import { Backdrop, BackdropProps, CircularProgress } from "@mui/material";

export interface LoadingIndicatorProps extends BackdropProps {}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  ...props
}) => {
  return (
    <Backdrop
      sx={{
        color: (theme) => theme.palette.secondary.main,
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
      {...props}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
};
