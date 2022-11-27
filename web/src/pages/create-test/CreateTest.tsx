import React from "react";
import styles from "./createTest.module.scss";

import { useNavigate } from "react-router-dom";

import { Grid, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { PageTitle } from "components/page-title/PageTitle";
import { Card } from "components/card/Card";

import { MainLayout } from "features/main-layout/MainLayout";

import { CreateTestForm } from "./components/create-test-form/CreateTestForm";

export const CreateTest: React.FC = () => {
  const navigate = useNavigate();

  const moveBack = () => {
    navigate(-1);
  };

  return (
    <MainLayout withTabs={false}>
      <Grid container className={styles.title_container}>
        <IconButton onClick={moveBack} className={styles.back_icon}>
          <ArrowBackIcon color={"primary"} />
        </IconButton>
        <PageTitle>Створити тест</PageTitle>
      </Grid>
      <Card className={styles.create_form_card}>
        <CreateTestForm />
      </Card>
    </MainLayout>
  );
};
