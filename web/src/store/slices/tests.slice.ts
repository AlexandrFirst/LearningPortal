import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITest, ITestWithTab } from "api/test-api/test.api.types";

interface TestsSliceState {
  tests: ITestWithTab[];
  currentTest: ITest | null;
}

const initialState: TestsSliceState = {
  tests: [],
  currentTest: null,
};

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    setTests(state, action: PayloadAction<ITestWithTab[]>) {
      state.tests = action.payload;
    },
    setCurrentTest(state, action: PayloadAction<ITest>) {
      state.currentTest = action.payload;
    },
  },
});

export const { setTests, setCurrentTest } = testsSlice.actions;
export const testsSliceReducer = testsSlice.reducer;
