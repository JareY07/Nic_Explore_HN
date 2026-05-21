import { BRAND_PALETTES } from '@/types/themeTypes';

export function isBrandColorName(value: string): value is (typeof BRAND_PALETTES)[number] {
  return (BRAND_PALETTES as readonly string[]).includes(value);
}
