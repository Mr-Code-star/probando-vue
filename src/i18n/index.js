import en from '../locales/en.json';
import es from '../locales/es.json';
import {createI18n} from 'vue-i18n';
const i18n = createI18n({
    locale: en,
    fallbackLocale: 'en',
    globalInjection: true,
    messages: {en, es}
});
export default i18n;