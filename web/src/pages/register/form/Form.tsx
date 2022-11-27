import React from "react";
import styles from "./form.module.scss";

import { useForm } from "react-hook-form";

import { error, success } from "store/slices/snackbar.slice";

import { Input } from "components/input/Input";
import { LoadingButton } from "components/loading-button/LoadingButton";

import { FormWrapper } from "features/form-wrapper/formWrapper";

import { useAppDispatch } from "hooks/redux";
import { useHttpRequest } from "hooks/useHttpRequest";

import { userApi } from "api/user-api/user.api";

import { IRegister } from "../interfaces/register.interface";

export const Form: React.FC = () => {
  const dispatch = useAppDispatch();
  const [register, loading] = useHttpRequest(userApi.register);

  const methods = useForm<IRegister>();
  const { handleSubmit } = methods;

  const handleRegister = async (registerData: IRegister) => {
    const { isOk, message } = await register(registerData);
    if (isOk) {
      dispatch(
        success({ message: "На Вашу пошту було надіслано повідомлення" })
      );
    } else {
      dispatch(error({ message }));
    }
  };

  return (
    <FormWrapper methods={methods}>
      <Input
        name={"name"}
        label={"First Name"}
        type={"text"}
        className={styles.pt}
        required
      />
      <Input
        name={"surname"}
        label={"Surname"}
        type={"text"}
        className={styles.pt}
        required
      />
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
        onClick={handleSubmit(handleRegister)}
        className={styles.btn}
      >
        Зареєструватися
      </LoadingButton>
    </FormWrapper>
  );
};
