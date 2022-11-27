import React from "react";
import styles from "./tests.module.scss";

import { Grid } from "@mui/material";

import { AppRoute } from "routes";

import { Card } from "components/card/Card";
import { PageTitle } from "components/page-title/PageTitle";
import { Link } from "components/link/Link";

import { MainLayout } from "features/main-layout/MainLayout";
import { useAuth } from "hooks/useAuth";

export const Tests: React.FC = () => {
  const { isAdmin } = useAuth();
  return (
    <MainLayout>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        className={styles.title}
      >
        <PageTitle>Тести</PageTitle>
        {isAdmin && (
          <Link className={styles.link} to={AppRoute.CreateTest}>
            Створити тест
          </Link>
        )}
      </Grid>
      <Card className={styles.card}>krljgioer</Card>
    </MainLayout>
  );
};
