import React from "react";
import styles from "./login.module.scss";

import { AppRoute } from "routes";

import { Card } from "components/card/Card";
import { Link } from "components/link/Link";
import { MainLayout } from "features/main-layout/MainLayout";

import { Form } from "./form/Form";

export const Login: React.FC = () => {
  return (
    <MainLayout contentClassName={styles.wrapper}>
      <Card>
        <Form />
        <Link to={`/${AppRoute.Register}`}>
          Ще немає акаунту? Зареєструйтесь
        </Link>
      </Card>
    </MainLayout>
  );
};
