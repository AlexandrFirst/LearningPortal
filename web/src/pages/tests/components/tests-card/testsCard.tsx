import React from "react";
import styles from "./testsCard.module.scss";

import { useSearchParams } from "react-router-dom";

import { AppRoute } from "routes";

import { useAppSelector } from "hooks/redux";
import { Card } from "components/card/Card";
import { Link } from "components/link/Link";
import { List, ListItem } from "@mui/material";

export const TestsCard: React.FC = () => {
  const tests = useAppSelector((state) => state.tests.tests);

  const [searchParams] = useSearchParams();
  const currentTabId = searchParams.get(AppRoute.QueryTabId);

  if (!currentTabId) return null;
  const currentTabTests = tests.filter((t) => t.tabId === Number(currentTabId));

  return (
    <Card className={styles.card}>
      <List>
        {currentTabTests.map(({ testId, name }, index) => (
          <ListItem>
            <Link to={`/${AppRoute.Tests}/${testId}`} size={"lg"}>
              {index + 1}. {name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
