import prototype from './prototype';
import type { UIFieldsOptions } from './types/options';
import type _Vue from 'vue';

import UiErrors from './template/Errors.vue';
import Error from './template/Error.vue';
import Fields from './template/Fields.vue';
import Field from './template/Field.vue';

const uiFields = {
	install(Vue: typeof _Vue, options: UIFieldsOptions) {
		if (!options) {
			options = {
				projectName: 'VueUiFields',
				persistentTime: 1000 * 60 * 60 * 12,
				lang: 'en',
				className: 'ui-fields',
				baseURL: '',
			};
		} else {
			if (!Object.prototype.hasOwnProperty.call(options, 'projectName')) {
				options.projectName = 'VueUiFields';
			}

			if (!Object.prototype.hasOwnProperty.call(options, 'persistentTime')) {
				options.persistentTime = 1000 * 60 * 60 * 12;
			}

			if (!Object.prototype.hasOwnProperty.call(options, 'lang')) {
				options.lang = 'en';
			}

			if (!Object.prototype.hasOwnProperty.call(options, 'className')) {
				options.className = 'ui-fields';
			}

			if (!Object.prototype.hasOwnProperty.call(options, 'baseURL')) {
				options.baseURL = '';
			}
		}

		//Global mixin functions
		Vue.component('UiErrors', UiErrors);
		Vue.component('UiError', Error);
		Vue.component('UiFields', Fields);
		Vue.component('UiField', Field);
		const UIFields = prototype(options);
		Vue.prototype.$uiFields = UIFields;
	},
};

export default uiFields;
