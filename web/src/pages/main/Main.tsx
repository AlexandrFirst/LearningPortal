import React, { useMemo } from "react";
import styles from "./main.module.scss";

import { useParams } from "react-router-dom";

import { ILink, LinkType } from "api/tab-api/tab.api.types";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useActivateModal } from "hooks/useActivateModal";
import { useAuth } from "hooks/useAuth";
import { useHttpRequest } from "hooks/useHttpRequest";

import { tabApi } from "api/tab-api/tab.api";

import { selectTabs, updateTabs } from "store/slices/tab.slice";
import { error, success } from "store/slices/snackbar.slice";

import { CurrentTabAttachments } from "pages/main/components/current-tab-attachments/CurrentTabAttachments";

import { Card } from "components/card/Card";
import { Button } from "components/button/Button";

import { AddEditDeleteModal } from "./add-edit-delete-modals.enum";

import { ModalContextProvider } from "./components/modal-context/ModalContext";
import { AddEditAttachmentModal } from "./components/modal-add-edit-attachment/AddEditAttachmentModal";
import { DeleteAttachmentModal } from "./components/modal-delete-attachment/DeleteAttachmentModal";
import { EmptyState } from "./components/empty-state/emptyState";

type TabParam = {
  tabId: string;
};

export const Main: React.FC = () => {
  const { tabId } = useParams<TabParam>();
  const { tabs } = useAppSelector(selectTabs);
  const { isAdmin } = useAuth();

  const dispatch = useAppDispatch();

  const [deleteLink, deleteLoading] = useHttpRequest(tabApi.deleteLink);
  const [getTabs] = useHttpRequest(tabApi.getTabs);

  const { activateModal, ...modalContext } = useActivateModal<
    AddEditDeleteModal,
    ILink
  >();

  const currentTab = useMemo(() => {
    const currTab = tabs?.find((tab) => tab.id === Number(tabId));
    return currTab ?? null;
  }, [tabs, tabId]);

  const handleAddClick = () => {
    activateModal(AddEditDeleteModal.AddEdit);
  };

  const getLinkLabel = (linkType: LinkType) => {
    switch (linkType) {
      case LinkType.Link:
        return "Посилання";
      case LinkType.Pdf:
        return "Файл";
      case LinkType.Video:
        return "Відео";
      default:
        return "Посилання";
    }
  };

  const handleDelete = async (link: ILink) => {
    const { isOk, message } = await deleteLink(link.id);
    const linklabel = getLinkLabel(link.contentType);
    if (!isOk) {
      dispatch(error({ message }));
    } else {
      dispatch(success({ message: `${linklabel} успішно видалено` }));
      const { isOk: isGetOk, message, data } = await getTabs();
      if (!isGetOk) {
        dispatch(error({ message }));
      } else {
        dispatch(updateTabs(data));
      }
    }
  };
  return (
    <>
      <ModalContextProvider context={{ activateModal, ...modalContext }}>
        {currentTab ? (
          <Card className={styles.card}>
            <CurrentTabAttachments tab={currentTab} />
            {isAdmin && (
              <Button variant={"text"} onClick={handleAddClick}>
                +Додати
              </Button>
            )}
          </Card>
        ) : (
          <EmptyState />
        )}
        <AddEditAttachmentModal />
        <DeleteAttachmentModal
          loading={deleteLoading}
          onDelete={handleDelete}
        />
      </ModalContextProvider>
    </>
  );
};
