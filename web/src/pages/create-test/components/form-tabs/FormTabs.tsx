import React from "react";

import { Tab, Tabs } from "@mui/material";

import { useAppSelector } from "hooks/redux";

interface FormTabsProps {
  currentTabId: number;
  onChange: (p: number) => void;
}

export const FormTabs: React.FC<FormTabsProps> = ({
  currentTabId,
  onChange,
}) => {
  const tabs = useAppSelector((state) => state.tabs.tabs);
  return (
    <Tabs
      value={currentTabId}
      onChange={(_, value) => onChange(value)}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs"
    >
      {tabs ? (
        tabs.map(({ id, name }) => {
          return (
            <Tab
              key={id}
              id={`${id}`}
              label={name}
              value={id}
              // component={"div"}
            />
          );
        })
      ) : (
        <Tab label={"Пасхалочка"} value={`/undefined`} />
      )}
    </Tabs>
  );
};
