import React from "react";
import styles from "./question.module.scss";

import { Grid, IconButton, List } from "@mui/material";

import { Card } from "components/card/Card";
import { Input } from "components/input/Input";

import { IQuestionPartialAnswers, questionListName } from "../../interfaces";
import { CorrectAnswers } from "../correct-answers/CorrectAnswers";
import { IncorrectAnswers } from "../incorrect-answers/IncorrectAnswers";
import DeleteIcon from "@mui/icons-material/Delete";

interface QuestionProps extends IQuestionPartialAnswers {
  index: number;
  addCorrectAnswer: (index: number) => void;
  addInCorrectAnswer: (index: number) => void;
  deleteInCorrect: (index: number, innerIndex: number) => void;
  deleteCorrect: (index: number, innerIndex: number) => void;
  onDeleteQuestion?: (index: number) => void;
}

export const Question: React.FC<QuestionProps> = ({
  index,
  content,
  possibleAnswears,
  answearsList,
  addCorrectAnswer,
  addInCorrectAnswer,
  deleteCorrect,
  deleteInCorrect,
  onDeleteQuestion,
}) => {
  return (
    <Card elevation={2}>
      <Grid container alignItems={"flex-end"}>
        <Grid item xs={11}>
          <Input
            label={"Питання"}
            name={`${questionListName}.${index}.content`}
            defaultValue={content}
          />
        </Grid>
        <IconButton
          className={styles.delete_icon}
          onClick={() => onDeleteQuestion?.(index)}
        >
          <DeleteIcon color={"error"} fontSize={"large"} />
        </IconButton>
      </Grid>
      <List sx={{ display: "flex", justifyContent: "space-between" }}>
        <CorrectAnswers
          addCorrectAnswer={addCorrectAnswer}
          answearsList={answearsList}
          index={index}
          deleteCorrect={deleteCorrect}
        />

        <IncorrectAnswers
          addInCorrectAnswer={addInCorrectAnswer}
          possibleAnswears={possibleAnswears}
          index={index}
          deleteInCorrect={deleteInCorrect}
        />
      </List>
    </Card>
  );
};
