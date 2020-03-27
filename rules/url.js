import isURL from 'validator/lib/isURL';

export default (value, options = {}) => {
	return isURL(value, options);
};
