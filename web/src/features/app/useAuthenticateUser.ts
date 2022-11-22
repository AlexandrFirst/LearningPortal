import { useEffect } from "react";
import i18next from "i18next";
import { Language, LocalstorageKey } from "enums";

export const useAuthenticateUser = () => {
  // const { user } = useAppSelector(selectAuth);

  const getLoggedInUser = async () => {
    // const language = localStorage.getItem(LocalstorageKey.Lang) ?? Language.Ukr;
    // setUserLanguage(language as Language);
    // try {
    //   dispatch(showLoading());
    //   const { data } = await $api.get<AppUser>("user");
    //
    //   dispatch(setUser(data));
    //   setUserLanguage(data.lang);
    // } catch (e: any) {
    //   dispatch(logOutUser());
    //   dispatch(setError(e.message));
    // } finally {
    //   dispatch(hideLoading());
    // }
  };

  const setUserLanguage = (lang: Language | null) => {
    console.log("===lang===", lang);
    i18next.changeLanguage(lang ?? Language.Ukr);
  };

  useEffect(() => {
    getLoggedInUser();
  }, []);
};
