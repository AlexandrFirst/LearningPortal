import React, { ReactNode } from "react";
import styles from "./cancelConfirmButtons.module.scss";

import cn from "classnames";

import { Grid } from "@mui/material";

import { Button } from "../button/Button";
import { LoadingButton } from "../loading-button/LoadingButton";

interface CancelConfirmButtonsProps {
  cancelBtn?: ReactNode;
  confirmBtn?: ReactNode;

  disabledConfirm?: boolean;
  loading?: boolean;

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
  loading,
  disabledConfirm,
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

  const confirm = confirmBtn ?? (
    <LoadingButton
      loading={loading}
      onClick={onSubmit}
      disabled={disabledConfirm}
    >
      Зберегти
    </LoadingButton>
  );

  return (
    <Grid container alignItems="flex-end">
      {cancel}
      {confirm}
    </Grid>
  );
};
