import React from "react";

import { Grid } from "@mui/material";

import { OuterLink } from "components/outer-link/OuterLink";
import { useAuth } from "hooks/useAuth";

import { AttachmentIcon } from "../attachment-icon/AttachmentIcon";
import { VideoAttachment } from "../video-attachment/VideoAttachment";
import { PdfAttachment } from "../pdf-attachment/PdfAttachment";
import { EditDeleteButtons } from "../edit-delete-buttons/EditDeleteButtons";
import { AddEditDeleteModal } from "../../add-edit-delete-modals.enum";
import { useModalContext } from "../modal-context/ModalContext";

import { ILink, LinkType } from "api/tab-api/tab.api.types";

interface CurrentTabLinksItemProps {
  link: ILink;
}

export const CurrentTabAttachmentItem: React.FC<CurrentTabLinksItemProps> = ({
  link,
}) => {
  const { contentType, content, description } = link;
  const { isAdmin } = useAuth();

  const { activateModal, saveModalData } = useModalContext();

  const renderAttachment = () => {
    switch (contentType) {
      case LinkType.Video:
        return <VideoAttachment attachment={link} />;
      case LinkType.Pdf:
        return <PdfAttachment link={content} label={description} />;
      case LinkType.Link:
        return <OuterLink label={description} link={content} size={"lg"} />;
      default:
        return "Didn't match";
    }
  };

  const handleEditClick = () => {
    activateModal(AddEditDeleteModal.AddEdit);
    saveModalData(link);
  };

  const handleDeleteClick = () => {
    activateModal(AddEditDeleteModal.Delete);
    saveModalData(link);
  };

  return (
    <>
      <Grid container alignItems={"center"} sx={{ mt: 2 }}>
        <AttachmentIcon type={contentType} />
        {renderAttachment()}
        {isAdmin && (
          <EditDeleteButtons
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        )}
      </Grid>
    </>
  );
};
