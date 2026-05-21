import { APP_STRINGS } from '../../constants/shared';

const es = {
  // Reuse APP_STRINGS as the Spanish translation source of truth.
  // This keeps a single source and avoids duplicating large objects.
  translation: APP_STRINGS as any,
};

export default es;
export type Translation = typeof es;
