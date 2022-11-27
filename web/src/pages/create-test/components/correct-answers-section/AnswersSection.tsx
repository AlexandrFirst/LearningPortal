import React, { ReactElement } from "react";
import { Grid, ListItem, Typography } from "@mui/material";

type AnswersSectionProps = {
  title: string;
  list?: string[];
  renderInput: (item: string, index: number) => ReactElement;
};

export const AnswersSection: React.FC<AnswersSectionProps> = ({
  title,
  renderInput,
  list,
}) => {
  return (
    <ListItem sx={{ display: "block" }}>
      <Typography variant={"body1"}>{title}</Typography>
      {list?.map((answer, index) => (
        <Grid key={answer} item>
          {renderInput(answer, index)}
        </Grid>
      ))}
    </ListItem>
  );
};
