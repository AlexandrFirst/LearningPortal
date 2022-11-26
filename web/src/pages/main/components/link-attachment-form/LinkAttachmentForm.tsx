import React from "react";
import styles from "./linkAttachmentForm.module.scss";

import { Grid } from "@mui/material";

import { LinkType } from "api/tab-api/tab.api.types";
import { Input } from "components/input/Input";

import { useModalContext } from "../modal-context/ModalContext";

export const LinkAttachmentForm: React.FC = () => {
  const { modalData } = useModalContext();

  const isTypeMatch = modalData?.contentType === LinkType.Link;

  return (
    <Grid className={styles.container}>
      <Input
        name={"fileLabel"}
        variant={"standard"}
        placeholder={"Назва посилання"}
        defaultValue={isTypeMatch ? modalData.description : undefined}
      />
      <Input
        name={"fileLink"}
        variant={"standard"}
        placeholder={"Посилання (обов'язково)"}
        className={styles.linkInput}
        defaultValue={isTypeMatch ? modalData.content : undefined}
        required
      />
    </Grid>
  );
};
