/**
 * Check if value is lower than max
 */
export default (val: string, max: number) => {
	const length = Number(val);
	return length <= max;
};
