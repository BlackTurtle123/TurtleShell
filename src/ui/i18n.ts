import * as i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import  * as Locize  from 'i18next-locize-backend';
import { I18N_NAME_SPACE, TURTLESHELL_DEBUG } from './appConfig';



let backendPath = { loadPath: './_locales/{{lng}}/{{ns}}.{{lng}}.json' } as any;

i18n
    .use(reactI18nextModule)
    .use(Locize)
    .init({
        fallbackLng: 'en',
        appendNamespaceToCIMode: true,
        saveMissing: false,
        ns: [I18N_NAME_SPACE],
        defaultNS: I18N_NAME_SPACE,

        debug: TURTLESHELL_DEBUG,
        keySeparator: '.', // we use content as keys
        nsSeparator: '.', // we use content as keys

        backend: {
            projectId: '',
            apiKey: '',
            referenceLng: 'en',
            ...backendPath
        },

        interpolation: {
            formatSeparator: ',',
            format: function(value, format, lng) {
                if (format === 'uppercase') return value.toUpperCase();
                return value;
            }
        },

        react: {
            wait: true//!TURTLESHELL_DEBUG
        }
    });

const LANGS = [
    {
        id: 'en',
        name: 'English'
    },
    {
        id: 'ru',
        name: 'Русский'
    },
    {
        id: 'ko',
        name: '한국어'
    },
    {
        id: 'zh',
        name: '中文(简体)'
    },
    {
        id: 'tr',
        name: 'Türkçe'
    },
    {
        id: 'hi',
        name: 'हिन्दी'
    },
    {
        id: 'es',
        name: 'Español'
    },
    {
        id: 'pt',
        name: 'Portugal'
    },
    {
        id: 'pl',
        name: 'Polsk'
    }
];

export { i18n, LANGS };
