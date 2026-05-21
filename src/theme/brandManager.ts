import { useAppStore } from '@/store/useAppStore';
import { BrandColorName } from '@/types/themeTypes';

/**
 * Allows changing the active brand color purely from code (e.g. tests, dev helpers).
 * Persists through the Zustand store just like user-triggered changes.
 */
export function setBrandColorProgrammatically(color: BrandColorName) {
  const { setBrandColor } = useAppStore.getState();
  setBrandColor(color);
}

/**
 * Convenience helper to reset the brand color back to the default palette.
 */
export function resetBrandColorToDefault() {
  const { setBrandColor } = useAppStore.getState();
  setBrandColor('blue');
}
