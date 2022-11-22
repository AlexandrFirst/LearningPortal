import React, { useMemo } from "react";
import styles from "./main.module.scss";

import { useParams } from "react-router-dom";

import { useAppSelector } from "hooks/redux";
import { useActivateModal } from "hooks/useActivateModal";
import { useAuth } from "hooks/useAuth";

import { selectTabs } from "store/slices/tab.slice";
import { CurrentTabAttachments } from "pages/main/components/current-tab-attachments/CurrentTabAttachments";

import { Card } from "components/card/Card";
import { Button } from "components/button/Button";

import { AddEditDeleteModal } from "./add-edit-delete-modals.enum";

import { ModalContextProvider } from "./components/modal-context/ModalContext";
import { AddEditAttachmentModal } from "./components/modal-add-edit-attachment/AddEditAttachmentModal";
import { DeleteAttachmentModal } from "./components/modal-delete-attachment/DeleteAttachmentModal";
import { ILink } from "api/tab-api/tab.api.types";
import { FileAttachmentForm } from "./interfaces/fileAttachmentForm";

type TabParam = {
  tabId: string;
};

export const Main: React.FC = () => {
  const { tabId } = useParams<TabParam>();
  const { tabs } = useAppSelector(selectTabs);
  const { isAdmin } = useAuth();

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

  const handleConfirm = (data: FileAttachmentForm, e?: any) => {
    console.log("===data===", data);
    // const formData = new FormData();
    // formData.append("src", "some link");
  };

  return (
    <>
      <ModalContextProvider context={{ activateModal, ...modalContext }}>
        {currentTab && (
          <Card className={styles.card}>
            <CurrentTabAttachments tab={currentTab} />
            {isAdmin && (
              <Button variant={"text"} onClick={handleAddClick}>
                +Додати
              </Button>
            )}
          </Card>
        )}
        <AddEditAttachmentModal onConfirm={handleConfirm} />
        <DeleteAttachmentModal />
      </ModalContextProvider>
    </>
  );
};
