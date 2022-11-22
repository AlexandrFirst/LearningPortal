import React, { useState } from "react";

import { AttachmentType } from "enums";

import { useHttpRequest } from "hooks/useHttpRequest";
import { FileUploadForm } from "../file-upload-form/FileUploadForm";

import { LinkType } from "api/tab-api/tab.api.types";
import { tabApi } from "api/tab-api/tab.api";

interface PdfAttachmentFormProps {
  file: File | null;
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
      file={file}
      onFileAdded={onFileAdded}
      onDelete={onDelete}
      accept={"application/pdf"}
      currentType={LinkType.Pdf}
      isLoading={false}
    />
  );
};
