import React from "react";

import { Modal } from "components/modal/Modal";
import { AddUpdateTabList } from "interfaces";

import { TabList } from "./tabList";

interface AddNewTabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddUpdateTabList) => void;
}

export const AddNewTabModal: React.FC<AddNewTabModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={"Додати/Змінити конфігурацію"}
      content={<TabList onCancel={onClose} onSubmit={onSubmit} />}
    />
  );
};
