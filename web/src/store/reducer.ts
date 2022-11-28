import { combineReducers } from "@reduxjs/toolkit";

import { authReducer } from "./slices/auth.slice";
import { tabReducer } from "./slices/tab.slice";
import { snackbarSliceReducer } from "./slices/snackbar.slice";
import { loadingIndicatorSliceReducer } from "./slices/loading-indicator.slice";
import { testsSliceReducer } from "./slices/tests.slice";

export const reducer = combineReducers({
  auth: authReducer,
  tabs: tabReducer,
  snack: snackbarSliceReducer,
  loadingIndicator: loadingIndicatorSliceReducer,
  tests: testsSliceReducer,
});
