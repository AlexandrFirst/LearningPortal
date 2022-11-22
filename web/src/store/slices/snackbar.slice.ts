import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum SnackBarType {
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}

interface SnackbarSliceState {
  isOpened?: boolean;
  snackType?: SnackBarType;
  message: string;
}

const initialState: SnackbarSliceState = {
  isOpened: false,
  snackType: SnackBarType.SUCCESS,
  message: "",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    success: (state, action: PayloadAction<SnackbarSliceState>) => {
      state.isOpened = true;
      state.snackType = SnackBarType.SUCCESS;
      state.message = action.payload.message;
    },
    error: (state, action: PayloadAction<SnackbarSliceState>) => {
      state.isOpened = true;
      state.snackType = SnackBarType.ERROR;
      state.message = action.payload.message;
    },
    warning: (state, action: PayloadAction<SnackbarSliceState>) => {
      state.isOpened = true;
      state.snackType = SnackBarType.WARNING;
      state.message = action.payload.message;
    },
    informational: (state, action: PayloadAction<SnackbarSliceState>) => {
      state.isOpened = true;
      state.snackType = SnackBarType.INFO;
      state.message = action.payload.message;
    },
    clearError: (state) => {
      state.isOpened = false;
      // state.snackType = undefined
      // state.message = ''
    },
  },
});

export const { success, clearError, error, warning, informational } =
  snackbarSlice.actions;
export const snackbarSliceReducer = snackbarSlice.reducer;
