/**
 * Check if the length of the value is bigger than min
 * @param {String} val
 * @param {Number} min
 */
export default (val, min) => {
	const length = val.length;
	return length >= min;
};
