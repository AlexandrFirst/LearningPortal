import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { AppRoute } from "routes";

import { useHttpRequest } from "hooks/useHttpRequest";
import { useAppDispatch } from "hooks/redux";

import { error, success } from "store/slices/snackbar.slice";

import { userApi } from "api/user-api/user.api";

type UserTokenParam = {
  token: string;
};

export const ActivateUser: React.FC = () => {
  const { token } = useParams<UserTokenParam>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [confirmUser] = useHttpRequest(userApi.confirm, {
    withLoadingIndicator: true,
  });

  useEffect(() => {
    const activate = async () => {
      const { isOk } = await confirmUser(token ?? "");
      if (!isOk) {
        dispatch(error({ message: "Не вдалося активувати" }));
        navigate(AppRoute.Main);
      } else {
        dispatch(success({ message: "Користувача актововано" }));
        navigate(AppRoute.Login);
      }
    };
    activate();
  }, [dispatch, navigate]);

  return <div>ACTIVATE</div>;
};
