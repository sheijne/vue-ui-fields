/**
 * Check if value is a number
 */
export default (value: string) => {
	const strVal = String(value);
	return /^[0-9]*$/.test(strVal);
};
