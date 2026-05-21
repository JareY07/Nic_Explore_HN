import es from './locales/es';
import en from './locales/en';
import ca from './locales/ca';
import { APP_STRINGS } from '../constants/shared';

type AnyObj = Record<string, any>;

const LOCALES: Record<string, AnyObj> = {
  es: es.translation || {},
  en: en.translation || {},
  ca: ca.translation || {},
};

let currentLocale = 'es';

function getFromObject(obj: AnyObj | undefined, path: string) {
  if (!obj) return undefined;
  const parts = path.split('.');
  let cur: any = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

export function t(key: string, ...args: any[]): string {
  // Try locale first
  const localized = getFromObject(LOCALES[currentLocale], key);
  if (localized !== undefined) {
    if (typeof localized === 'function') return localized(...args);
    if (typeof localized === 'string') return localized;
  }

  // Fallback to APP_STRINGS
  const appVal = getFromObject(APP_STRINGS as AnyObj, key);
  if (appVal !== undefined) {
    if (typeof appVal === 'function') return appVal(...args);
    if (typeof appVal === 'string') return appVal;
  }

  // If nothing found, return the key to make missing translations visible
  return key;
}

export function setLocale(locale: string) {
  if (LOCALES[locale]) {
    currentLocale = locale;
  } else {
    // keep current but warn
    // eslint-disable-next-line no-console
    console.warn(`Locale not found: ${locale}`);
  }
}

export function getLocale() {
  return currentLocale;
}

export default { t, setLocale, getLocale };
