import { createContext, useContext, useState, useEffect } from "react";
import type { Lang } from "./translations";

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: "en", setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem("hp-lang");
    return (stored === "fr" || stored === "es") ? stored : "en";
  });

  const setLang = (l: Lang) => {
    localStorage.setItem("hp-lang", l);
    setLangState(l);
  };

  // Keep <html lang="..."> in sync for screen readers and SEO
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
