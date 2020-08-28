/**
 * Check if value is not equal to another field
 */
export default (value: string, otherFieldValue: () => string) => {
	return otherFieldValue() !== value;
};
