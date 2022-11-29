import React from "react";
import { IQuestionInput } from "api/test-api/test.api.types";

import { QuestionTitle } from "../question-title/QuestionTitle";
import { AnswerList } from "../answer-list/AnswerList";

interface QuestionProps {
  question: IQuestionInput;
}

export const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <>
      <QuestionTitle>{question.content}</QuestionTitle>
      <AnswerList
        questionId={question.id}
        answerList={question.possibleAnswears}
      />
    </>
  );
};
