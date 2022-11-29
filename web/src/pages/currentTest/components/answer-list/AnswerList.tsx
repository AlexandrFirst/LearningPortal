import React from "react";
import { Grid, List, ListItem } from "@mui/material";
import { AnswerListItem } from "./AnswerListItem";

interface AnswerListProps {
  questionId: number;
  answerList: string[];
}

export const AnswerList: React.FC<AnswerListProps> = ({
  answerList,
  questionId,
}) => {
  return (
    <Grid>
      <List>
        {answerList.map((a) => (
          <ListItem key={a}>
            <AnswerListItem answer={a} questionId={questionId} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};
