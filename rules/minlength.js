/**
 * Check if the length of the value is bigger than min
 * @param {String} val
 * @param {Number, Function} min
 */
export default (val, min) => {
	const length = val.length;
	const minLength = typeof(min) == 'function' ? min() : min;
	return length >= minLength;
};
