import React from "react";
import styles from "./link.module.scss";

import cn from "classnames";
import { Link as RouterLink } from "react-router-dom";

import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { ButtonBase } from "@mui/material";

interface LinkProps extends MuiLinkProps {
  to: string;
  linkClassName?: string;
  isButton?: boolean;
  size?: "sm" | "lg";
}

export const Link: React.FC<LinkProps> = ({
  to,
  className,
  linkClassName,
  isButton,
  size = "sm",
  children,
  ...props
}) => {
  const muiLink = (
    <MuiLink
      {...props}
      className={cn(styles.link, linkClassName, { [styles.lg]: size === "lg" })}
      component={"span"}
    >
      {children}
    </MuiLink>
  );

  const routerLink = (
    <RouterLink to={to} className={styles.link}>
      {muiLink}
    </RouterLink>
  );
  const buttonLink = <button className={styles.btn}>{muiLink}</button>;

  return (
    <>
      <ButtonBase sx={{ p: 0.5, borderRadius: "8px" }} className={className}>
        {isButton ? buttonLink : routerLink}
      </ButtonBase>
    </>
  );
};
