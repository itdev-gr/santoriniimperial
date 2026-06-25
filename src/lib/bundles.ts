import en from '../content/i18n/en.json';
import gr from '../content/i18n/gr.json';
import de from '../content/i18n/de.json';
import fr from '../content/i18n/fr.json';
import it from '../content/i18n/it.json';

export const bundles = { en, gr, de, fr, it } as const;
export type BundleKey = keyof typeof bundles;
