import { IAttachment } from "./attachment.interface";

export interface ITab {
  label: string;
  items?: IAttachment[];
}
