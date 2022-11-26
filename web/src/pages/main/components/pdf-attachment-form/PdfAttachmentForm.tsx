import React from "react";

import { FileUploadForm } from "../file-upload-form/FileUploadForm";

import { LinkType } from "api/tab-api/tab.api.types";
import { FileToUpload } from "../../interfaces/fileToUpload";

interface PdfAttachmentFormProps {
  file: FileToUpload | null;
  onFileAdded?: (f: File | null) => void;
  onDelete?: () => void;
}

export const PdfAttachmentForm: React.FC<PdfAttachmentFormProps> = ({
  onFileAdded,
  file,
  onDelete,
}) => {
  return (
    <FileUploadForm
      fileToUpload={file}
      onFileAdded={onFileAdded}
      onDelete={onDelete}
      accept={"application/pdf"}
      currentType={LinkType.Pdf}
      isLoading={false}
    />
  );
};
