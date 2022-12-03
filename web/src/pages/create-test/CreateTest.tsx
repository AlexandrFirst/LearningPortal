import React, { useEffect, useState } from "react";
import styles from "./createTest.module.scss";

import { useForm } from "react-hook-form";

import { Card } from "components/card/Card";
import { TitleWithArrowBack } from "components/title-with-arrow-back/TitleWithArrowBack";

import { updateTabs } from "store/slices/tab.slice";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useHttpRequest } from "hooks/useHttpRequest";

import { tabApi } from "api/tab-api/tab.api";

import { MainLayout } from "features/main-layout/MainLayout";
import { FormWrapper } from "features/form-wrapper/formWrapper";

import { ICreateTestForm } from "./interfaces";

import { CreateTestForm } from "./components/create-test-form/CreateTestForm";
import { FormTabs } from "./components/form-tabs/FormTabs";

export const CreateTest: React.FC = () => {
  const [getTabs] = useHttpRequest(tabApi.getTabs, {
    withLoadingIndicator: true,
  });
  const dispatch = useAppDispatch();

  const tabs = useAppSelector((state) => state.tabs.tabs);
  const [currentTabId, setCurrentTabId] = useState(tabs?.at(0)?.id ?? 0);

  const methods = useForm<ICreateTestForm>({
    defaultValues: {
      questions: [{ content: "", answearsList: [""], possibleAnswears: [""] }],
    },
  });

  useEffect(() => {
    const getData = async () => {
      const { data } = await getTabs();
      dispatch(updateTabs(data));
    };
    getData();
  }, []);

  return (
    <MainLayout withTabs={false} withLinkToIllustrations={false}>
      <TitleWithArrowBack className={styles.title_container}>
        Створити тест
      </TitleWithArrowBack>
      <FormWrapper methods={methods} className={styles.create_form_card}>
        <FormTabs currentTabId={currentTabId} onChange={setCurrentTabId} />
        <Card className={styles.create_form_card}>
          <CreateTestForm {...methods} currentTabId={currentTabId} />
        </Card>
      </FormWrapper>
    </MainLayout>
  );
};
