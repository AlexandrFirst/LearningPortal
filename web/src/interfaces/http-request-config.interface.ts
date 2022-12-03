import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export interface HttpRequestConfig<T> {
  clearErrorTime: number;
  shouldShowLoading: boolean;
  onSuccess?: ActionCreatorWithPayload<Awaited<T>>;
  onError?: ActionCreatorWithPayload<Awaited<T>>;
  onLoadingStart?: () => void;
  onLoadingFinish?: () => void;
  withLoadingIndicator: boolean;
  withThrowErr: boolean;
  withSnackErr?: boolean;
}
