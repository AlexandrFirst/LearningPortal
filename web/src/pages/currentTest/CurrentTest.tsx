import React, { useEffect, useState } from "react";
import styles from "./currentTest.module.scss";

import { useLocation, useParams } from "react-router-dom";

import { List, ListItem } from "@mui/material";
import { Card } from "components/card/Card";

import { MainLayout } from "features/main-layout/MainLayout";

import { useHttpRequest } from "hooks/useHttpRequest";
import { useActivateModal } from "hooks/useActivateModal";
import { useAppDispatch } from "hooks/redux";

import { testApi } from "api/test-api/test.api";
import { ITest } from "api/test-api/test.api.types";

import { CurrentTestParams } from "./types";
import { Question } from "./components/question/Question";
import { SubmitModal } from "./components/submit-modal/SubmitModal";
import { CurrentTestModal } from "./enums";
import { OpenModalButton } from "./components/open-modal-btn/OpenModalButton";
import { resetAnswerList } from "../../store/slices/current-test.slice";
import { TitleWithArrowBack } from "../../components/title-with-arrow-back/TitleWithArrowBack";

export const CurrentTest: React.FC = () => {
  const { testId } = useParams<CurrentTestParams>();
  const [getById] = useHttpRequest(testApi.getById, {
    withLoadingIndicator: true,
  });
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const [currentTest, setCurrentTest] = useState<ITest | null>(null);

  useEffect(() => {
    const getData = async () => {
      const { data, isOk } = await getById(testId ?? "");
      if (isOk) setCurrentTest(data);
      console.log("===data===", data);
    };
    getData();
  }, []);

  const modalData = useActivateModal<CurrentTestModal>();

  useEffect(() => {
    dispatch(resetAnswerList());
  }, [pathname]);

  return (
    <MainLayout withLinkToIllustrations={false} withTabs={false}>
      <TitleWithArrowBack className={styles.title}>
        {currentTest?.name}
      </TitleWithArrowBack>
      <Card className={styles.card}>
        <List>
          {currentTest?.questions.map((q) => (
            <ListItem key={q.id} className={styles.list_item}>
              <Question question={q} />
            </ListItem>
          ))}
        </List>
        <OpenModalButton activateModal={modalData.activateModal} />
      </Card>
      <SubmitModal {...modalData} />
    </MainLayout>
  );
};
