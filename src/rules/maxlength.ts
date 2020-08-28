/**
 * Check if the length of the value is lower than max
 */
export default (val: string, max: number) => {
	const length = val.length;
	return length <= max;
};
