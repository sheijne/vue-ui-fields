/**
 * Check if value is text only
 * @param {String} value
 */
export default (value) => {
	const regex = new RegExp(/^[A-Za-z]+$/);
	console.log(regex.test(value))
	return regex.test(value)
};