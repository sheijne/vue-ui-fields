/**
 * Check if value is text only
 */
export default (value: string) => {
	const regex = new RegExp('^[A-Za-z]+$');
	return regex.test(value);
};
