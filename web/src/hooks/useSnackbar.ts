import { useAppDispatch } from "./redux";
import { useCallback } from "react";
import { error, success } from "store/slices/snackbar.slice";

export const useSnackbar = () => {
  const dispatch = useAppDispatch();

  const showSuccess = useCallback(
    (message: string) => dispatch(success({ message })),
    [dispatch]
  );

  const showError = useCallback(
    (message: string) => dispatch(error({ message })),
    [dispatch]
  );

  return { sucess: showSuccess, error: showError };
};
