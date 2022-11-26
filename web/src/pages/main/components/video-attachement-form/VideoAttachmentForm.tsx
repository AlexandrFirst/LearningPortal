import React from "react";

import { FileUploadForm } from "../file-upload-form/FileUploadForm";
import { LinkType } from "../../../../api/tab-api/tab.api.types";
import { FileToUpload } from "../../interfaces/fileToUpload";

interface VideoAttachmentFormProps {
  file: FileToUpload | null;
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
      fileToUpload={file}
      onFileAdded={onFileAdded}
      onDelete={onDelete}
      isLoading={false}
      accept={"video/mp4,video/x-m4v,video/*"}
      currentType={LinkType.Video}
    />
  );
};
