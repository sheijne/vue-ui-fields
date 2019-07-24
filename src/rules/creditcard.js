import { isCreditCard } from 'validator';

export default (value) => {
	return isCreditCard(value);
}