/**
 * Check if the length of the value is lower than max
 * @param {String} val
 * @param {Number, Function} max
 */
export default (val, max) => {
	const length = val.length;
	const maxLength = typeof(max) == 'function' ? max() : max;
	return length <= maxLength;
};
