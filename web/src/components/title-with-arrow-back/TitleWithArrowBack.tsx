import React, { PropsWithChildren } from "react";

import { MoveBackArrow } from "../move-back-arrow/MoveBackArrow";
import { PageTitle } from "../page-title/PageTitle";
import { Grid } from "@mui/material";

interface TitleWithArrowBackProps extends PropsWithChildren {
  className?: string;
}

export const TitleWithArrowBack: React.FC<TitleWithArrowBackProps> = ({
  className,
  children,
}) => {
  return (
    <Grid container className={className}>
      <MoveBackArrow />
      <PageTitle>{children}</PageTitle>
    </Grid>
  );
};
