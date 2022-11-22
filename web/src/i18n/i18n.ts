import i18next from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import { Language } from "enums";

// const Resource_Path =
//   process.env.NODE_ENV == 'development'
//     ? '/locales/{{lng}}/{{ns}}.json'
//     : process.env.REACT_APP_BASE_URL + '/ui/locales/{{lng}}/{{ns}}.json'
const loadPath = "/locales/{{lng}}/{{ns}}.json";

i18next
  .use(initReactI18next)
  .use(Backend)
  .init({
    backend: { loadPath },
    supportedLngs: [Language.Ukr, Language.Eng],
    nonExplicitSupportedLngs: false,
    ns: ["common", "header"],
    defaultNS: "common",
    fallbackNS: "common",

    // interpolation: {
    //   escapeValue: false,
    // },
    fallbackLng: Language.Ukr,
    lowerCaseLng: true,
  });

export default i18next;
