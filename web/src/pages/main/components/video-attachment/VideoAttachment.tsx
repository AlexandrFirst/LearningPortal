import React, { useState } from "react";
import styles from "./videoAttachment.module.scss";

import { Modal } from "components/modal/Modal";
import { Link } from "components/link/Link";
import { useMedia } from "hooks/useMedia";

import { ILink } from "api/tab-api/tab.api.types";

interface VideoAttachmentProps {
  attachment: ILink;
}

export const VideoAttachment: React.FC<VideoAttachmentProps> = ({
  attachment,
}) => {
  // const { link, label } = attachment
  const { resourseId, content } = attachment;
  const { isMobile } = useMedia();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleClick = () => {
    setIsModalOpened(true);
  };

  const handleClose = () => {
    setIsModalOpened(false);
  };

  const width = isMobile ? 240 : 540;
  const height = isMobile ? 180 : 320;

  return (
    <>
      <Link
        to={"#"}
        onClick={handleClick}
        linkClassName={styles.link}
        size={"lg"}
      >
        {content || resourseId}
      </Link>
      <Modal
        open={isModalOpened}
        fullWidth={false}
        onClose={handleClose}
        title={content ?? ""}
        content={
          <video
            title={content}
            width={width}
            height={height}
            controls
            autoPlay
          />
        }
      />
    </>
  );
};
