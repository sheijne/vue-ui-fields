import isMobilePhone from 'validator/lib/isMobilePhone';

import type { MobilePhoneLocale } from '../types/locale';

/**
 * Check if value is a valid phonenumber
 */
export default (value: string, locale: MobilePhoneLocale) => {
	return isMobilePhone(value, locale);
};
