import React from "react";
import styles from "./moveBackArrow.module.scss";

import { useNavigate } from "react-router-dom";

import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const MoveBackArrow: React.FC = () => {
  const navigate = useNavigate();

  const moveBack = () => {
    navigate(-1);
  };

  return (
    <IconButton onClick={moveBack} className={styles.back_icon}>
      <ArrowBackIcon color={"primary"} />
    </IconButton>
  );
};
