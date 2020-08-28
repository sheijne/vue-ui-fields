/**
 * Check if value is equal to another field
 * @param {String} value
 * @param {Array} options
 */
export default (value: string, options: string[]) => {
	return options.includes(value);
};
