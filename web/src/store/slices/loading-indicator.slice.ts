import { createSlice } from "@reduxjs/toolkit";

interface LoadingIndicatorSliceState {
  loading: boolean;
  count: number;
}

const initialState: LoadingIndicatorSliceState = {
  loading: false,
  count: 0,
};

const loadingIndicatorSlice = createSlice({
  name: "loadingIndicator",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.loading = true;
      state.count++;
    },
    hideLoading: (state) => {
      state.count--;
      if (state.count <= 0) {
        state.loading = false;
        state.count = 0;
      }
    },
  },
});

export const { showLoading, hideLoading } = loadingIndicatorSlice.actions;
export const loadingIndicatorSliceReducer = loadingIndicatorSlice.reducer;
