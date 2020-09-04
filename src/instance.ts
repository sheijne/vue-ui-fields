import formatProperties from './helpers/formatProperties';
import messagesNL from './messages/nl';
import messagesEN from './messages/en';
import SimpleCrypto from 'simple-crypto-js';
import Vue from 'vue';

import type { UIFieldsOptions } from './types/options';
import type {
	FieldError,
	Form,
	FieldTypes,
	Field,
	SetField,
	FormatValue,
	ComponentType,
	FieldOptions,
	ValidationSettings,
	ValidationOptions,
} from './types';
import type _Vue from 'vue';

const time = new Date();
const simpleCrypto = new SimpleCrypto('VueUIFields');

export default class UIFieldsInstance implements Form {
	public options: UIFieldsOptions;
	public name: string;
	public fields: Record<string, any>;
	public values: Record<string, any>;
	public errors: Record<string, any>;
	public includesFile: boolean;
	public className: string;

	constructor(name: string, options: UIFieldsOptions) {
		this.options = options;
		this.name = name;
		this.fields = new Map();
		this.values = new Map();
		this.errors = new Map();
		this.includesFile = false;

		if (options.className) {
			this.className = options.className;
		} else {
			this.className = Vue.prototype.$uiFields.className;
		}
	}
	/**
	 * Return formname
	 */
	getFormName() {
		return this.name;
	}

	/**
	 * Return Formatted fields
	 */
	getFieldKeys(): string[] {
		return [...this.fields.keys()];
	}

	/**
	 * Return fields map
	 */
	getFields(): Record<string, Field> {
		return this.fields;
	}

	/**
	 * Return fields map
	 */
	getField(name: string): Field {
		return this.fields.get(name);
	}

	/**
	 *
	 */
	setFields(fields: SetField[]) {
		if (!Array.isArray(fields)) {
			return;
		}

		fields.forEach((field) => this.setField(field));
	}

	/**
	 * Set a field
	 */
	async setField(field: SetField) {
		const defaultSettings = [
			{ key: 'name', type: 'string' },
			{ key: 'value', type: 'string' },
			{ key: 'type', type: 'string' },
			{ key: 'label', type: 'string', default: '' },
			{ key: 'requiredText', type: 'string', default: '*' },
			{ key: 'classes', type: 'array', default: [] },
			{ key: 'datalist', type: 'array' },
		] as FormatValue[];

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
			{ key: 'maxUploadSize', type: 'number' },
		] as FormatValue[];

		const defaultDependentSettings = [
			{ key: 'validation', type: 'any', default: [] },
			{ key: 'persistent', type: 'boolean', default: true },
		] as FormatValue[];

		//Split data into 3 main sections
		let { baseSettings, dependentSettings, htmlSettings, ...remaining } = formatProperties(
			field,
			{ key: 'baseSettings', values: defaultSettings },
			{ key: 'htmlSettings', values: defaultHTMLSettings },
			{ key: 'dependentSettings', values: defaultDependentSettings }
		);

