import React, { useState } from "react";

import { AttachmentType } from "enums";
import { FileUploadForm } from "../file-upload-form/FileUploadForm";
import { LinkType } from "../../../../api/tab-api/tab.api.types";

interface VideoAttachmentFormProps {
  file: File | null;
  onFileAdded?: (f: File | null) => void;
  onDelete?: () => void;
}

export const VideoAttachmentForm: React.FC<VideoAttachmentFormProps> = ({
  onDelete,
  file,
  onFileAdded,
}) => {
  return (
    <FileUploadForm
      file={file}
      onFileAdded={onFileAdded}
      onDelete={onDelete}
      isLoading={false}
      accept={"video"}
      currentType={LinkType.Video}
    />
  );
};
