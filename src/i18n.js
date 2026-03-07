import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";
import ur from "./locales/ur.json";
import ta from "./locales/ta.json";
import ml from "./locales/ml.json";

const savedLanguage =
  typeof window !== "undefined" ? localStorage.getItem("app_language") : null;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    ur: { translation: ur },
    ta: { translation: ta },
    ml: { translation: ml }
  },
  lng: savedLanguage || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  },
  returnEmptyString: false
});

export default i18n;
