import React from "react";
import styles from "./outerLink.module.scss";

import { ButtonBase } from "@mui/material";
import cn from "classnames";

interface OuterLinkProps {
  link: string;
  label?: string;
  size?: "sm" | "lg";
  className?: string;
}

export const OuterLink: React.FC<OuterLinkProps> = ({
  link,
  label,
  size = "sm",
  className,
}) => {
  return (
    <ButtonBase
      sx={{ p: 0.5, borderRadius: "8px" }}
      className={styles.buttonBase}
    >
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className={cn(styles.link, className, { [styles.lg]: size === "lg" })}
      >
        {label || link}
      </a>
    </ButtonBase>
  );
};
