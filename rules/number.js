/**
 * Check if value is a number
 * @param {String} val
 */
export default (value) => {
	const strVal = String(value);

	return /^[0-9]*$/.test(strVal) && strVal.length === Number(length);
};
