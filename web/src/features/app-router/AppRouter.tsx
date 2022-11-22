import React from "react";
import { Route, Routes } from "react-router-dom";

import { AppRoute } from "routes";

import { DummyMain } from "pages/main/dummyMain";
import { Main } from "pages/main/Main";
import { Login } from "pages/login/Login";
import { Register } from "pages/register/Register";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<DummyMain />}>
        <Route path={AppRoute.DynamicTabId} element={<Main />} />
      </Route>

      <Route path={`/${AppRoute.Login}`} element={<Login />} />
      <Route path={`/${AppRoute.Register}`} element={<Register />} />
    </Routes>
  );
};
