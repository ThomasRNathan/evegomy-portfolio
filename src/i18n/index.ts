import { createContext, useContext, useEffect, useMemo, useState, type ReactNode, createElement } from "react";

export const LOCALES = ["fr", "en", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABEL: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  es: "ES",
};

type Ctx = { locale: Locale; setLocale: (l: Locale) => void };
const LocaleContext = createContext<Ctx | null>(null);

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "fr";
  const url = new URL(window.location.href);
  const qp = url.searchParams.get("lang");
  if (qp && (LOCALES as readonly string[]).includes(qp)) return qp as Locale;
  const stored = window.localStorage.getItem("locale");
  if (stored && (LOCALES as readonly string[]).includes(stored)) return stored as Locale;
  const nav = window.navigator.language.slice(0, 2).toLowerCase();
  if ((LOCALES as readonly string[]).includes(nav)) return nav as Locale;
  return "fr";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("locale", locale);
  }, [locale]);

  const value = useMemo<Ctx>(() => ({ locale, setLocale: setLocaleState }), [locale]);
  return createElement(LocaleContext.Provider, { value }, children);
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
