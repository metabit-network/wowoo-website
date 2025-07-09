import { useState, useEffect } from "react";

export type Language = "en" | "ko" | "zh" | "ja";

const SUPPORTED_LANGUAGES: Language[] = ["en", "ko", "zh", "ja"];

const LANGUAGE_NAMES: Record<Language, string> = {
  en: "English",
  ko: "한국어",
  zh: "中文",
  ja: "日本語",
};

export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if language is stored in localStorage
    const storedLanguage = localStorage.getItem(
      "preferred-language"
    ) as Language;

    if (storedLanguage && SUPPORTED_LANGUAGES.includes(storedLanguage)) {
      setCurrentLanguage(storedLanguage);
    } else {
      // Detect browser language
      const browserLanguage = navigator.language.toLowerCase();

      // Map browser language to supported languages
      let detectedLanguage: Language = "en";

      if (browserLanguage.startsWith("ko")) {
        detectedLanguage = "ko";
      } else if (browserLanguage.startsWith("zh")) {
        detectedLanguage = "zh";
      } else if (browserLanguage.startsWith("ja")) {
        detectedLanguage = "ja";
      }

      setCurrentLanguage(detectedLanguage);
      localStorage.setItem("preferred-language", detectedLanguage);
    }

    setIsLoading(false);
  }, []);

  const changeLanguage = (language: Language) => {
    if (SUPPORTED_LANGUAGES.includes(language)) {
      setCurrentLanguage(language);
      localStorage.setItem("preferred-language", language);
    }
  };

  return {
    currentLanguage,
    changeLanguage,
    isLoading,
    supportedLanguages: SUPPORTED_LANGUAGES,
    languageNames: LANGUAGE_NAMES,
  };
}
