const path = require('path');
const supportedLngs = ['en','tr', 'de', 'ru',];

export const ni18nConfig = {
    fallbackLng: ['en'],
    supportedLngs,
    ns: ['translation'],
    react: { useSuspense: false },
    backend: {
        loadPath: path.resolve('./public/locales/{{lng}}.json'),
    },
};
