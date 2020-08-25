export const PLUGINS_DIR = 'plugins/';
export const MESSAGES_DIR = 'messages/';
export const TEMPLATES_DIR = 'template/';
export const HELPERS_DIR = 'helpers/';
export const RULES_DIR = 'rules/';
export const ROOT_DIR = 'ui-fields/';

export const DEFAULT_OPTIONS = {
	validation: {
		event: 'blur',
		showErrors: true,
		i18n: 'nl',
		classes: {
			error: 'invalid',
			valid: 'valid',
			pristine: 'pristine',
		},
	},
	persistentTime: 1000 * 60 * 60 * 12, //half a day
};
