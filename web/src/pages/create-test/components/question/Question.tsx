import React, { Fragment } from "react";
import {
  DeepPartial,
  FieldArray,
  useFieldArray,
  useForm,
} from "react-hook-form";

import { Grid, List, ListItem } from "@mui/material";

import { Card } from "components/card/Card";
import { Input } from "components/input/Input";

import {
  IQuestionPartialAnswers,
  questionListName,
  ReactHookFormUpdate,
} from "../../interfaces";

import { AnswersSection } from "../correct-answers-section/AnswersSection";
import { Answer } from "../answer/Answer";

interface QuestionProps extends IQuestionPartialAnswers {
  index: number;
  update: ReactHookFormUpdate;
  control: Control<ICreateTestForm, any>;
}

export const Question: React.FC<QuestionProps> = ({
  index,
  content,
  possibleAnswears,
  answearsList,
  update,
}) => {
  const {} = use;
  return (
    <Card>
      <Input
        label={"Питання"}
        name={`${questionListName}.${index}.content`}
        defaultValue={content}
      />
      <List sx={{ display: "flex", justifyContent: "space-between" }}>
        <AnswersSection
          title={"Правильні відповіді"}
          list={answearsList}
          renderInput={(answer, innerIndex) => (
            <Answer
              answer={answer}
              index={index}
              innerIndex={innerIndex}
              label={"Правильна відповідь"}
            />
          )}
        />
        <AnswersSection
          title={"Неправильні відповіді"}
          list={possibleAnswears}
          renderInput={(answer, innerIndex) => (
            <Answer
              answer={answer}
              index={index}
              innerIndex={innerIndex}
              label={"Неправильна відповідь"}
            />
          )}
        />

        {/*{fields.map(({ id, answearsList, possibleAnswears }) => (*/}
        {/*  <Fragment key={id}>*/}
        {/*    */}
        {/*  </Fragment>*/}
        {/*))}*/}
      </List>
    </Card>
  );
};
