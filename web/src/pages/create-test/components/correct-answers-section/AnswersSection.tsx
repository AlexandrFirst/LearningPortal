import React, { ReactElement } from "react";
import { Grid, ListItem, Typography } from "@mui/material";

type CorrectAnswersSectionProps = {
  title: string;
  list?: string[];
  renderInput: (item: string, index: number) => ReactElement;
};

export const CorrectAnswersSection: React.FC<CorrectAnswersSectionProps> = ({
  title,
  item,
  list,
}) => {
  return (
    <ListItem sx={{ display: "block" }}>
      <Typography variant={"body1"}>{title}</Typography>
      {list?.map((answer, index) => (
        <Grid item>
          {item}
          {/*<Input*/}
          {/*  name={""}*/}
          {/*  label={"Правильна відповідь"}*/}
          {/*  defaultValue={answer}*/}
          {/*/>*/}
        </Grid>
      ))}
    </ListItem>
  );
};
