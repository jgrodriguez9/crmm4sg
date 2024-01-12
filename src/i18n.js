import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationSP from './locales/es.json';
import translationENG from './locales/en.json';

// the translations
const resources = {
	es: {
		translation: translationSP,
	},
	en: {
		translation: translationENG,
	},
};

const lng = navigator.language.substring(0, 2) === 'es' ? 'es' : 'en';

i18n.use(detector)
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng,
		fallbackLng: 'es', // use en if detected lng is not available
		debug: true,

		keySeparator: '.',

		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
