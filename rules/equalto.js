/**
 * Check if value is equal to another field
 * @param {String} value
 * @param {Function} otherFieldValue
 */
export default (value, otherFieldValue) => {
	const otherValue = otherFieldValue()
	if (otherValue) {
		return otherValue === value;
	}
	return false;
};
