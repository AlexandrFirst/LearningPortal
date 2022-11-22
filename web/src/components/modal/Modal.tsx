import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import React, { ReactNode } from "react";

interface ModalProps extends DialogProps {
  title: string;
  buttons?: ReactNode;
  content?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  buttons,
  content,
  title,
  fullWidth = true,
  ...props
}) => {
  return (
    <Dialog {...props} fullWidth={fullWidth}>
      <DialogTitle>{title}</DialogTitle>
      {content && <DialogContent>{content}</DialogContent>}
      {buttons && <DialogActions>{buttons}</DialogActions>}
    </Dialog>
  );
};
