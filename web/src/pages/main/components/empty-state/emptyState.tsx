import React from "react";

import { Typography } from "@mui/material";

import { Card } from "components/card/Card";

export const EmptyState: React.FC = () => {
  return (
    <Card sx={{ mt: 6 }}>
      <Typography variant={"h3"} sx={{ textAlign: "center" }}>
        Схоже, такої закладки не існує
      </Typography>
    </Card>
  );
};
