import React from "react";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Button, Container } from "@mui/material";

import { AppRoute } from "routes";

import { useAppDispatch } from "hooks/redux";
import { useAuth } from "hooks/useAuth";

import { resetUser } from "store/slices/auth.slice";

import { User } from "./user/User";
import { Translate } from "./translate/Translate";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation("header");

  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(resetUser());
  };

  const handleLogoClick = () => {
    navigate(AppRoute.Main);
  };

  const handleLoginClick = () => {
    navigate(`/${AppRoute.Login}`);
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar style={{ padding: 0 }}>
          <Typography
            variant="h6"
            component="div"
            onClick={handleLogoClick}
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            {t("title")}
          </Typography>
          <Translate />
          {isAuth ? (
            <>
              <User onLogout={handleLogout} />
            </>
          ) : (
            <Button color={"inherit"} onClick={handleLoginClick}>
              Увійти
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
