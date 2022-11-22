import * as yup from "yup";

export const useValidation = () => {
  const formSchema = {
    label: yup.string().trim().min(1, "Це поле є необхідним"),
  };

  const validationSchema = yup.object().shape({
    tabList: yup.array().of(yup.object().shape(formSchema)),
  });

  return { validationSchema };
};
