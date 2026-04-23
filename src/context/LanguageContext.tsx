"use client";

import React, { createContext, useContext, useState } from "react";

type Language = "English" | "French";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  English: {
    search: "Search...",
    available_pitches: "Available Pitches",
    location: "Location",
    add_new: "Add New",
    notifications: "Notifications",
  },
  French: {
    search: "Rechercher...",
    available_pitches: "Terrains Disponibles",
    location: "Emplacement",
    add_new: "Ajouter",
    notifications: "Notifications",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("English");

  const t = (key: string) => {
    return (
      translations[language][key as keyof (typeof translations)["English"]] ||
      key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
