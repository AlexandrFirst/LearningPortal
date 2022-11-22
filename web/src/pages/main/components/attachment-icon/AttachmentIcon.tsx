import React from "react";
import styles from "./attachmentIcon.module.scss";

import YouTubeIcon from "@mui/icons-material/YouTube";
import AddLinkIcon from "@mui/icons-material/AddLink";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import { Grid } from "@mui/material";

import { LinkType } from "api/tab-api/tab.api.types";

interface AttachmentIconProps {
  type: LinkType;
}

export const AttachmentIcon: React.FC<AttachmentIconProps> = ({ type }) => {
  return (
    <Grid sx={{ mr: 2 }}>
      {type === LinkType.Pdf && (
        <PictureAsPdfRoundedIcon className={styles.icon} fontSize={"inherit"} />
      )}
      {type === LinkType.Video && (
        <YouTubeIcon className={styles.icon} fontSize={"inherit"} />
      )}
      {type === LinkType.Link && (
        <AddLinkIcon className={styles.icon} fontSize={"inherit"} />
      )}
    </Grid>
  );
};
