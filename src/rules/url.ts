import isURL from 'validator/lib/isURL';

/**
 * Check if value is a valid URL
 */
export default (value: string) => {
	return isURL(value);
};
