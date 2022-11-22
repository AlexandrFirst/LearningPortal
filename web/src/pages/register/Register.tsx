import React from "react";
import styles from "./register.module.scss";

import { AppRoute } from "routes";

import { Card } from "components/card/Card";
import { Link } from "components/link/Link";
import { MainLayout } from "features/main-layout/MainLayout";

import { Form } from "./form/Form";

export const Register: React.FC = () => {
  return (
    <MainLayout contentClassName={styles.wrapper}>
      <Card>
        <Form />
        <Link to={`/${AppRoute.Login}`}>Вже є акаунт? Увійдіть</Link>
      </Card>
    </MainLayout>
  );
};
