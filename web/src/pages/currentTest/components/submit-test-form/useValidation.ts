import * as yup from "yup";

export const useValidation = () => {
  const validationSchema = yup.object().shape({
    name: yup.string().required("Це поле має бути заповнено"),
    surname: yup.string().required("Це поле має бути заповнено"),
    group: yup.string().required("Це поле має бути заповнено"),
  });

  return { validationSchema };
};
