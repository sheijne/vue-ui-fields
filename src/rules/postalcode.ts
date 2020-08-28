import isPostalCode from 'validator/lib/isPostalCode';

import type { PostalCodeLocale } from '../types/locale';
/**
 * Check if value is a valid postalcode
 * @param {String} value
 * @param {Array, String} locale
 */
export default (value: string, locale: PostalCodeLocale) => {
	if (!locale) {
		return true;
	}
	if (Array.isArray(locale)) {
		return !!locale.find((singeLocale) => isPostalCode(value, singeLocale));
	} else {
		return isPostalCode(value, locale);
	}
};
