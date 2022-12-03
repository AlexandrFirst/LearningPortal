import React from "react";

import { Modal } from "components/modal/Modal";
import { useActivateModal } from "hooks/useActivateModal";

import { CurrentTestModal } from "../../enums";
import { SubmitTestForm } from "../submit-test-form/SubmitTestForm";

type SubmitModalProps = ReturnType<
  typeof useActivateModal<CurrentTestModal>
> & {};

export const SubmitModal: React.FC<SubmitModalProps> = ({
  isActivatedModal,
  deactivateModal,
}) => {
  return (
    <Modal
      open={isActivatedModal(CurrentTestModal.Submit)}
      onClose={deactivateModal}
      title={"Уведіть свої дані, щоб зберегти результати"}
      content={<SubmitTestForm deactivateModal={deactivateModal} />}
    />
  );
};
