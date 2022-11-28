import React from "react";
import styles from "./answer.module.scss";

import { questionListName } from "../../interfaces";

import { Input } from "components/input/Input";
import { Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface AnswerProps {
  index: number;
  innerIndex: number;
  answer: string;
  label: string;
  currentListName: string;
  onDelete?: (index: number, innerIndex: number) => void;
}

export const Answer: React.FC<AnswerProps> = ({
  answer,
  innerIndex,
  index,
  label,
  currentListName,
  onDelete,
}) => {
  return (
    <Grid container alignItems={"flex-end"}>
      <Grid item xs={11}>
        <Input
          className={styles.input}
          name={`${questionListName}.[${index}].${currentListName}.[${innerIndex}]`}
          label={`${label} (${innerIndex + 1})`}
          defaultValue={answer}
        />
      </Grid>
      <IconButton onClick={() => onDelete?.(index, innerIndex)}>
        <DeleteIcon color={"error"} />
      </IconButton>
    </Grid>
  );
};
