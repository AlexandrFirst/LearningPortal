import React from "react";
import { answearsListName, questionListName } from "../../interfaces";

import { Input } from "components/input/Input";

interface AnswerProps {
  index: number;
  innerIndex: number;
  answer: string;
  label: string;
}

export const Answer: React.FC<AnswerProps> = ({
  answer,
  innerIndex,
  index,
  label,
}) => {
  return (
    <Input
      name={`${questionListName}.${index}.${answearsListName}.${innerIndex}`}
      label={label}
      defaultValue={answer}
    />
  );
};
