import React, { useEffect, useState } from "react";
import styles from "./testTabs.module.scss";

import { Link, useSearchParams } from "react-router-dom";

import { Tab, Tabs } from "@mui/material";

import { AppRoute } from "routes";
import { useAppSelector } from "hooks/redux";
import { PageTitle } from "components/page-title/PageTitle";

export const TestTabs: React.FC = () => {
  const [searchParams] = useSearchParams();
  const currentTabId = searchParams.get(AppRoute.QueryTabId);

  const tabs = useAppSelector((state) => state.tabs.tabs);
  const tests = useAppSelector((state) => state.tests.tests);

  const [selectedTab, setSelectedTab] = useState(0);

  const tabsToShow = tabs?.filter((tab) =>
    tests.some((test) => test.tabId === tab.id)
  );

  useEffect(() => {
    setSelectedTab(Number(currentTabId));
  }, [currentTabId]);

  return (
    <Tabs
      value={selectedTab}
      onChange={(_, value) => setSelectedTab(value)}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs"
      className={styles.tabs}
    >
      {tabsToShow ? (
        tabsToShow.map(({ id, name }) => {
          return (
            <Tab
              key={id}
              id={`${id}`}
              label={name}
              value={id}
              component={Link}
              to={`/${AppRoute.Tests}?${AppRoute.QueryTabId}=${id}`}
            />
          );
        })
      ) : (
        <PageTitle>Тестів ще не створено</PageTitle>
      )}
    </Tabs>
  );
};
