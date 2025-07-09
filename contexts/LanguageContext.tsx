"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Language } from "@/hooks/useLanguage";

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
  isLoading: boolean;
  supportedLanguages: Language[];
  languageNames: Record<Language, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const languageData = useLanguage();

  return (
    <LanguageContext.Provider value={languageData}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );
  }
  return context;
}
