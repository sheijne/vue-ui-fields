import isCreditCard from 'validator/lib/isCreditCard';

/**
 * Check if value is a valid creditcard number
 */
export default (value: string) => {
	return isCreditCard(value);
};
