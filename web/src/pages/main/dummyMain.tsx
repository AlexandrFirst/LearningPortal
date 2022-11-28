import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useHttpRequest } from "hooks/useHttpRequest";

import { selectTabs } from "store/slices/tab.slice";
import { MainLayout } from "features/main-layout/MainLayout";

import { tabApi } from "api/tab-api/tab.api";

export const DummyMain: React.FC = () => {
  const navigate = useNavigate();

  const [getTabs] = useHttpRequest(tabApi.getTabs, {
    withLoadingIndicator: true,
  });
  const { firstTab } = useAppSelector(selectTabs);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const getData = async () => {
  //     const { data, isOk, message } = await getTabs();
  //     if (isOk) {
  //       dispatch(updateTabs(data));
  //       // navigate(`/${firstTab?.id ?? "first"}`);
  //     } else {
  //       dispatch(error({ message }));
  //     }
  //   };
  //   getData();
  // }, []);

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
