import React from "react";

import { Modal } from "components/modal/Modal";

import { AddEditDeleteModal } from "../../add-edit-delete-modals.enum";

import { useModalContext } from "../modal-context/ModalContext";
import { AddEditAttachmentForm } from "../add-edit-attachment-form/AddEditAttachmentForm";

interface AddEditAttachmentModalProps {}

export const AddEditAttachmentModal: React.FC<
  AddEditAttachmentModalProps
> = () => {
  const { deactivateModal, isActivatedModal, modalData, resetModalData } =
    useModalContext();

  const handleClose = () => {
    deactivateModal();
    setTimeout(() => {
      resetModalData();
    }, 300);
  };

  const isEdit = modalData !== null;
  const title = !isEdit
    ? "Додати"
    : `Редагувати "${modalData?.description ?? ""}"`.trim();

  return (
    <Modal
      open={isActivatedModal(AddEditDeleteModal.AddEdit)}
      onClose={handleClose}
      title={title}
      content={<AddEditAttachmentForm currentAttachment={modalData} />}
    />
  );
};
