import isURL from 'validator/lib/isURL';

/**
 * Check if value is a valid URL
 * @param {String} value
 */
export default (value) => {
	return isURL(value);
};
