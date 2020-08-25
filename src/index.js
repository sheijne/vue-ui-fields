import prototype from './prototype.js';

const uiFields = {
	install(Vue, options) {
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
		Vue.component('UiErrors', () => import('./template/Errors.vue'));
		Vue.component('UiError', () => import('./template/Error.vue'));
		Vue.component('UiFields', () => import('./template/Fields.vue'));
		Vue.component('UiField', () => import('./template/Field.vue'));
		Vue.prototype.$uiFields = prototype(options, Vue);
	},
};

export default uiFields;
