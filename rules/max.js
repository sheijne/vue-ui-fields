/**
 * Check if value is lower than max
 * @param {String} val
 * @param {Number, Function} max
 */
export default (val, max) => {
	const length = Number(val);
	const maxNumber = typeof(max) == 'function' ? max() : max;
	return length != NaN ? length <= maxNumber : false;
};
