import isURL from 'validator/lib/isURL';

/**
 * Check if value is a valid URL
 * @param {String} value
 * @param {Array} options
 */
export default (value, options = {}) => {
	return isURL(value, options);
};
