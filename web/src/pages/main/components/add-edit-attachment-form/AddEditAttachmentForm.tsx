import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./addEditAttachmentForm.module.scss";
import { useForm, useWatch } from "react-hook-form";

import { FormWrapper } from "features/form-wrapper/formWrapper";
import { CancelConfirmButtons } from "components/cancel-confirm-buttons/CancelConfirmButtons";

import { ILink, LinkType } from "api/tab-api/tab.api.types";

import { AttachmentTypeRadio } from "../attachement-type-radio/AttachmentTypeRadio";
import { LinkAttachmentForm } from "../link-attachment-form/LinkAttachmentForm";
import { PdfAttachmentForm } from "../pdf-attachment-form/PdfAttachmentForm";
import { VideoAttachmentForm } from "../video-attachement-form/VideoAttachmentForm";
import { useModalContext } from "../modal-context/ModalContext";

import { FileAttachmentForm } from "../../interfaces/fileAttachmentForm";
import { FileToUpload } from "../../interfaces/fileToUpload";
import { useAddEditLinks } from "./useAddEditLinks";

interface AddEditAttachmentFormProps {
  currentAttachment?: ILink | null;
}

export const AddEditAttachmentForm: React.FC<AddEditAttachmentFormProps> = ({
  currentAttachment,
}) => {
  const isEdit = !!currentAttachment;

  const { deactivateModal, resetModalData } = useModalContext();

  const [fileToUpload, setFileToUpload] = useState<FileToUpload | null>(null);
  const [currentType, setCurrentType] = useState(
    currentAttachment?.contentType ?? LinkType.Pdf
  );

  const methods = useForm<FileAttachmentForm>();
  const { handleSubmit, control, setValue } = methods;
  const fileLink = useWatch({ name: "fileLink", control });

  const handleClose = () => {
    deactivateModal();
    setTimeout(() => {
      resetModalData();
    }, 300);
  };

  const { handleUpdateLink, handleAddLink, isLoading } = useAddEditLinks({
    currentAttachment,
    currentType,
    fileToUpload,
    handleClose,
  });

  const handleFileAdded = (file: File | null) => {
    setFileToUpload({ type: currentType, file });
  };

  const handleDeleteFile = () => setFileToUpload(null);

  const handleChangeAttachmentType = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setCurrentType(Number(value) as LinkType);
  };

  const handleConfirm = async (fileData: FileAttachmentForm) => {
    isEdit ? handleUpdateLink(fileData) : handleAddLink(fileData);
  };

  useEffect(() => {
    if (isEdit) {
      setValue("fileLink", currentAttachment?.content);
      setValue("fileLabel", currentAttachment.description);
    }
  }, [currentAttachment, currentType]);

  return (
    <FormWrapper methods={methods}>
      <AttachmentTypeRadio
        currentValue={currentType}
        onChange={handleChangeAttachmentType}
      />
      {currentType === LinkType.Link && <LinkAttachmentForm />}
      {currentType === LinkType.Pdf && (
        <PdfAttachmentForm
          file={fileToUpload}
          onDelete={handleDeleteFile}
          onFileAdded={handleFileAdded}
        />
      )}
      {currentType === LinkType.Video && (
        <VideoAttachmentForm
          file={fileToUpload}
          onDelete={handleDeleteFile}
          onFileAdded={handleFileAdded}
        />
      )}
      <CancelConfirmButtons
        loading={isLoading}
        disabledConfirm={!fileLink && !fileToUpload}
        className={styles.btns}
        onCancel={handleClose}
        onSubmit={handleSubmit(handleConfirm)}
      />
    </FormWrapper>
  );
};
