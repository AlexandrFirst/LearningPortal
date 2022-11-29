import React, { MouseEvent, useEffect } from "react";
import styles from "./tests.module.scss";

import { Grid, Typography } from "@mui/material";

import { AppRoute } from "routes";

import { testApi } from "api/test-api/test.api";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useAuth } from "hooks/useAuth";
import { useHttpRequest } from "hooks/useHttpRequest";
import { useSnackbar } from "hooks/useSnackbar";

import { Card } from "components/card/Card";
import { PageTitle } from "components/page-title/PageTitle";
import { Link } from "components/link/Link";

import { MainLayout } from "features/main-layout/MainLayout";

import { setTests } from "store/slices/tests.slice";

import { TestTabs } from "./components/test-tabs/TestTabs";
import { TestsCard } from "./components/tests-card/testsCard";

export const Tests: React.FC = () => {
  const [getAllTests, loading, errorMessage] = useHttpRequest(testApi.getAll, {
    withLoadingIndicator: true,
  });

  const tests = useAppSelector((state) => state.tests.tests);
  const tabs = useAppSelector((state) => state.tabs.tabs);

  const { isAdmin } = useAuth();
  const snackbar = useSnackbar();

  const dispatch = useAppDispatch();

  const handleClickCreate = (e: MouseEvent<HTMLAnchorElement>) => {
    if (tabs?.length === 0 || !tabs) {
      e.preventDefault();
      snackbar.error("Спочатку треба створити закладку");
    }
  };

  useEffect(() => {
    const getData = async () => {
      const { data, isOk } = await getAllTests({
        page: 1,
        pageSize: 100,
      });
      isOk && dispatch(setTests(data));
    };
    getData();
  }, []);

  return (
    <MainLayout withLinkToIllustrations={false}>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        className={styles.title}
      >
        <PageTitle>Тести</PageTitle>
        {isAdmin && (
          <Link
            className={styles.link}
            to={AppRoute.CreateTest}
            onClick={handleClickCreate}
          >
            Створити тест
          </Link>
        )}
      </Grid>
      {!loading && !errorMessage && tests.length === 0 && (
        <Card className={styles.card}>
          <Typography variant={"subtitle2"}>Даних про тести немає</Typography>
        </Card>
      )}
      <TestTabs />
      <TestsCard />
    </MainLayout>
  );
};
