import React, { PropsWithChildren } from "react";
import { Header } from "components/header/Header";
import { Container } from "@mui/material";

interface MainLayoutProps extends PropsWithChildren {}

interface MainLayoutProps {
  contentClassName?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  contentClassName,
  children,
}) => {
  return (
    <>
      <Header />
      <Container>
        <main className={contentClassName}>{children}</main>
      </Container>
    </>
  );
};
