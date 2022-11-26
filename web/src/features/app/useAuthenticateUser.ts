import { useEffect } from "react";
import i18next from "i18next";
import { Language, LocalstorageKey } from "enums";

export const useAuthenticateUser = () => {
  // const { user } = useAppSelector(selectAuth);

  const setUserLanguage = async () => {
    const language = localStorage.getItem(LocalstorageKey.Lang);
    i18next.changeLanguage(language ?? Language.Ukr);
  };

  useEffect(() => {
    setUserLanguage();
  }, []);
};
