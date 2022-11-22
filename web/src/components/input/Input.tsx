import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type InputProps = TextFieldProps & {
  name: string;
  errorMessage?: string;
};

export const Input: React.FC<InputProps> = ({
  name,
  variant = "outlined",
  fullWidth = true,
  errorMessage,
  ...props
}) => {
  const isCustomErrorMessage = Boolean(errorMessage);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...props}
          {...field}
          variant={variant}
          fullWidth={fullWidth}
          error={isCustomErrorMessage || !!errors[name]?.message}
          helperText={errorMessage || (errors[name]?.message as string)}
        />
      )}
    />
  );
};
