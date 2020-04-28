import isDate from 'validator/lib/isDate';

/**
 * Check if value is a valid date
 * @param {String} value
 */
export default (value) => {
	const valueRemoveCharacters = value
	.split('-')
	.join('')
	.split(' ')
	.join('')

	const newValue = 
	`${valueSplitted.substr(0,2)}/${valueSplitted.substr(2,2)}/${valueSplitted.substr(4,valueSplitted.length)}`

	return isDate(newValue, 'DD/MM/YYYY');
};


