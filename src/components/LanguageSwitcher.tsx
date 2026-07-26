import { useCallback, useEffect, useMemo, useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import {
  LanguageContext,
  useLanguage,
  type LanguageContextValue,
} from '@/lib/language';
import {
  translations,
  localeNames,
  localeDir,
  type Locale,
  type TranslationKey,
} from '@/lib/translations';

const STORAGE_KEY = 'portfolio-locale';

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'ar';
  const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && stored in translations) return stored;
  return 'ar';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  const dir = localeDir[locale];

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = dir;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale, dir]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);
  const t = useCallback(
    (key: TranslationKey) => translations[locale][key] ?? translations.ar[key],
    [locale]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, dir, setLocale, t }),
    [locale, dir, setLocale, t]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-lang-switcher]')) setOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [open]);

  return (
    <div className="relative" data-lang-switcher>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-all duration-200"
        style={{
          border: '1.5px solid var(--border)',
          background: 'var(--primary-bg)',
          color: 'var(--text-head)',
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="h-4 w-4" style={{ color: 'var(--primary)' }} />
        <span className="hidden sm:inline">{localeNames[locale].native}</span>
        <span className="sm:hidden">{localeNames[locale].flag}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          style={{ color: 'var(--text-dim2)' }}
        />
      </button>

      {open && (
        <ul
          className="absolute end-0 mt-2 w-44 overflow-hidden rounded-xl p-1 shadow-lg"
          style={{
            background: 'var(--card-bg)',
            border: '1.5px solid var(--border)',
            backdropFilter: 'blur(20px)',
            zIndex: 100,
          }}
          role="listbox"
        >
          {(Object.keys(localeNames) as Locale[]).map((loc) => (
            <li key={loc}>
              <button
                type="button"
                onClick={() => { setLocale(loc); setOpen(false); }}
                className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
                style={{
                  background: loc === locale ? 'var(--primary-bg)' : 'transparent',
                  color: loc === locale ? 'var(--primary)' : 'var(--text-base)',
                }}
                role="option"
                aria-selected={loc === locale}
              >
                <span className="flex items-center gap-2">
                  <span>{localeNames[loc].flag}</span>
                  <span>{localeNames[loc].native}</span>
                </span>
                {loc === locale && <Check className="h-4 w-4" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
