import en from '../../public/locales/en/mail.json';
import zh from '../../public/locales/zh/mail.json';

// ----------------------------------------------------------------------

const locales: Record<string, Record<string, string>> = {
  'en': en,
  'zh': zh
}

const getLocales = () => {
  return locales
};

const useLocale = (locale: string) => {
  return locales[locale] ? locales[locale] : {}
}

export { getLocales, useLocale };
