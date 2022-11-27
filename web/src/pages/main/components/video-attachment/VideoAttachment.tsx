import React, { useState } from "react";
import styles from "./videoAttachment.module.scss";

import { Modal } from "components/modal/Modal";
import { Link } from "components/link/Link";
import { useMedia } from "hooks/useMedia";

import { ILink } from "api/tab-api/tab.api.types";
import { OuterLink } from "../../../../components/outer-link/OuterLink";

interface VideoAttachmentProps {
  attachment: ILink;
}

export const VideoAttachment: React.FC<VideoAttachmentProps> = ({
  attachment,
}) => {
  const { content, description } = attachment;
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

  //TODO: check why video does not appears if we try to show it in <video> tag
  const isOpenModalToShowVideo = false;

  return (
    <>
      {isOpenModalToShowVideo ? (
        <Link
          to={"#"}
          onClick={handleClick}
          linkClassName={styles.link}
          size={"lg"}
        >
          {description}
        </Link>
      ) : (
        <OuterLink link={content} label={description} size={"lg"} />
      )}
      <Modal
        open={isModalOpened}
        fullWidth={false}
        onClose={handleClose}
        title={description}
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
