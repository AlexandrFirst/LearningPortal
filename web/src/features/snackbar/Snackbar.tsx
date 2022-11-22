import React from "react";

import MUISnackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { clearError } from "../../store/slices/snackbar.slice";

export const Snackbar: React.FC = () => {
  const { message, isOpened, snackType } = useAppSelector(
    (state) => state.snack
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(clearError());
  };

  return (
    <MUISnackbar
      TransitionComponent={Slide}
      open={isOpened}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={snackType} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MUISnackbar>
  );
};
