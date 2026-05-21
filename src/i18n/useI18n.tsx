import { useCallback, useState } from 'react';
import i18n from './index';

export function useI18n() {
  const [locale, setLocaleState] = useState(i18n.getLocale());

  const t = useCallback((key: string, ...args: any[]) => i18n.t(key, ...args), []);

  const setLocale = useCallback((loc: string) => {
    i18n.setLocale(loc);
    setLocaleState(i18n.getLocale());
  }, []);

  return { t, locale, setLocale } as const;
}

export default useI18n;
