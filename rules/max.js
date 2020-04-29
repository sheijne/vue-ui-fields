/**
 * Check if value is lower than max
 * @param {String} val
 * @param {Number} max
 */
export default (val, max) => {
	const length = Number(val);
	return length !== NaN ? length <= max : false;
};
