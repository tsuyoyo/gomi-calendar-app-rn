import 'i18next';
import { defaultNS, resources } from '../i18n/i18n';

// For Type (i18next.d.ts)
// Ref: https://www.i18next.com/overview/typescript
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['ja'];
  }
}
