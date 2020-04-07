import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

const fallbackLng: string = "en";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng,
    debug: false,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    react: {
      useSuspense: true
    }
  });

// https://www.i18next.com/overview/api#onlanguagechanged
i18n.on("languageChanged", (lng: string) => {
  localStorage.setItem("i18nextLng", lng);
});

export const getCurrentLanguage = (): string => {
  const language = localStorage.getItem("i18nextLng");
  const languageString = language ? language.split("-")[0] : fallbackLng;
  return languageString.toUpperCase();
};

export const setCurrentLanguage = (lang: string): void => {
  localStorage.setItem("i18nextLng", lang || fallbackLng);
  document.location.reload(true);
};

export default i18n;
