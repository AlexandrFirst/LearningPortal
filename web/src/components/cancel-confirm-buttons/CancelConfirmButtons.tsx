import React, { ReactNode } from "react";
import styles from "./cancelConfirmButtons.module.scss";

import { Grid } from "@mui/material";

import { Button } from "../button/Button";
import cn from "classnames";

interface CancelConfirmButtonsProps {
  cancelBtn?: ReactNode;
  confirmBtn?: ReactNode;

  onCancel?: () => void;
  onSubmit?: () => void;

  className?: string;
}

export const CancelConfirmButtons: React.FC<CancelConfirmButtonsProps> = ({
  cancelBtn,
  confirmBtn,
  onCancel,
  onSubmit,
  className,
}) => {
  const cancel = cancelBtn ?? (
    <Button
      variant="text"
      className={cn(styles.cancel, className)}
      onClick={onCancel}
    >
      Відмінити
    </Button>
  );

  const confirm = confirmBtn ?? <Button onClick={onSubmit}>Зберегти</Button>;

  return (
    <Grid container alignItems="flex-end">
      {cancel}
      {confirm}
    </Grid>
  );
};
