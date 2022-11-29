import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

import { PageTitle } from "components/page-title/PageTitle";

import { MainLayout } from "features/main-layout/MainLayout";

import { useHttpRequest } from "hooks/useHttpRequest";

import { testApi } from "api/test-api/test.api";
import { CurrentTestParams } from "./types";

export const CurrentTest: React.FC = () => {
  const { testId } = useParams<CurrentTestParams>();
  const [getById] = useHttpRequest(testApi.getById);

  useEffect(() => {
    const getData = async () => {
      const { data, isOk } = await getById(Number(testId ?? 0));
      console.log("===data===", data);
    };
    getData();
  }, []);

  return (
    <MainLayout withLinkToIllustrations={false} withTabs={false}>
      <PageTitle>Current Test</PageTitle>
    </MainLayout>
  );
};
