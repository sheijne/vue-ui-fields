import isMobilePhone from 'validator/lib/isMobilePhone';

export default (value, locale) => {	
	return isMobilePhone(value, locale);
};
