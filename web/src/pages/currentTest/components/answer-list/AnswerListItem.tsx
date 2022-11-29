import React, { ChangeEvent } from "react";

import { Checkbox } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  addToAnswerList,
  deleteAnswer,
} from "../../../../store/slices/current-test.slice";

interface AnswerListItemProps {
  questionId: number;
  answer: string;
}

export const AnswerListItem: React.FC<AnswerListItemProps> = ({
  answer,
  questionId,
}) => {
  const selectedAnswers = useAppSelector(
    (state) => state.currentTest.selectedAnswers
  );
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isSelected = e.target.checked;
    if (isSelected) {
      dispatch(addToAnswerList({ answear: answer, questionId }));
    } else {
      dispatch(deleteAnswer({ answear: answer, questionId }));
    }
  };

  const checked = selectedAnswers.some(
    (sa) => sa.questionId === questionId && sa.answear === answer
  );

  return (
    <FormControlLabel
      control={<Checkbox onChange={handleChange} checked={checked} />}
      label={answer}
    />
  );
};
