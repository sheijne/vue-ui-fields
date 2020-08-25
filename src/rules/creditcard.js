import isCreditCard from 'validator/lib/isCreditCard';

/**
 * Check if value is a valid creditcard number
 * @param {String} value
 */
export default (value) => {
	return isCreditCard(value);
};
