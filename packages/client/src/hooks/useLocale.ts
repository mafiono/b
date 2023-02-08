import { useCallback, useMemo } from 'react';
import {
  useTranslation,
  LocaleKey, 
  localeShortNames,
  localeNames,
} from '@betnomi/libs/utils/i18n';

export const useLocale = () => {
  const { i18n } = useTranslation('main');
  const locale = useMemo(() => i18n.language, [i18n.language]);
  const setLocale = useCallback((loc: LocaleKey) => () => i18n.changeLanguage(loc), []);
  const label = useMemo(() => localeNames[i18n.language as LocaleKey], [i18n.language]);
  const shortLabel = useMemo(() => localeShortNames[i18n.language as LocaleKey], [i18n.language]);

  return {
    setLocale, label, shortLabel, locale,
  }; 
};
