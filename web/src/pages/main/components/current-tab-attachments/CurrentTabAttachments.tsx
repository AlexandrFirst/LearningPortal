import React from "react";

import { IAttachment } from "interfaces";

import { List, ListItem } from "@mui/material";
import { CurrentTabAttachmentItem } from "./CurrentTabAttachmentItem";
import { ITab } from "api/tab-api/tab.api.types";

interface CurrentTabLinksProps {
  tab: ITab;
  onEditClick?: (attachment: IAttachment) => void;
  onDeleteClick?: (attachment: IAttachment) => void;
}

export const CurrentTabAttachments: React.FC<CurrentTabLinksProps> = ({
  tab,
}) => {
  return (
    <List>
      {tab.links && tab.links.length > 0 ? (
        <>
          {tab.links?.map((link) => (
            <ListItem key={link.id}>
              <CurrentTabAttachmentItem link={link} />
            </ListItem>
          ))}
        </>
      ) : (
        <h1>Схоже, ще нічого немає</h1>
      )}
    </List>
  );
};
