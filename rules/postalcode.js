import isPostalCode from 'validator/lib/isPostalCode';

/**
 * Check if value is a valid postalcode
 * @param {String} value
 * @param {Arrary} allLocale
 */
export default (value, allLocale) => {
	if(allLocale.length > 1) {
		let isPostcode = false
		allLocale.forEach(locale => {
			if(isPostalCode(value, locale)) {
				isPostcode = true;
			}
		})
		return isPostcode;
	} else {
		return isPostalCode(value, allLocale);
	}
};
