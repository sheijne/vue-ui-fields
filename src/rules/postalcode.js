import { isPostalCode } from 'validator';
1
export default (value, locale) => {
	return isPostalCode(value, locale);
}