import React, { PropsWithChildren } from "react";
import { Header } from "components/header/Header";
import { Container } from "@mui/material";
import { StickyTabs } from "../sticky-tabs/StickyTabs";

interface MainLayoutProps extends PropsWithChildren {}

interface MainLayoutProps {
  contentClassName?: string;
  withTabs?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  contentClassName,
  withTabs = true,
  children,
}) => {
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
