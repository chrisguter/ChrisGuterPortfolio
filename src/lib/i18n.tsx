import { createContext, use, useMemo, type ReactNode } from "react";
import { content, type Content, type Locale } from "@/content";

interface LocaleValue {
  readonly locale: Locale;
  readonly t: Content;
}

const LocaleContext = createContext<LocaleValue | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const value = useMemo<LocaleValue>(() => ({ locale, t: content[locale] }), [locale]);
  return <LocaleContext value={value}>{children}</LocaleContext>;
}

export function useLocale(): LocaleValue {
  const value = use(LocaleContext);
  if (!value) {
    throw new Error("useLocale must be used inside a LocaleProvider");
  }
  return value;
}
