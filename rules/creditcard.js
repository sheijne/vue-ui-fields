import isCreditCard from 'validator/lib/isCreditCard';

export default (value) => {
	return isCreditCard(value);
};
