import React, { PropsWithChildren, useEffect } from "react";
import { Header } from "components/header/Header";
import { Container } from "@mui/material";
import { StickyTabs } from "../sticky-tabs/StickyTabs";
import { useHttpRequest } from "../../hooks/useHttpRequest";
import { tabApi } from "../../api/tab-api/tab.api";
import { useAppDispatch } from "../../hooks/redux";
import { updateTabs } from "../../store/slices/tab.slice";

interface MainLayoutProps extends PropsWithChildren {}

interface MainLayoutProps {
  contentClassName?: string;
  withTabs?: boolean;
  mustGetTabs?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  contentClassName,
  withTabs = true,
  mustGetTabs = true,
  children,
}) => {
  const [getTabs] = useHttpRequest(tabApi.getTabs);
  const dispatch = useAppDispatch();

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
          {children}
        </main>
      </Container>
    </>
  );
};
