import React from "react";

import { IAttachment } from "interfaces";

import { Modal } from "components/modal/Modal";
import { CancelConfirmButtons } from "components/cancel-confirm-buttons/CancelConfirmButtons";
import { Button } from "components/button/Button";

import { useModalContext } from "../modal-context/ModalContext";
import { AddEditDeleteModal } from "../../add-edit-delete-modals.enum";

interface DeleteAttachmentModalProps {
  onDelete?: (attachment: IAttachment) => void;
}

export const DeleteAttachmentModal: React.FC<DeleteAttachmentModalProps> = ({
  onDelete,
}) => {
  const { deactivateModal, isActivatedModal, modalData, resetModalData } =
    useModalContext();

  const handleClose = () => {
    deactivateModal();
    setTimeout(() => {
      resetModalData();
    }, 300);
  };

  const handleDelete = () => {
    modalData && onDelete?.(modalData);
    handleClose();
  };

  return (
    <Modal
      open={isActivatedModal(AddEditDeleteModal.Delete)}
      onClose={handleClose}
      title={`Ви впевнені, що хочете видалити "${modalData?.label}"`}
      content={"Відновити дані більше не вдасться"}
      buttons={
        <CancelConfirmButtons
          onCancel={handleClose}
          confirmBtn={
            <Button color={"error"} onClick={handleDelete}>
              Видалити
            </Button>
          }
        />
      }
    />
  );
};
