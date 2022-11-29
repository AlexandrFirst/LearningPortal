import React from "react";

import { Grid } from "@mui/material";

import { Button } from "components/button/Button";
import { useAppSelector } from "hooks/redux";

import { CurrentTestModal } from "../../enums";

interface OpenModalButtonProps {
  activateModal: (id: CurrentTestModal) => void;
}

export const OpenModalButton: React.FC<OpenModalButtonProps> = ({
  activateModal,
}) => {
  const selectedAnswers = useAppSelector(
    (state) => state.currentTest.selectedAnswers
  );
  const handleOpenModal = () => {
    activateModal(CurrentTestModal.Submit);
  };

  return (
    <Grid container justifyContent={"flex-end"}>
      <Button onClick={handleOpenModal} disabled={selectedAnswers.length === 0}>
        Зберегти
      </Button>
    </Grid>
  );
};
