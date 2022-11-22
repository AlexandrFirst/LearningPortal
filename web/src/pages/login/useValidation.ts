import * as yup from "yup";

export const useValidation = () => {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Це не є правильною поштою")
      .required("Це поле має бути заповнено"),
    password: yup
      .string()
      .min(1, "Мінімальне кол-во символів - 1")
      .required("Це поле має бути заповнено"),
  });

  return { validationSchema };
};
