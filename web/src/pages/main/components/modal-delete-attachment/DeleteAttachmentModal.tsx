import React from "react";

import { ILink } from "api/tab-api/tab.api.types";

import { Modal } from "components/modal/Modal";
import { CancelConfirmButtons } from "components/cancel-confirm-buttons/CancelConfirmButtons";
import { LoadingButton } from "components/loading-button/LoadingButton";

import { useModalContext } from "../modal-context/ModalContext";
import { AddEditDeleteModal } from "../../add-edit-delete-modals.enum";

interface DeleteAttachmentModalProps {
  onDelete?: (attachment: ILink) => void;
  loading?: boolean;
}

export const DeleteAttachmentModal: React.FC<DeleteAttachmentModalProps> = ({
  onDelete,
  loading,
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
      title={`Ви впевнені, що хочете видалити "${modalData?.description}"`}
      content={"Відновити дані більше не вдасться"}
      buttons={
        <CancelConfirmButtons
          onCancel={handleClose}
          confirmBtn={
            <LoadingButton
              loading={loading}
              color={"error"}
              onClick={handleDelete}
            >
              Видалити
            </LoadingButton>
          }
        />
      }
    />
  );
};
