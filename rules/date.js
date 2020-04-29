import toDate from 'validator/lib/toDate';

/**
 * Check if value is a valid date
 * @param {String} value
 */
export default (value) => {
	return toDate(value);
};


