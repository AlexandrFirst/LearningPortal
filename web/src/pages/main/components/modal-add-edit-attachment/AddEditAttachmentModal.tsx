import React from "react";

import { Modal } from "components/modal/Modal";

import { AddEditDeleteModal } from "../../add-edit-delete-modals.enum";

import { useModalContext } from "../modal-context/ModalContext";
import { AddEditAttachmentForm } from "../add-edit-attachment-form/AddEditAttachmentForm";
import { FileAttachmentForm } from "../../interfaces/fileAttachmentForm";

interface AddEditAttachmentModalProps {
  onConfirm?: (data: FileAttachmentForm) => void;
}

export const AddEditAttachmentModal: React.FC<AddEditAttachmentModalProps> = ({
  onConfirm,
}) => {
  const { deactivateModal, isActivatedModal, modalData, resetModalData } =
    useModalContext();

  const handleClose = () => {
    deactivateModal();
    setTimeout(() => {
      resetModalData();
    }, 300);
  };

  const handleConfirm = (data: FileAttachmentForm) => {
    onConfirm?.(data);
    handleClose();
  };

  const isEdit = modalData !== null;
  const title = !isEdit
    ? "Додати"
    : `Редагувати "${modalData?.content ?? ""}"`.trim();

  return (
    <Modal
      open={isActivatedModal(AddEditDeleteModal.AddEdit)}
      onClose={handleClose}
      title={title}
      content={
        <AddEditAttachmentForm
          currentAttachment={modalData}
          onConfirm={handleConfirm}
        />
      }
    />
  );
};
