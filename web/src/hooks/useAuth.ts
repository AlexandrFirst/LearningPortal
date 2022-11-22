import { selectAuth } from "store/slices/auth.slice";
import { UserRole } from "enums";

import { useAppSelector } from "./redux";

export const useAuth = () => {
  const { user } = useAppSelector(selectAuth);

  return {
    user,
    isAuth: user !== null,
    isAdmin: user?.userRole === UserRole.Admin,
  };
};
