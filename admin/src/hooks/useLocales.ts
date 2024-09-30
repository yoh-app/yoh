import { useTranslation } from 'next-i18next';
// @mui
import { enUS, zhTW } from '@mui/material/locale';
import { useRouter } from 'next/router'

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg'
  },
  {
    label: '中文',
    value: 'zh',
    systemValue: zhTW,
    icon: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/TW.svg'
  },
];

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();

  const { locale } = useRouter();

  const currentLang = locale ? LANGS.find((o) => o.value === locale)! : LANGS[0];
  const handleChangeLanguage = (newlang: string) => {
    i18n.changeLanguage(newlang);
  };

  // const { i18n, t: translate } = useTranslation();
  // const langStorage = localStorage.getItem('i18nextLng');
  // const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[1];

  // const handleChangeLanguage = (newlang: string) => {
  //   i18n.changeLanguage(newlang);
  // };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS,
  };
}
