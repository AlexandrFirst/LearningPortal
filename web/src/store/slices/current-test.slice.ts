import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AnswerListItem } from "api/test-api/test.api.types";

interface CurrentTestSliceState {
  selectedAnswers: AnswerListItem[];
}

const initialState: CurrentTestSliceState = {
  selectedAnswers: [],
};

const currentTestSlice = createSlice({
  name: "currentTest",
  initialState,
  reducers: {
    addToAnswerList(state, action: PayloadAction<AnswerListItem>) {
      state.selectedAnswers.push(action.payload);
    },
    deleteAnswer(state, action: PayloadAction<AnswerListItem>) {
      state.selectedAnswers = state.selectedAnswers.filter(
        (sa) =>
          sa.questionId === action.payload.questionId &&
          sa.answear !== action.payload.answear
      );
    },
    resetAnswerList(state) {
      state.selectedAnswers = [];
    },
  },
});

export const { addToAnswerList, deleteAnswer, resetAnswerList } =
  currentTestSlice.actions;
export const currentTestSliceReducer = currentTestSlice.reducer;
