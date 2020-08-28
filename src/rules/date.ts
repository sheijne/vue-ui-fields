import toDate from 'validator/lib/toDate';

/**
 * Check if value is a valid date
 */
export default (value: string) => {
	return toDate(value);
};
