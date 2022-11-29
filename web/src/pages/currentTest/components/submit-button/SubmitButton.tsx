import React from "react";
import { useParams } from "react-router-dom";

import { Grid } from "@mui/material";

import { formatAnswers } from "utils";

import { LoadingButton } from "components/loading-button/LoadingButton";

import { useHttpRequest } from "hooks/useHttpRequest";
import { useAppSelector } from "hooks/redux";

import { testApi } from "api/test-api/test.api";

import { CurrentTestParams, ISubmitTestForm } from "../../types";

interface SubmitButtonProps {
  handleSubmit: Function;
  deactivateModal: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  handleSubmit,
  deactivateModal,
}) => {
  const [processAnswers, loading] = useHttpRequest(testApi.processAnswers, {
    withLoadingIndicator: true,
  });
  const { testId } = useParams<CurrentTestParams>();
  const selectedAnswers = useAppSelector(
    (state) => state.currentTest.selectedAnswers
  );

  const proceedAnswers = async ({ name, surname, group }: ISubmitTestForm) => {
    const { data, isOk } = await processAnswers({
      testId: Number(testId) ?? 0,
      name,
      surname,
      group,
      answears: formatAnswers(selectedAnswers),
    });
    console.log("===data===", data);
    deactivateModal();
  };

  return (
    <Grid container justifyContent={"flex-end"} sx={{ mt: 3 }}>
      <LoadingButton loading={loading} onClick={handleSubmit(proceedAnswers)}>
        Відправити
      </LoadingButton>
    </Grid>
  );
};
