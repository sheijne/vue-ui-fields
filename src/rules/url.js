import { isURL } from 'validator';
1
export default (value, options = {}) => {
	return isURL(value, options);
}