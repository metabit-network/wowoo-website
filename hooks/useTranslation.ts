import { useState, useEffect } from "react";
import { Language } from "./useLanguage";

type TranslationData = Record<string, any>;

export function useTranslation(language: Language) {
  const [translations, setTranslations] = useState<TranslationData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/locales/${language}.json`);
        if (response.ok) {
          const data = await response.json();
          setTranslations(data);
        } else {
          // Fallback to English if translation file not found
          const fallbackResponse = await fetch("/locales/en.json");
          const fallbackData = await fallbackResponse.json();
          setTranslations(fallbackData);
        }
      } catch (error) {
        console.error("Failed to load translations:", error);
        // Fallback to English
        try {
          const fallbackResponse = await fetch("/locales/en.json");
          const fallbackData = await fallbackResponse.json();
          setTranslations(fallbackData);
        } catch (fallbackError) {
          console.error("Failed to load fallback translations:", fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === "string" ? value : key;
  };

  return {
    t,
    isLoading,
    translations,
  };
}
