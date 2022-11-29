import React from "react";
import styles from "./SubmitTestForm.module.scss";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppSelector } from "hooks/redux";

import { Input } from "components/input/Input";

import { FormWrapper } from "features/form-wrapper/formWrapper";

import { ISubmitTestForm } from "../../types";
import { SubmitButton } from "../submit-button/SubmitButton";
import { useValidation } from "./useValidation";

interface SubmitTestFormProps {
  deactivateModal: () => void;
}

export const SubmitTestForm: React.FC<SubmitTestFormProps> = ({
  deactivateModal,
}) => {
  const user = useAppSelector((state) => state.auth.user);

  const { validationSchema } = useValidation();

  const methods = useForm<ISubmitTestForm>({
    defaultValues: { name: user?.name, surname: user?.surname },
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit } = methods;

  return (
    <FormWrapper methods={methods}>
      <Input name={"name"} label={"Ім'я"} className={styles.input} />
      <Input name={"surname"} label={"Прізвище"} className={styles.input} />
      <Input name={"group"} label={"Група"} className={styles.input} />
      <SubmitButton
        handleSubmit={handleSubmit}
        deactivateModal={deactivateModal}
      />
    </FormWrapper>
  );
};
