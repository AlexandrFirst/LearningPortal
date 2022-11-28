import React, { useEffect, useState } from "react";
import styles from "./createTest.module.scss";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Grid, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { PageTitle } from "components/page-title/PageTitle";
import { Card } from "components/card/Card";

import { useAppDispatch } from "hooks/redux";
import { useHttpRequest } from "hooks/useHttpRequest";

import { tabApi } from "api/tab-api/tab.api";

import { MainLayout } from "features/main-layout/MainLayout";
import { FormWrapper } from "features/form-wrapper/formWrapper";

import { ICreateTestForm } from "./interfaces";

import { CreateTestForm } from "./components/create-test-form/CreateTestForm";
import { FormTabs } from "./components/form-tabs/FormTabs";
import { updateTabs } from "../../store/slices/tab.slice";

export const CreateTest: React.FC = () => {
  const [getTabs] = useHttpRequest(tabApi.getTabs, {
    withLoadingIndicator: true,
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [currentTabId, setCurrentTabId] = useState(0);

  const methods = useForm<ICreateTestForm>({
    defaultValues: {
      questions: [{ content: "", answearsList: [""], possibleAnswears: [""] }],
    },
  });

  const moveBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await getTabs();
      dispatch(updateTabs(data));
    };
    getData();
  }, []);

  return (
    <MainLayout withTabs={false}>
      <Grid container className={styles.title_container}>
        <IconButton onClick={moveBack} className={styles.back_icon}>
          <ArrowBackIcon color={"primary"} />
        </IconButton>
        <PageTitle>Створити тест</PageTitle>
      </Grid>
      <FormWrapper methods={methods} className={styles.create_form_card}>
        <FormTabs currentTabId={currentTabId} onChange={setCurrentTabId} />
        <Card className={styles.create_form_card}>
          <CreateTestForm {...methods} currentTabId={currentTabId} />
        </Card>
      </FormWrapper>
    </MainLayout>
  );
};
