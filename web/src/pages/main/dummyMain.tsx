import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useHttpRequest } from "hooks/useHttpRequest";

import { selectTabs, updateTabs } from "store/slices/tab.slice";
import { MainLayout } from "features/main-layout/MainLayout";
import { StickyTabs } from "components/sticky-tabs/stickyTabs";

import { tabApi } from "api/tab-api/tab.api";
import { error } from "../../store/slices/snackbar.slice";

export const DummyMain: React.FC = () => {
  const navigate = useNavigate();

  const [getTabs] = useHttpRequest(tabApi.getTabs, {
    withLoadingIndicator: true,
  });
  const { firstTab } = useAppSelector(selectTabs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      const { data, isOk, message } = await getTabs();
      if (isOk) {
        dispatch(updateTabs(data));
        // navigate(`/${firstTab?.id ?? "first"}`);
      } else {
        dispatch(error({ message }));
      }
    };
    getData();
  }, []);

  return (
    <MainLayout>
      <StickyTabs />
      <Outlet />
    </MainLayout>
  );
};
