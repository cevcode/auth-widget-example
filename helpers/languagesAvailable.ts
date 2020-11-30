export const LANGUAGES = {
    en: 'English',
    de: 'German',
    fr: 'French',
    es: 'Spanish',
    pt: 'Portuguese',
    ru: 'Russian',
    it: 'Italian',
    pl: 'Polish',
    default: 'English',
};

export function getLangByKey(lang: string) {
    if (LANGUAGES[lang]) {
        return LANGUAGES[lang];
    }
    return LANGUAGES['default'];
}
