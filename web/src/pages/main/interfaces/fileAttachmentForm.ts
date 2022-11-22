import { LinkType } from "api/tab-api/tab.api.types";

export interface FileAttachmentForm {
  fileLabel: string;
  fileLink?: string;
  file?: File;
  linkType: LinkType;
}
