import { isEmail } from 'validator';

const validation = (value) => {
	return isEmail(value);
}

export default {
	validation
}