import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITestWithTab } from "api/test-api/test.api.types";

interface TestsSliceState {
  tests: ITestWithTab[];
}

const initialState: TestsSliceState = {
  tests: [],
};

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    setTests(state, action: PayloadAction<ITestWithTab[]>) {
      state.tests = action.payload;
    },
  },
});

export const { setTests } = testsSlice.actions;
export const testsSliceReducer = testsSlice.reducer;
