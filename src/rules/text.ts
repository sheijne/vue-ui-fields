/**
 * Check if value is text only
 * @param {String} value
 */
export default (value) => {
	const regex = new RegExp('^[A-Za-z]+$');
	return regex.test(value);
};
