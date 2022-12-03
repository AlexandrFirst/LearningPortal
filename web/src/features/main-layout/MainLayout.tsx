import React, { PropsWithChildren, useEffect } from "react";
import styles from "./mainLayout.module.scss";

import { useNavigate } from "react-router-dom";

import { Container, Grid } from "@mui/material";

import { Header } from "components/header/Header";
import { Button } from "components/button/Button";

import { useHttpRequest } from "hooks/useHttpRequest";
import { useAppDispatch } from "hooks/redux";

import { updateTabs } from "store/slices/tab.slice";

import { tabApi } from "api/tab-api/tab.api";

import { StickyTabs } from "../sticky-tabs/StickyTabs";
import { OuterLink } from "../../components/outer-link/OuterLink";

interface MainLayoutProps extends PropsWithChildren {}

interface MainLayoutProps {
  contentClassName?: string;
  withTabs?: boolean;
  withLinkToIllustrations?: boolean;
  mustGetTabs?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  contentClassName,
  withTabs = true,
  mustGetTabs = true,
  withLinkToIllustrations = true,
  children,
}) => {
  const [getTabs] = useHttpRequest(tabApi.getTabs);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMoveToIlustrations = () => {
    navigate("");
  };

  useEffect(() => {
    const getData = async () => {
      const { data, isOk } = await getTabs();
      isOk && dispatch(updateTabs(data));
    };
    mustGetTabs && getData();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <main className={contentClassName}>
          {withTabs && <StickyTabs />}
          {withLinkToIllustrations && (
            <Grid
              container
              justifyContent={"right"}
              className={styles.button_container}
            >
              <Button>
                <OuterLink
                  label={"Перейти до ілюстрацій"}
                  link={"https://a5d8-5-199-232-130.eu.ngrok.io"}
                  className={styles.link_to_program}
                />
              </Button>
            </Grid>
          )}
          {children}
        </main>
      </Container>
    </>
  );
};
