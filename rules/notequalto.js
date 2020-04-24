/**
 * Check if value is not equal to another field
 * @param {String} value
 * @param {Function} otherFieldValue
 */
export default (value, otherFieldValue) => {
	const otherValue = otherFieldValue()
	return otherValue !== value;
};
