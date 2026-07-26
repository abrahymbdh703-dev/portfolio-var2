import { createContext, useContext } from 'react';
import { translations, type Locale, type TranslationKey } from './translations';

export type { Locale };

export interface LanguageContextValue {
  locale: Locale;
  dir: 'rtl' | 'ltr';
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

export const LanguageContext = createContext<LanguageContextValue>({
  locale: 'ar',
  dir: 'rtl',
  setLocale: () => {},
  t: (key: TranslationKey) => translations.ar[key],
});

export function useLanguage() {
  return useContext(LanguageContext);
}
