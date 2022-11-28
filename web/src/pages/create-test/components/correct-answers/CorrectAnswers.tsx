import React from "react";

import { Button } from "components/button/Button";

import { answearsListName } from "../../interfaces";

import { Answer } from "../answer/Answer";
import { AnswersSection } from "../answers-section/AnswersSection";

interface CorrectAnswersProps {
  answearsList: string[] | undefined;
  index: number;
  addCorrectAnswer: (index: number) => void;
  deleteCorrect: (index: number, innerIndex: number) => void;
}

export const CorrectAnswers: React.FC<CorrectAnswersProps> = ({
  answearsList,
  index,
  addCorrectAnswer,
  deleteCorrect,
}) => {
  return (
    <AnswersSection
      title={"Правильні відповіді:"}
      list={answearsList}
      renderInput={(answer, innerIndex) => (
        <Answer
          answer={answer}
          index={index}
          innerIndex={innerIndex}
          currentListName={answearsListName}
          label={"Правильна відповідь"}
          onDelete={deleteCorrect}
        />
      )}
      appendButton={
        <Button color={"primary"} onClick={() => addCorrectAnswer(index)}>
          Додати
        </Button>
      }
    />
  );
};