		let { name, value, type, label, requiredText, classes, datalist } = baseSettings;
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
			requiredText,
			datalist,
		} as SetField;

		if (!value) {
			value = '';
		}

		if (dependentSettings.persistent) {
			const oldValue = this.getOldValue(name);
			if (oldValue) {
				value = oldValue;
			}
		}

		const defaultOptionsSettings = [
			{ key: 'selected', type: 'boolean', default: false },
			{ key: 'disabled', type: 'boolean' },
			{ key: 'label', type: 'string', default: '' },
			{ key: 'value', type: 'string', default: '' },
		] as FormatValue[];

		if (Object.prototype.hasOwnProperty.call(remaining, 'options')) {
			const formattedOptions = [] as FieldOptions[];

			if (Array.isArray(remaining.options)) {
				remaining.options.forEach((opt: SetField) => {
					const { option, ...rest } = formatProperties(opt, {
						key: 'option',
						values: defaultOptionsSettings,
					});
					option.customData = rest;
					formattedOptions.push(option);
				});
				delete remaining.options;
			}

			if (type === 'checkbox') {
				if (!value) {
					const selectedIndex = formattedOptions.findIndex((option) => option.selected);
					if (selectedIndex > -1) {
						value = [formattedOptions[selectedIndex].value];
					} else {
						value = [];
					}
				}
			} else if (type === 'select' || type === 'radio') {
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
	}

	/**
	 * Set single value
	 */
	setValue(fieldName: string, value: any, addToStorage = true) {
		const field = this.getField(fieldName);
		this.values.set(fieldName, value);
		if (field.type !== 'checkbox' && field.type !== 'file' && field.dependentSettings.persistent && addToStorage) {
			this.addToLocalStorage(fieldName, value);
		}
	}

	/**
	 * Set single value
	 */
	getValue(fieldName: string): string {
		return this.values.get(fieldName);
	}

	/**
	 * Returns formatted data
	 */
	getFormattedValues() {
		const values = this.values as any;
		let obj = Object.create(null);
		for (let [k, v] of values) {
			obj[k] = v;
		}
		return obj;
	}

	/**
	 * Get component type
	 * @param {String} type
	 */
	formatComponentType(type: FieldTypes = 'text'): ComponentType {
		switch (type) {
			case 'text':
			case 'phone':
			case 'date':
			case 'number':
			case 'email':
			case 'tel':
			case 'password':
			case 'range':
				return 'UiText';
			case 'hidden':
				return 'UiHidden';
			case 'file':
				this.includesFile = true;
				return 'UiFile';
			case 'select':
				return 'UiSelect';
			case 'checkbox':
				return 'UiCheckbox';
			case 'radio':
				return 'UiRadio';
			case 'textarea':
				return 'UiTextarea';
			default:
				return 'UiText';
		}
	}

	/**
	 * Subscribe form
	 */
	subscribe(listener: (...args: any) => void) {
		Vue.prototype.$uiFields.subscribe(this.getFormName(), listener);
	}

	/**
	 * Subscribe field
	 */
	subscribeField(fieldName: string, listener: (...args: any) => void) {
		Vue.prototype.$uiFields.subscribeField(this.getFormName(), fieldName, listener);
	}

	/**
	 * Subscribe field
	 */
	subscribeError(fieldName: string, listener: (...args: any) => void) {
		Vue.prototype.$uiFields.subscribeError(this.getFormName(), fieldName, listener);
	}

	/**
	 * Unsubscribe form
	 */
	unsubscribe() {
		Vue.prototype.$uiFields.unsubscribe(this.getFormName());
	}

	/**
	 * Unsubscribe field
	 */
	unsubscribeField(fieldName: string) {
		Vue.prototype.$uiFields.unsubscribe(this.getFormName(), fieldName);
	}

	/**
	 * Set error on field
	 */
	_setError(fieldName: string, errorName: string, error: FieldError) {
		this.errors.set(`${fieldName}_${errorName}`, error);
	}

	/**
	 * get error on field
	 */
	getError(fieldName: string, errorName: string): FieldError {
		return this.errors.get(`${fieldName}_${errorName}`);
	}

	/**
	 * get all errors
	 */
	getErrors() {
		return this.errors;
	}

	/**
	 * Get error keys
	 */
	getErrorKeys() {
		return [...this.errors.keys()];
	}

	/**
	 * Remove single error
	 * @param {String} fieldName
	 * @param {String} errorName
	 */
	removeError(fieldName: string, errorName: string) {
		this.errors.delete(`${fieldName}_${errorName}`);
	}

	/**
	 * Validator Object
	 */
	async validator(type: ValidationOptions) {
		let rules;
		switch (type) {
			case 'required':
				rules = await import('./rules/required');
				break;
			case 'email':
				rules = await import('./rules/email');
				break;
			case 'postalcode':
				rules = await import('./rules/postalcode');
				break;
			case 'number':
				rules = await import('./rules/number');
				break;
			case 'minlength':
				rules = await import('./rules/minlength');
				break;
			case 'maxlength':
				rules = await import('./rules/maxlength');
				break;
			case 'min':
				rules = await import('./rules/min');
				break;
			case 'max':
				rules = await import('./rules/max');
				break;
			case 'creditcard':
				rules = await import('./rules/creditcard');
				break;
			case 'date':
				rules = await import('./rules/date');
				break;
			case 'url':
				rules = await import('./rules/url');
				break;
			case 'equalTo':
				rules = await import('./rules/equalto');
				break;
			case 'notEqualTo':
				rules = await import('./rules/notequalto');
				break;
			case 'vat':
				rules = await import('./rules/vat');
				break;
			case 'phone':
				rules = await import('./rules/phone');
				break;
			case 'text':
				rules = await import('./rules/text');
				break;
			case 'includes':
				rules = await import('./rules/includes');
				break;
		}
		if (rules) {
			return rules.default;
		}
		return false;
	}

	/**
	 * Add valiation subscriber
	 */
	defineValidation(validation: ValidationSettings[], name: string) {
		validation.forEach((validator: ValidationSettings) => {
			let validationType = 'custom' as ValidationOptions;

			validationType = validator.name;

			let options = null as unknown;
			if (Object.prototype.hasOwnProperty.call(validator, 'options')) {
				options = validator.options;
			}

			let message = null as unknown;
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
						message,
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
					message,
				});
			}
		});
	}

	addToLocalStorage(name: string, value: string) {
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
				this.options.projectName,
				JSON.stringify({ time: time.getTime(), data: Array.from(data.entries()) })
			);
		}
	}

	getOldValue(name: string): Record<string, any> | undefined | false {
		if (typeof window !== 'undefined' && window.localStorage) {
			const oldData = localStorage.getItem(this.options.projectName);
			let data = null;
			if (oldData) {
				const allData = JSON.parse(oldData);
				data = new Map(allData.data);
				const uiFieldsTime = allData.time;
				if (time.getTime() - uiFieldsTime > this.options.persistentTime) {
					localStorage.removeItem(this.options.projectName);
					return false;
				}
			}
			if (data && data.has(`${this.getFormName()}_${name}`)) {
				const value = data.get(`${this.getFormName()}_${name}`) as string;
				return simpleCrypto.decrypt(value) as Record<string, any>;
			}
			return false;
		}
	}
}
