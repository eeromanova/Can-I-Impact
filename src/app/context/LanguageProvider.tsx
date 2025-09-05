'use client';
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import translations from '@/shared/model/data.json';

export type SupportedLang = keyof typeof translations;
type TranslationStructure = (typeof translations)[SupportedLang];

export const SUPPORTED_LANGUAGES = Object.keys(translations) as SupportedLang[];

type Props = {
  children: ReactNode;
  savedLang: SupportedLang;
};

// рекурсивно получаем ключи
type DeepKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${DeepKeyOf<T[K]>}` | K
          : K
        : never;
    }[keyof T]
  : never;

type TranslationKey = DeepKeyOf<TranslationStructure>;

// значение перевода может быть:
type TranslationValue = string | string[] | Record<string, unknown> | Record<string, unknown>[];

type LanguageContextValue = {
  lang: SupportedLang;
  switchLanguage: (newLang: SupportedLang) => void;
  t: (key: TranslationKey) => TranslationValue | undefined;
};

const getNestedValue = (obj: TranslationStructure, key: string): TranslationValue | undefined => {
  const keys = key.split('.');
  let current: unknown = obj;

  for (const k of keys) {
    if (typeof current !== 'object' || current === null || !(k in current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[k];
  }

  return current as TranslationValue;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children, savedLang }: Props) => {
  const [lang, setLang] = useState<SupportedLang>(savedLang);

  const t = useCallback(
    (key: TranslationKey): TranslationValue | undefined => {
      const translation = getNestedValue(translations[lang], key);
      return translation ?? undefined;
    },
    [lang]
  );

  const switchLanguage = (newLang: SupportedLang) => {
    document.cookie = `lang=${newLang}; path=/; max-age=31536000`;
    setLang(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');

  const tString = (key: TranslationKey) => {
    const val = context.t(key);
    return typeof val === 'string' ? val : '';
  };

  const tArray = (key: TranslationKey): string[] => {
    const val = context.t(key);
    if (Array.isArray(val) && val.every((x) => typeof x === 'string')) {
      return val as string[];
    }
    return [];
  };

  const tObjectArray = (key: TranslationKey): Record<string, unknown>[] => {
    const val = context.t(key);
    if (Array.isArray(val) && val.every((x) => typeof x === 'object' && x !== null)) {
      return val as Record<string, unknown>[];
    }
    if (typeof val === 'object' && val !== null) {
      return [val as Record<string, unknown>];
    }
    return [];
  };

  return { ...context, tString, tArray, tObjectArray };
};
