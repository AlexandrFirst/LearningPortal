import { useLocation } from "react-router-dom";
import { AppRoute } from "../routes";

export const useIsEdit = () => {
  const { pathname } = useLocation();

  return pathname.includes(AppRoute.Edit);
};
