/**
 * Check if the length of the value is bigger than min
 */
export default (val: string, min: number) => {
	const length = val.length;
	return length >= min;
};
