import React, { useRef, useState } from "react";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";

interface EditDeleteButtonsProps {
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

export const EditDeleteButtons: React.FC<EditDeleteButtonsProps> = ({
  onEditClick,
  onDeleteClick,
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleMenuItemClick = () => {
    onDeleteClick?.();
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup ref={anchorRef} aria-label="split button" sx={{ ml: 2 }}>
        <Button onClick={onEditClick} variant={"text"}>
          Редагувати
        </Button>
        <Button
          size="small"
          aria-expanded={open ? "true" : undefined}
          onClick={handleToggle}
          variant={"text"}
          sx={{ p: 0 }}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Button onClick={handleMenuItemClick} color={"error"}>
                  {"Видалити"}
                </Button>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
