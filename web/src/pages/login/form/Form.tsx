import React from "react";
import styles from "./form.module.scss";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AppRoute } from "routes";

import { FormWrapper } from "features/form-wrapper/formWrapper";
import { Input } from "components/input/Input";
import { LoadingButton } from "components/loading-button/LoadingButton";

import { userApi } from "api/user-api/user.api";

import { ILogin } from "pages/login/interfaces";
import { useValidation } from "pages/login/useValidation";

import { useHttpRequest } from "hooks/useHttpRequest";
import { useAppDispatch } from "hooks/redux";

import { setUser } from "store/slices/auth.slice";
import { error } from "store/slices/snackbar.slice";

export const Form: React.FC = () => {
  const { validationSchema } = useValidation();
  const dispatch = useAppDispatch();

  const methods = useForm<ILogin>({ resolver: yupResolver(validationSchema) });

  const [login, loading] = useHttpRequest(userApi.login, {
    onSuccess: setUser,
    shouldShowLoading: true,
  });
  const navigate = useNavigate();

  const { handleSubmit } = methods;

  const loginUser = async (loginData: ILogin) => {
    const { isOk, message } = await login(loginData);
    if (isOk) {
      navigate(AppRoute.Main);
    } else {
      dispatch(error({ message }));
    }
  };

  return (
    <FormWrapper methods={methods}>
      <Input
        name={"email"}
        label={"Email"}
        type={"email"}
        className={styles.pt}
        required
      />
      <Input
        name={"password"}
        label={"Password"}
        type={"password"}
        className={styles.pt}
        required
      />
      <LoadingButton
        loading={loading}
        onClick={handleSubmit(loginUser)}
        className={styles.btn}
      >
        Войти
      </LoadingButton>
    </FormWrapper>
  );
};
