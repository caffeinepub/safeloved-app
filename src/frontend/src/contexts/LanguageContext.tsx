import {
  type Language,
  type Translations,
  getTranslations,
} from "@/lib/translations";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

const LANGUAGE_STORAGE_KEY = "safeloved_language";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      return (stored as Language) || "tr";
    } catch {
      return "tr";
    }
  });

  const [t, setT] = useState<Translations>(() => getTranslations(language));

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setT(getTranslations(lang));
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (error) {
      console.error("Error saving language preference:", error);
    }
  };

  useEffect(() => {
    setT(getTranslations(language));
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
