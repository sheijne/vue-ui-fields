import isPostalCode from 'validator/lib/isPostalCode';

export default (value, locale) => {
	return isPostalCode(value, locale);
};
