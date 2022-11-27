import React from "react";
import { Route, Routes } from "react-router-dom";

import { AppRoute } from "routes";

import { DummyMain } from "pages/main/dummyMain";
import { Main } from "pages/main/Main";
import { Login } from "pages/login/Login";
import { Register } from "pages/register/Register";
import { ActivateUser } from "pages/activate-user/ActivateUser";
import { Tests } from "pages/tests/Tests";
import { CreateTest } from "pages/create-test/CreateTest";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<DummyMain />}>
        <Route path={AppRoute.DynamicTabId} element={<Main />} />
      </Route>

      <Route path={`/${AppRoute.Tests}`} element={<Tests />} />
      <Route
        path={`/${AppRoute.Tests}/${AppRoute.CreateTest}`}
        element={<CreateTest />}
      />
      <Route path={`/${AppRoute.Login}`} element={<Login />} />
      <Route path={`/${AppRoute.Register}`} element={<Register />} />
      <Route
        path={`/${AppRoute.Activate}/${AppRoute.DynamicToken}`}
        element={<ActivateUser />}
      />
    </Routes>
  );
};
//localhost:3000/activate/huiwh-ughwr-2fiew
