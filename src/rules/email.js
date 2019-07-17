import { isEmail } from 'validator';

export default (value) => {
	return isEmail(value);
}