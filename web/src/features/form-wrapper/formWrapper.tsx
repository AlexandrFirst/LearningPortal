import React, { PropsWithChildren } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  UseFormReturn,
} from "react-hook-form";

interface FormWrapperProps<T extends FieldValues> extends PropsWithChildren {
  methods: UseFormReturn<T>;
  onSubmit?: (data: T) => void;
  onError?: SubmitErrorHandler<T>;
}

export function FormWrapper<T extends FieldValues>({
  methods,
  onSubmit,
  onError,
  children,
}: FormWrapperProps<T>) {
  const { handleSubmit } = methods;

  const submit = (data: T) => {
    onSubmit?.(data);
  };

  return (
    <FormProvider {...methods}>
      {/*TODO: it worked on previous versions of react, don't know the exact reason*/}
      <form onSubmit={handleSubmit(submit, onError)}>{children}</form>
    </FormProvider>
  );
}
