import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface QuestionTitleProps extends TypographyProps {}

export const QuestionTitle: React.FC<QuestionTitleProps> = ({
  children,
  ...props
}) => {
  return (
    <Typography variant={"subtitle2"} {...props}>
      {children}
    </Typography>
  );
};
