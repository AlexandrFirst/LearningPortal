import React, { useEffect } from "react";
import styles from "./tests.module.scss";

import { Grid } from "@mui/material";

import { AppRoute } from "routes";

import { testApi } from "api/test-api/test.api";

import { useAuth } from "hooks/useAuth";
import { useHttpRequest } from "hooks/useHttpRequest";

import { Card } from "components/card/Card";
import { PageTitle } from "components/page-title/PageTitle";
import { Link } from "components/link/Link";

import { MainLayout } from "features/main-layout/MainLayout";

export const Tests: React.FC = () => {
  const [getAllTests] = useHttpRequest(testApi.getAll, {
    withLoadingIndicator: true,
  });
  const { isAdmin } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllTests({ page: 1, pageSize: 100 });
      console.log("===data===", data);
    };
    getData();
  }, []);

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
