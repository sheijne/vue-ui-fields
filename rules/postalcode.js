import isPostalCode from 'validator/lib/isPostalCode';

/**
 * Check if value is a valid postalcode
 * @param {String} value
 * @param {Array, String} locale
 */
export default (value, locale) => {
	if(Array.isArray(locale)) {
		let validPostalCode = locale.filter(local => {
			const val = isPostalCode(value, local);
			return val
		})
		return validPostalCode.length != 0;
	} else {
		return isPostalCode(value, locale)
	}
};
