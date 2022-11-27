import React, { PropsWithChildren } from "react";
import { Typography } from "@mui/material";

interface PageTitleProps extends PropsWithChildren {
  className?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  className,
  children,
}) => {
  return (
    <Typography variant={"h4"} component={"h1"} className={className}>
      {children}
    </Typography>
  );
};
