import React from "react";

import { AppRouter } from "features/app-router/AppRouter";
import { AppLayout } from "features/app-layout/AppLayout";

import { useAuthenticateUser } from "./useAuthenticateUser";

function App() {
  useAuthenticateUser();

  return (
    <AppLayout>
      <AppRouter />
    </AppLayout>
  );
}

export default App;
