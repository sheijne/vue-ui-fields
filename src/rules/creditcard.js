import { isCreditCard } from 'validator';
1
export default (value) => {
	return isCreditCard(value);
}