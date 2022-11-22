import React from "react";
import styles from "./linkAttachmentForm.module.scss";

import { Grid } from "@mui/material";

import { AttachmentType } from "enums";
import { Input } from "components/input/Input";

import { useModalContext } from "../modal-context/ModalContext";

export const LinkAttachmentForm: React.FC = () => {
  const { modalData } = useModalContext();

  const isTypeMatch = modalData?.type === AttachmentType.SimpleLink;

  return (
    <Grid className={styles.container}>
      <Input
        name={"linkLabel"}
        variant={"standard"}
        placeholder={"Назва посилання"}
        defaultValue={isTypeMatch ? modalData.label : undefined}
      />
      <Input
        name={"linkLink"}
        variant={"standard"}
        placeholder={"Посилання (обов'язково)"}
        className={styles.linkInput}
        defaultValue={isTypeMatch ? modalData.link : undefined}
        required
      />
    </Grid>
  );
};
