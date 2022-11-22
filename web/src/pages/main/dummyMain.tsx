import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useHttpRequest } from "hooks/useHttpRequest";

import { selectTabs, updateTabs } from "store/slices/tab.slice";
import { MainLayout } from "features/main-layout/MainLayout";
import { StickyTabs } from "components/sticky-tabs/stickyTabs";

import { tabApi } from "api/tab-api/tab.api";

export const DummyMain: React.FC = () => {
  const navigate = useNavigate();

  const [getTabs] = useHttpRequest(tabApi.getTabs);
  const { tabs, firstTab } = useAppSelector(selectTabs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      const { data } = await getTabs();
      if (!tabs || tabs.length === 0) {
        data && dispatch(updateTabs(data));
      } else {
        navigate(`/${firstTab?.id ?? "first"}`);
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
