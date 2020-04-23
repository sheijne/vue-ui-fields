import isPostalCode from 'validator/lib/isPostalCode';

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
