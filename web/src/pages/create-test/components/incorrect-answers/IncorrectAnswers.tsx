import React from "react";

import { Button } from "components/button/Button";

import { possibleAnswearsListName } from "../../interfaces";

import { Answer } from "../answer/Answer";
import { AnswersSection } from "../answers-section/AnswersSection";

interface IncorrectAnswersProps {
  possibleAnswears: string[] | undefined;
  index: number;
  addInCorrectAnswer: (index: number) => void;
  deleteInCorrect: (index: number, innerIndex: number) => void;
}

export const IncorrectAnswers: React.FC<IncorrectAnswersProps> = ({
  addInCorrectAnswer,
  possibleAnswears,
  index,
  deleteInCorrect,
}) => {
  return (
    <AnswersSection
      title={"Неправильні відповіді:"}
      list={possibleAnswears}
      renderInput={(answer, innerIndex) => (
        <Answer
          answer={answer}
          index={index}
          innerIndex={innerIndex}
          currentListName={possibleAnswearsListName}
          label={"Неправильна відповідь"}
          onDelete={deleteInCorrect}
        />
      )}
      appendButton={
        <Button color={"secondary"} onClick={() => addInCorrectAnswer(index)}>
          Додати
        </Button>
      }
    />
  );
};
