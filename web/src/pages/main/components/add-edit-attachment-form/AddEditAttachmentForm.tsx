import React, { ChangeEvent, useState } from "react";
import styles from "./addEditAttachmentForm.module.scss";

import { useForm, useWatch } from "react-hook-form";

import { FormWrapper } from "features/form-wrapper/formWrapper";
import { CancelConfirmButtons } from "components/cancel-confirm-buttons/CancelConfirmButtons";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useHttpRequest } from "hooks/useHttpRequest";

import { error, success } from "store/slices/snackbar.slice";

import { ILink, LinkType } from "api/tab-api/tab.api.types";
import { tabApi } from "api/tab-api/tab.api";

import { AttachmentTypeRadio } from "../attachement-type-radio/AttachmentTypeRadio";
import { LinkAttachmentForm } from "../link-attachment-form/LinkAttachmentForm";
import { PdfAttachmentForm } from "../pdf-attachment-form/PdfAttachmentForm";
import { VideoAttachmentForm } from "../video-attachement-form/VideoAttachmentForm";
import { useModalContext } from "../modal-context/ModalContext";

import { FileAttachmentForm } from "../../interfaces/fileAttachmentForm";
import { FileToUpload } from "../../interfaces/fileToUpload";
import { useParams } from "react-router-dom";
import { updateTabs } from "../../../../store/slices/tab.slice";

type DynamicTabParam = {
  tabId: string;
};

interface AddEditAttachmentFormProps {
  currentAttachment?: ILink | null;
}

export const AddEditAttachmentForm: React.FC<AddEditAttachmentFormProps> = ({
  currentAttachment,
}) => {
  const [createLink, createLinkLoading] = useHttpRequest(tabApi.createLink);
  const [updateTabsRequest, updateTabsLoading] = useHttpRequest(
    tabApi.updateTabs
  );
  const [getTabs] = useHttpRequest(tabApi.getTabs);

  const { tabId } = useParams<DynamicTabParam>();

  const tabs = useAppSelector((state) => state.tabs.tabs);

  const { deactivateModal, resetModalData } = useModalContext();

  const [fileToUpload, setFileToUpload] = useState<FileToUpload | null>(null);
  const [currentType, setCurrentType] = useState(
    currentAttachment?.contentType ?? LinkType.Pdf
  );

  const dispatch = useAppDispatch();

  const methods = useForm<FileAttachmentForm>();
  const { handleSubmit, control } = methods;
  const fileLink = useWatch({ name: "fileLink", control });

  const handleFileAdded = (file: File | null) => {
    setFileToUpload({ type: currentType, file });
  };

  const handleDelete = () => setFileToUpload(null);

  const handleChangeAttachmentType = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setCurrentType(Number(value) as LinkType);
  };

  const handleClose = () => {
    deactivateModal();
    setTimeout(() => {
      resetModalData();
    }, 300);
  };

  const handleConfirm = async (fileData: FileAttachmentForm) => {
    const formData = new FormData();
    formData.append(
      "Description",
      fileToUpload?.file ? fileToUpload.file?.name : fileData.fileLabel
    );
    formData.append("LinkType", currentType.toString());
    !fileToUpload?.file && formData.append("Src", fileData.fileLink ?? "");
    fileToUpload?.file && formData.append("FileToUpload", fileToUpload.file);

    const {
      isOk: isCreateLinkOk,
      data,
      message: createLinkMessage,
    } = await createLink(formData);
    if (!isCreateLinkOk) {
      dispatch(error({ message: createLinkMessage }));
      return;
    }
    const tabsToUpdate = tabs?.map((t) => ({
      ...t,
      links: t.links.map((l) => l.id),
    }));
    const curTab = tabsToUpdate?.find((t) => t.id === Number(tabId));
    curTab?.links.push(data.id);
    const { isOk: isUpdateTabOk, message: updateTabMessage } =
      await updateTabsRequest({ tabs: tabsToUpdate ?? [] });
    if (!isUpdateTabOk) {
      dispatch(error({ message: updateTabMessage }));
    } else {
      dispatch(success({ message: "Дані були записані" }));
      const { data: newTabs } = await getTabs();
      dispatch(updateTabs(newTabs));
      handleClose();
    }
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
          file={fileToUpload}
          onDelete={handleDelete}
          onFileAdded={handleFileAdded}
        />
      )}
      {currentType === LinkType.Video && (
        <VideoAttachmentForm
          file={fileToUpload}
          onDelete={handleDelete}
          onFileAdded={handleFileAdded}
        />
      )}
      <CancelConfirmButtons
        loading={createLinkLoading || updateTabsLoading}
        disabledConfirm={!fileLink && !fileToUpload}
        className={styles.btns}
        onCancel={handleClose}
        onSubmit={handleSubmit(handleConfirm)}
      />
    </FormWrapper>
  );
};
