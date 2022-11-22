import React from "react";
import { OuterLink } from "components/outer-link/OuterLink";

interface PdfAttachmentProps {
  label?: string;
  link: string;
}

export const PdfAttachment: React.FC<PdfAttachmentProps> = ({
  label,
  link,
}) => {
  return <OuterLink link={link} label={label} size={"lg"} />;
};
