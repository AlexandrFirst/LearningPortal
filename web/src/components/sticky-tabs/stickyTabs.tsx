import React, { SyntheticEvent, useEffect, useState } from "react";
import styles from "./stickyTabs.module.scss";

import { Link, useLocation } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";

import { AddNewTabModal } from "components/add-new-tab-modal/addNewTabModal";

import { AppRoute } from "routes";

import { AddUpdateTabList } from "interfaces";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import { usePrevious } from "hooks/usePrevious";
import { useHttpRequest } from "hooks/useHttpRequest";
import { useAuth } from "hooks/useAuth";

import { selectTabs, updateTabs } from "store/slices/tab.slice";

import { tabApi } from "api/tab-api/tab.api";

import { useAddNewTabModal } from "./useAddNewTabModal";
import { error } from "../../store/slices/snackbar.slice";

export const StickyTabs: React.FC = () => {
  const { tabs, firstTab } = useAppSelector(selectTabs);
  const { isAdmin } = useAuth();

  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  const [getTabs] = useHttpRequest(tabApi.getTabs, {
    withLoadingIndicator: true,
  });
  const [updateTabList] = useHttpRequest(tabApi.updateTabs);

  const [currentTab, setCurrentTab] = useState(`/${firstTab?.id}`);
  const prevTab = usePrevious(currentTab);

  const { isModalOpened, handleCloseModal, handleOpenModal } =
    useAddNewTabModal({ prevTab, setCurrentTab });

  const handleChange = (e: SyntheticEvent) => {
    setCurrentTab(e.currentTarget.id);
  };

  const handleSubmit = async ({ tabList }: AddUpdateTabList) => {
    await updateTabList({
      tabs: tabList.map((t) => ({
        id: t.id ?? 0,
        name: t.name ?? "",
        links: t.links?.map((l) => l.id) ?? [],
        order: t.order ?? 0,
      })),
    });
    const { data, isOk, message } = await getTabs();
    isOk ? dispatch(updateTabs(data ?? [])) : dispatch(error({ message }));
    handleCloseModal();
  };

  useEffect(() => {
    setCurrentTab(pathname);
  }, [pathname]);

  return (
    <>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs"
        className={styles.tabs}
      >
        {tabs ? (
          tabs.map(({ id, name }) => {
            const tabId = `/${id}`;
            return (
              <Tab
                key={tabId}
                id={tabId}
                label={name}
                value={tabId}
                component={Link}
                to={tabId}
              />
            );
          })
        ) : (
          <Tab label={"Пасхалочка"} value={`/undefined`} />
        )}
        {isAdmin && (
          <Tab
            id={`/${AppRoute.AddTab}`}
            value={`/${AppRoute.AddTab}`}
            label={"+Додати/Змінити"}
            onClick={handleOpenModal}
            component={"div"}
          />
        )}
      </Tabs>
      <AddNewTabModal
        isOpen={isModalOpened}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};
