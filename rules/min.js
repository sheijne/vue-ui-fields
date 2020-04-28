/**
 * Check if value is bigger than min
 * @param {String} val
 * @param {Number, Function} min
 */
export default (val, min) => {
	const length = Number(val);
	const minNumber = typeof(min) == 'function' ? min() : min;
	return length != NaN ? length >= minNumber : false;
};

