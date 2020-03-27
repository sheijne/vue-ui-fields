import isEmail from 'validator/lib/isEmail';

export default (value) => {
	return isEmail(value);
};
