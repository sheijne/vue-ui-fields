/**
 * Check if the length of the value is lower than max
 * @param {String} val
 * @param {Number} max
 */
export default (val, max) => {
	const length = val.length;
	return length <= max;
};
