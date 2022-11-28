import { useState } from "react";

import { HttpRequestConfig } from "interfaces";
import { useAppDispatch } from "./redux";

import { hideLoading, showLoading } from "store/slices/loading-indicator.slice";
import { useSnackbar } from "./useSnackbar";

type MethodReturnType<TRes> = { data: TRes; isOk: boolean; message: string };

const defaultHttpRequestConfig: HttpRequestConfig<any> = {
  clearErrorTime: 3000,
  shouldShowLoading: true,
  withThrowErr: false,
  withLoadingIndicator: false,
  withSnackErr: true,
};

export const useHttpRequest = <TArgs = any, TRes = any>(
  request: (...arg: TArgs[]) => Promise<TRes | void>,
  httpRequestConfig?: Partial<HttpRequestConfig<TRes>>
): [
  (...args: TArgs[]) => Promise<MethodReturnType<TRes>>,
  boolean,
  string | null
] => {
  const dispatch = useAppDispatch();
  const snackbar = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const config: HttpRequestConfig<TRes> = {
    ...defaultHttpRequestConfig,
    ...httpRequestConfig,
  };

  const method = async (...args: TArgs[]): Promise<MethodReturnType<TRes>> => {
    try {
      config.shouldShowLoading && setIsLoading(true);
      config.withLoadingIndicator && dispatch(showLoading());
      const data: any = await request(...args);
      data && config.onSuccess && dispatch(config.onSuccess(data));

      return { data, isOk: true, message: "" };
    } catch (err: any) {
      let message = err?.response?.data?.message || err?.response?.statusText;
      if (err?.message === "Network Error") {
        message = "Помилка інтернет з`єднання";
      }
      console.error(err);
      setErrorMessage(message);
      config.withSnackErr && snackbar.error(message);
      return { data: err, isOk: false, message };
    } finally {
      config.shouldShowLoading && setIsLoading(false);
      config.withLoadingIndicator && dispatch(hideLoading());
    }
  };

  return [method, isLoading, errorMessage];
};
