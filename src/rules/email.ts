import isEmail from 'validator/lib/isEmail';

/**
 * Check if value is a valid email address
 * @param {String} value
 */
export default (value: string) => {
	return isEmail(value);
};
