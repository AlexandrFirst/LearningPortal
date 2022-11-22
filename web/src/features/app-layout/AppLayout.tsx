import React, { PropsWithChildren } from "react";

import { Snackbar } from "features/snackbar/Snackbar";
import { LoadingIndicator } from "features/loading-indicator/LoadingIndicator";

import { useAppSelector } from "hooks/redux";

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const loading = useAppSelector((state) => state.loadingIndicator.loading);

  return (
    <>
      {children}
      <LoadingIndicator open={loading} />
      <Snackbar />
    </>
  );
};
