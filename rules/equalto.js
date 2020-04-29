/**
 * Check if value is equal to another field
 * @param {String} value
 * @param {Function} otherFieldValue
 */
export default (value, otherFieldValue) => {
	return otherFieldValue() === value;
};
