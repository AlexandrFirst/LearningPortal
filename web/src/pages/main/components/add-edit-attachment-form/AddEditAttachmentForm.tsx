import React, { ChangeEvent, useState } from "react";
import styles from "./addEditAttachmentForm.module.scss";

import { useForm } from "react-hook-form";

import { FormWrapper } from "features/form-wrapper/formWrapper";
import { CancelConfirmButtons } from "components/cancel-confirm-buttons/CancelConfirmButtons";

import { AttachmentTypeRadio } from "../attachement-type-radio/AttachmentTypeRadio";
import { LinkAttachmentForm } from "../link-attachment-form/LinkAttachmentForm";
import { PdfAttachmentForm } from "../pdf-attachment-form/PdfAttachmentForm";
import { VideoAttachmentForm } from "../video-attachement-form/VideoAttachmentForm";
import { useModalContext } from "../modal-context/ModalContext";

import { ILink, LinkType } from "api/tab-api/tab.api.types";
import { FileAttachmentForm } from "../../interfaces/fileAttachmentForm";

interface AddEditAttachmentFormProps {
  currentAttachment?: ILink | null;
  onConfirm: (data: FileAttachmentForm) => void;
}

export const AddEditAttachmentForm: React.FC<AddEditAttachmentFormProps> = ({
  currentAttachment,
  onConfirm,
}) => {
  const { deactivateModal, resetModalData } = useModalContext();

  const [file, setFile] = useState<File | null>(null);
  const [currentType, setCurrentType] = useState(
    currentAttachment?.contentType ?? LinkType.Pdf
  );

  const methods = useForm<FileAttachmentForm>();
  const { handleSubmit, setValue } = methods;

  const handleFileAdded = (file: File | null) => {
    setFile(file);
  };

  const handleDelete = () => setFile(null);

  const handleChangeAttachmentType = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setCurrentType(Number(value) as LinkType);
    setValue("linkType", currentType);
  };

  const handleClose = () => {
    deactivateModal();
    setTimeout(() => {
      resetModalData();
    }, 300);
  };

  const handleConfirm = () => {
    if (file) {
      onConfirm({ fileLabel: file.name, file, linkType: currentType });
      return;
    }
    return handleSubmit(onConfirm)();
  };

  return (
    <FormWrapper methods={methods}>
      <AttachmentTypeRadio
        currentValue={currentType}
        onChange={handleChangeAttachmentType}
      />
      {currentType === LinkType.Link && <LinkAttachmentForm />}
      {currentType === LinkType.Pdf && (
        <PdfAttachmentForm
          file={file}
          onDelete={handleDelete}
          onFileAdded={handleFileAdded}
        />
      )}
      {currentType === LinkType.Video && (
        <VideoAttachmentForm
          file={file}
          onDelete={handleDelete}
          onFileAdded={handleFileAdded}
        />
      )}
      <CancelConfirmButtons
        className={styles.btns}
        onCancel={handleClose}
        onSubmit={handleConfirm}
      />
    </FormWrapper>
  );
};
