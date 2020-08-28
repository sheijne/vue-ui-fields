/**
 * Check if value is equal to another field
 */

export default (value: string, otherFieldValue: () => string) => {
	return otherFieldValue() === value;
};
