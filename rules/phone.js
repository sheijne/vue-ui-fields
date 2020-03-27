export default (value) => {
	const strVal = String(value)
		.split(' ')
		.join('');
	/* eslint-disable */
	return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(strVal);
};
