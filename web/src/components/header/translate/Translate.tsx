import React, { MouseEvent, useState } from "react";

import IconButton from "@mui/material/IconButton";
import TranslateIcon from "@mui/icons-material/Translate";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Language } from "enums";

interface TranslateProps {
  onLangChanged?: (lang: Language) => void;
}

export const Translate: React.FC<TranslateProps> = ({ onLangChanged }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLang = (lang: Language) => {
    onLangChanged?.(lang);
    handleClose();
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <TranslateIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleChangeLang(Language.Ukr)}>
          {"Українська"}
        </MenuItem>
        <MenuItem onClick={() => handleChangeLang(Language.Eng)}>
          {"Англійська"}
        </MenuItem>
      </Menu>
    </>
  );
};
