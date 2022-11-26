import { LinkType } from "../../../api/tab-api/tab.api.types";

export type FileToUpload = {
  file: File | null;
  type: LinkType;
};
