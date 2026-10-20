export type Lang = 'en' | 'hy';

// Armenian falls back to English when a translation is empty.
export const pick = (lang: Lang, en: string, hy?: string | null) =>
    lang === 'hy' && hy ? hy : en;

export const pickOpt = (lang: Lang, en?: string | null, hy?: string | null) =>
    (lang === 'hy' && hy ? hy : en) ?? null;

export const pickList = (lang: Lang, en: string[], hy: string[]) =>
    lang === 'hy' && hy.length ? hy : en;