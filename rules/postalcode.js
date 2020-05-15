import isPostalCode from 'validator/lib/isPostalCode';

/**
 * Check if value is a valid postalcode
 * @param {String} value
 * @param {Array, String} locale
 */
export default (value, locale) => {
	if (!locale) {
		return true;
	}
	if (Array.isArray(locale)) {
		return !!locale.find(singeLocale => isPostalCode(value, singeLocale))
	} else {
		return isPostalCode(value, locale)
	}
};
