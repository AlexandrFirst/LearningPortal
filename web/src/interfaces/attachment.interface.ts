import { AttachmentType } from "../enums";
import { Id } from "./id.type";

export interface IAttachment {
  id: Id;
  type: AttachmentType;
  link: string;
  label?: string;
}
