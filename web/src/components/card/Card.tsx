import React, { PropsWithChildren, ReactNode } from "react";
import {
  CardProps as MuiCardProps,
  default as MuiCard,
} from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

type CardProps = PropsWithChildren &
  MuiCardProps & {
    cardActions?: ReactNode;
  };

export const Card: React.FC<CardProps> = ({
  cardActions,
  children,
  elevation = 8,
  ...props
}) => {
  return (
    <MuiCard {...props} elevation={elevation}>
      <CardContent>{children}</CardContent>
      {cardActions && <CardActions>{cardActions}</CardActions>}
    </MuiCard>
  );
};
