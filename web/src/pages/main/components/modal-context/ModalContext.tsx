import React, { createContext, PropsWithChildren, useContext } from "react";
import { ModalReturnType } from "interfaces";
import { AddEditDeleteModal } from "../../add-edit-delete-modals.enum";

import { ILink } from "api/tab-api/tab.api.types";

const ModalContext = createContext<ModalReturnType<AddEditDeleteModal, ILink>>({
  isActivatedModal: () => false,
  deactivateModal: () => null,
  modalData: null,
  resetModalData: () => null,
  activateModal: () => null,
  saveModalData: () => null,
});

interface ModalContextProviderProps extends PropsWithChildren {
  context: ModalReturnType<AddEditDeleteModal, ILink>;
}

export const ModalContextProvider: React.FC<ModalContextProviderProps> = ({
  context,
  children,
}) => {
  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
