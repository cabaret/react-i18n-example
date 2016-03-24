import Promise from 'bluebird';
import i18n from 'counterpart';
import axios from 'axios';

i18n.setLocale('en');

async function getTranslationsForLocale(locale) {
  try {
    const { data } = await axios.get(`/locales/${locale}.json`);
    return i18n.registerTranslations(locale, data);
  } catch (err) {
    throw new Error(err);
  }
}

export const fetchTranslations = Promise.all([
  getTranslationsForLocale('en'), getTranslationsForLocale('fr'),
]);

export default i18n;
