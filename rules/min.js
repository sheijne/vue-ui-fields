/**
 * Check if value is bigger than min
 * @param {String} val
 * @param {Number} min
 */
export default (val, min) => {
	const length = Number(val);
	return length != NaN ? length>=length : false;
};
