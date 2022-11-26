import { useParams } from "react-router-dom";

import { DynamicTabParam } from "interfaces";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useHttpRequest } from "hooks/useHttpRequest";

import { error, success } from "store/slices/snackbar.slice";
import { updateTabs } from "store/slices/tab.slice";

import { ILink, LinkType } from "api/tab-api/tab.api.types";
import { tabApi } from "api/tab-api/tab.api";

import { LinkFormData } from "pages/main/enums/linkFormData";

import { FileAttachmentForm } from "pages/main/interfaces/fileAttachmentForm";
import { FileToUpload } from "pages/main/interfaces/fileToUpload";

type Params = {
  fileToUpload: FileToUpload | null;
  currentType: LinkType;
  handleClose?: () => void;
  currentAttachment?: ILink | null;
};

export const useAddEditLinks = ({
  fileToUpload,
  currentType,
  handleClose,
  currentAttachment,
}: Params) => {
  const dispatch = useAppDispatch();

  const [createLink, createLinkLoading] = useHttpRequest(tabApi.createLink);
  const [updateTabsRequest, updateTabsLoading] = useHttpRequest(
    tabApi.updateTabs
  );
  const [updateLink, updateLinkLoading] = useHttpRequest(tabApi.updateLink);
  const [getTabs] = useHttpRequest(tabApi.getTabs);

  const { tabId } = useParams<DynamicTabParam>();

  const tabs = useAppSelector((state) => state.tabs.tabs);

  const createFormData = (fileData: FileAttachmentForm) => {
    const formData = new FormData();
    formData.append(
      LinkFormData.Description,
      fileToUpload?.file ? fileToUpload.file?.name : fileData.fileLabel
    );
    formData.append(LinkFormData.LinkType, currentType.toString());
    !fileToUpload?.file &&
      formData.append(LinkFormData.Src, fileData.fileLink ?? "");
    fileToUpload?.file &&
      formData.append(LinkFormData.FileToUpload, fileToUpload.file);

    return formData;
  };

  const showSuccessMesssageUpdateTabsAndClose = async () => {
    dispatch(success({ message: "Дані були записані" }));
    const { data: newTabs, isOk, message } = await getTabs();
    if (!isOk) {
      dispatch(error({ message }));
      return;
    }
    dispatch(updateTabs(newTabs));
    handleClose?.();
  };

  const handleAddLink = async (fileData: FileAttachmentForm) => {
    const formData = createFormData(fileData);

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
      await showSuccessMesssageUpdateTabsAndClose();
    }
  };

  const handleUpdateLink = async (fileData: FileAttachmentForm) => {
    const formData = createFormData(fileData);

    const { isOk: isUpdateLinkOk, message: updateLinkMessage } =
      await updateLink({ id: currentAttachment?.id ?? 0, formData });

    if (!isUpdateLinkOk) {
      dispatch(error({ message: updateLinkMessage }));
      return;
    }

    await showSuccessMesssageUpdateTabsAndClose();
  };

  return {
    handleUpdateLink,
    handleAddLink,
    isLoading: createLinkLoading || updateTabsLoading || updateLinkLoading,
  };
};
