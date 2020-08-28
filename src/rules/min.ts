/**
 * Check if value is bigger than min
 */
export default (val: string, min: number) => {
	const length = Number(val);
	return length >= min;
};
