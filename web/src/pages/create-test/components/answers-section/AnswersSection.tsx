import React, { ReactElement } from "react";
import { Grid, ListItem, Typography } from "@mui/material";

type AnswersSectionProps = {
  title: string;
  list?: string[];
  renderInput: (item: string, index: number) => ReactElement;
  appendButton?: ReactElement;
  deleteButton?: ReactElement;
};

export const AnswersSection: React.FC<AnswersSectionProps> = ({
  title,
  renderInput,
  list,
  appendButton,
  deleteButton,
}) => {
  return (
    <ListItem sx={{ display: "block" }}>
      <Typography variant={"body1"}>{title}</Typography>
      {list?.map((answer, index) => (
        <Grid key={answer} item>
          {renderInput(answer, index)}
        </Grid>
      ))}
      <div style={{ marginTop: "1.2rem", float: "right" }}>
        {deleteButton}
        {appendButton}
      </div>
    </ListItem>
  );
};
