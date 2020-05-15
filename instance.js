import formatProperties from './helpers/formatProperties.js';
import messagesNL from './messages/nl.json';
import messagesEN from './messages/en.json';
import SimpleCrypto from 'simple-crypto-js';


export default (options, Vue) => {
	const time = new Date();
	const simpleCrypto = new SimpleCrypto('VueUIFields');
	return function (name, className) {
		this.options = options;
		this.name = name;
		this.fields = new Map();
		this.values = new Map();
		this.errors = new Map();
		this.includesFile = false;

		if (className) {
			this.className = className;
		} else {
			this.className = Vue.prototype.$uiFields.className;
		}
		/**
			* Return formname
		*/
		this.getFormName = function() {
			return this.name;
		};

		/**
			* Return Formatted fields
		*/
		this.getFieldKeys = function() {
			return [...this.fields.keys()];
		};

		/**
			* Return fields map
		*/
		this.getFields = function() {
			return this.fields;
		};

		/**
			* Return fields map
		*/
		this.getField = function(name) {
			return this.fields.get(name);
		};

		/**
			*
			* @param {Array} options - Setfields -> array to setField
		*/
		this.setFields = function(fields) {
			if (!Array.isArray(fields)) {
				return;
			}

			fields.forEach(field => this.setField(field));
		};

		/**
			*
			* @param {Object} field - Set a field
		*/
		this.setField = async function(field) {
			const defaultSettings = [
				{ key: 'name', type: 'string' },
				{ key: 'value', type: 'string' },
				{ key: 'type', type: 'string' },
				{ key: 'label', type: 'string', default: '' },
				{ key: 'requiredText', type: 'string', default: '*' },
				{ key: 'classes', type: 'array', default: [] }
			];

			const defaultHTMLSettings = [
				{ key: 'autocomplete', type: 'string' },
				{ key: 'accept', type: 'string' },
				{ key: 'disabled', type: 'boolean' },
				{ key: 'max', type: 'any' },
				{ key: 'maxlength', type: 'any' },
				{ key: 'min', type: 'any' },
				{ key: 'minlength', type: 'any' },
				{ key: 'multiple', type: 'boolean' },
				{ key: 'placeholder', type: 'string' },
				{ key: 'required', type: 'boolean' },
				{ key: 'step', type: 'number' },
				{ key: 'autofocus', type: 'boolean' },
				{ key: 'maxUploadSize', type: 'number' }
			];

			const defaultOptionsSettings = [
				{ key: 'selected', type: 'boolean', default: false },
				{ key: 'disabled', type: 'boolean' },
				{ key: 'label', type: 'string', default: '' },
				{ key: 'value', type: 'string', default: '' }
			];

			const defaultDependentSettings = [
				{ key: 'validation', type: 'any', default: [] },
				{ key: 'persistent', type: 'boolean', default: true }
			];

			let {
				baseSettings,
				dependentSettings,
				htmlSettings,
				...remaining
			} = formatProperties(
				field,
				{ key: 'baseSettings', values: defaultSettings },
				{ key: 'htmlSettings', values: defaultHTMLSettings },
				{ key: 'dependentSettings', values: defaultDependentSettings }
			);

			let { name, value, type, label, requiredText, classes } = baseSettings;
			const componentType = this.formatComponentType(type);
			const formattedField = {
				customData: remaining,
				dependentSettings,
				htmlSettings,
				componentType,
				type,
				name,
				label,
				classes,
				requiredText
			};

			if (!value) {
				value = '';
			}

			if (dependentSettings.persistent) {
				const oldValue = this.getOldValue(name);
				if (oldValue) {
					value = oldValue;
				}
			}

			if (Object.prototype.hasOwnProperty.call(remaining, 'options')) {
				const formattedOptions = [];
				if (Array.isArray(remaining.options)) {
					remaining.options.forEach((opt) => {
						const { option, ...rest } = formatProperties(opt, {
							key: 'option',
							values: defaultOptionsSettings
						});
						option.customData = rest;
						formattedOptions.push(option);
					});
					delete remaining.options;
				}

				if (type === 'checkbox') {
					if (!value) {
						const selectedIndex = formattedOptions.findIndex(
							option => option.selected
						);
						if (selectedIndex > -1) {
							value = [formattedOptions[selectedIndex].value];
						} else {
							value = [];
						}
					}
				} else if (type === 'select' || type ==='radio') {
					if (!value) {
						const selectedIndex = formattedOptions.findIndex((option) => option.selected);
						if (selectedIndex > -1) {
							value = formattedOptions[selectedIndex].value;
						} else {
							value = formattedOptions[0].value;
							formattedOptions[0].selected = true;
						}
					}
				}
				formattedField.options = formattedOptions;
			} else if (type === 'checkbox' || type === 'select' || type === 'radio') {
				formattedField.options = [];
			}
			this.fields.set(name, formattedField);
			this.setValue(name, value, false);

			//Set dependent options after setting the field
			if (Object.prototype.hasOwnProperty.call(dependentSettings, 'validation') && dependentSettings.validation) {
				this.defineValidation(dependentSettings.validation, name);
			}
		};

		/**
		 * Set single value
		 * @param {String} fieldName
		 * @param {*} value
		 */
		this.setValue = function(fieldName, value, addToStorage = true) {
			const field = this.getField(fieldName);
			this.values.set(fieldName, value);
			if (field.type !== 'checkbox' && field.type !== 'file' && field.dependentSettings.persistent && addToStorage) {
				this.addToLocalStorage(fieldName, value);
			}
		};

		/**
		 * Set single value
		 * @param {String} fieldName
		 */
		this.getValue = function(fieldName) {
			return this.values.get(fieldName);
		};

		/**
		 * Returns formatted data
		 */
		this.getFormattedValues = function() {
			const values = this.values;
			let obj = Object.create(null);
			for (let [k, v] of values) {
				obj[k] = v;
			}
			return obj;
		};

		/**
			* Get component type
			* @param {String} type
			*/
		this.formatComponentType = function(type) {
			switch (type) {
				case 'text':
				case 'phone':
				case 'date':
				case 'number':
				case 'email':
				case 'tel':
				case 'password':
				case 'range':
					return 'uiText';
				case 'hidden':
					return 'uiHidden';
				case 'file':
					this.includesFile = true;
					return 'uiFile';
				case 'select':
					return 'uiSelect';
				case 'checkbox':
					return 'uiCheckbox';
				case 'radio':
					return 'uiRadio';
				case 'textarea':
					return 'uiTextarea';
				default:
					return type;
			}
		};

		/**
		 * Subscribe form
		 * @param {Function} listener
		 */
		this.subscribe = function(listener) {
			Vue.prototype.$uiFields.subscribe(this.getFormName(), listener);
		};

		/**
		 * Subscribe field
		 * @param {String} fieldName
		 * @param {Function} listener
		 */
		this.subscribeField = function(fieldName, listener) {
			Vue.$uiFields.subscribeField(this.getFormName(), fieldName, listener);
		};

		/**
		* Subscribe field
		* @param {String} fieldName
		* @param {Function} listener
		*/
		this.subscribeError = function(fieldName, listener) {
			Vue.prototype.$uiFields.subscribeError(this.getFormName(), fieldName, listener);
		};

		/**
		 * Unsubscribe form
		 */
		this.unsubscribe = function(){
			Vue.prototype.$uiFields.unsubscribe(this.getFormName());
		};

		/**
		 * Unsubscribe field
		 */
		this.unsubscribeField = function(fieldName) {
			Vue.prototype.$uiFields.unsubscribe(this.getFormName(), fieldName);
		};

		/**
		 * Set error on field
		 * @param {String} fieldName
		 * @param {String} errorName
		 * @param {String} error
		 */
		this._setError = function(fieldName, errorName, error) {
			this.errors.set(`${fieldName}_${errorName}`, error);
		};

		/**
		 * get error on field
		 * @param {String} fieldName
		 */
		this.getError = function(fieldName, errorName) {
			return this.errors.get(`${fieldName}_${errorName}`);
		};

		/**
		 * get all errors
		 */
		this.getErrors = function() {
			return this.errors;
		};

		/**
		 * Get error keys
		 */
		this.getErrorKeys = function() {
			return [...this.errors.keys()];
		};

		/**
		 * Remove single error
		 * @param {String} fieldName
		 * @param {String} errorName
		 */
		this.removeError = function(fieldName, errorName) {
			this.errors.delete(`${fieldName}_${errorName}`);
		};

		/**
		 * Validator Object
		 */
		this.validator = async function(type) {
			let rules;
			switch (type) {
				case 'required':
					rules = await import('./rules/required.js');
					break;
				case 'email':
					rules = await import('./rules/email.js');
					break;
				case 'postalcode':
					rules = await import('./rules/postalcode.js');
					break;
				case 'number':
					rules = await import('./rules/number.js');
					break;
				case 'minlength':
					rules = await import('./rules/minlength.js');
					break;
				case 'maxlength':
					rules = await import('./rules/maxlength.js');
					break;
				case 'min':
					rules = await import('./rules/min.js');
					break;
				case 'max':
					rules = await import('./rules/max.js');
					break;
				case 'creditcard':
					rules = await import('./rules/creditcard.js');
					break;
				case 'date':
					rules = await import('./rules/date.js');
					break;
				case 'url':
					rules = await import('./rules/url.js');
					break;
				case 'equalTo':
					rules = await import('./rules/equalto.js');
					break;
				case 'notEqualTo':
					rules = await import('./rules/notequalto.js');
					break;
				case 'vat':
					rules = await import('./rules/vat.js');
					break;
				case 'phone':
					rules = await import('./rules/phone.js');
					break;
				case 'text':
					rules = await import('./rules/text.js');
					break;
			}
			if (rules) {
				return rules.default;
			}
			return false;
		};

		/**
		 * Add valiation subscriber
		 * @param {Array} validation
		 */
		this.defineValidation = function(validation, name) {
			validation.forEach((validator) => {
				let validationType = '';
				if (typeof validator === 'string') {
					validationType = validator;
				} else {
					validationType = validator.name;
				}

				let options = null;
				if (Object.prototype.hasOwnProperty.call(validator, 'options')) {
					options = validator.options;
				}

				let message = null;
				if (Object.prototype.hasOwnProperty.call(validator, 'message')) {
					if (typeof validator.message == 'function') {
						message = validator.message;
					} else {
						message = () => validator.message;
					}
				} else {
					if (validationType && validationType !== 'custom') {
						if (this.options.lang === 'nl') {
							message = () => messagesNL[validationType];
						} else {
							message = () => messagesEN[validationType];
						}
					} else {
						message = () => '';
					}
				}
				if (validationType && validationType !== 'custom') {
					this.validator(validationType).then((validationChecker) => {
						Vue.prototype.$uiFields._subscribeError(`${this.getFormName()}_${name}`, {
							validation: validationChecker,
							options,
							validationType: validationType,
							message
						});
					});
				} else {
					let validationFunction = () => true;
					if (Object.prototype.hasOwnProperty.call(validator, 'validation')) {
						validationFunction = validator.validation;
					}
					Vue.prototype.$uiFields._subscribeError(`${this.getFormName()}_${name}`, {
						validation: validationFunction,
						options,
						validationType: validationType,
						message
					});
				}
			});
		};

		this.addToLocalStorage = function(name, value) {
			if (typeof window !== 'undefined' && window.localStorage) {
				const oldData = localStorage.getItem(this.options.projectName);
				let data = null;
				if (oldData) {
					data = new Map(JSON.parse(oldData).data);
				} else {
					data = new Map();
				}
				data.set(`${this.getFormName()}_${name}`, simpleCrypto.encrypt(value));
				localStorage.setItem(
					this.options.projectName, JSON.stringify({ time: time.getTime(), data: Array.from(data.entries()) })
				);
			}
		};

		this.getOldValue = function(name) {
			if (typeof window !== 'undefined' && window.localStorage) {
				const oldData = localStorage.getItem(this.options.projectName);
				let data = null;
				if (oldData) {
					const allData = JSON.parse(oldData);
					data = new Map(allData.data);
					const uiFieldsTime = allData.time;
					if ((time.getTime() - uiFieldsTime) > this.options.persistentTime) {
						localStorage.removeItem(this.options.projectName);
						return false;
					}
				}
				if (data && data.has(`${this.getFormName()}_${name}`)) {
					const value = data.get(`${this.getFormName()}_${name}`);
					return simpleCrypto.decrypt(value);
				}
				return false;
			}
		};
	};
};