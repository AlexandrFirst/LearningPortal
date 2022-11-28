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
  className?: string;
}

export function FormWrapper<T extends FieldValues>({
  methods,
  onSubmit,
  onError,
  className,
  children,
}: FormWrapperProps<T>) {
  const { handleSubmit } = methods;

  const submit = (data: T) => {
    onSubmit?.(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit, onError)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}
