import uiFieldsInstance from './instance';

import type { UIFieldsOptions } from './types/options';
import type { FieldError, UIFields } from './types';

import type _Vue from 'vue';

export default function (options: UIFieldsOptions): UIFields {
	return {
		/**
		 * Current form instance
		 */
		className: options.className,
		forms: new Map(),
		formListeners: new Map(),
		fieldListeners: new Map(),
		conditionListeners: new Map(),
		errorListeners: new Map(),
		waitedListeners: new Map(),
		/**
		 * Create a new form
		 */
		new(name) {
			const form = new uiFieldsInstance(name, options);
			this.forms.set(name, form);
			return form;
		},

		/**
		 * Set value to array
		 */
		getValue(formName, fieldName) {
			if (!formName || !fieldName) {
				return '';
			}

			const form = this.getForm(formName);
			if (!form) {
				return '';
			}

			return form.getValue(fieldName);
		},

		/**
		 * Get all fields of formname
		 */
		getFieldKeys(formName) {
			const form = this.getForm(formName);
			if (!form) {
				return [];
			}
			return form.getFieldKeys();
		},

		/**
		 * Get single field
		 */
		getField(formName, fieldName) {
			const form = this.getForm(formName);
			if (!form) {
				return;
			}
			return form.getField(fieldName);
		},

		/**
		 * Get all fields
		 */
		getFields(formName) {
			const form = this.getForm(formName);
			if (!form) {
				return;
			}
			return form.getFields();
		},

		/**
		 * Get form
		 */
		getForm(formName) {
			return this.forms.get(formName);
		},

		/**
		 * Get all values mapped
		 */
		getValues(formName) {
			const form = this.getForm(formName);
			if (!form) {
				return [];
			}
			return [...form.values.values()];
		},

		/**
		 * Get all values mapped
		 */
		getFormattedValues(formName: string) {
			if (!formName) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				return;
			}
			return form.getFormattedValues();
		},

		/**
		 * Set new field
		 * @param {Object} options
		 */
		setField(name, options) {
			const form = this.getForm(name);
			if (!form) {
				return;
			}
			form.setField(options);
		},

		/**
		 * Set multiple fields
		 */
		setFields(name, options) {
			if (!name) {
				return;
			}

			const form = this.getForm(name);
			if (!form) {
				return;
			}
			form.setFields(options);
		},

		/**
		 * Set value to array
		 */
		setValue(formName, name, value, checkError = true) {
			if (!formName || !name) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				return;
			}
			form.setValue(name, value, checkError);
			if (checkError) {
				this.removeCustomErrors(formName, name);
				this.checkError(formName, name, value);
			}
			this._listen(formName, name, value);
		},
		/**
		 * Subscriber
		 */
		subscribe(formName, listener) {
			if (this.formListeners.has(formName)) {
				this.formListeners.set(formName, [...this.formListeners.get(formName), listener]);
			} else {
				this.formListeners.set(formName, [listener]);
			}
		},

		/**
		 * Subscriber prototype, only used by fields
		 */
		_subscribeError(name, data) {
			if (this.errorListeners.has(name)) {
				const oldError = this.errorListeners.get(name);
				this.errorListeners.set(name, {
					functions: oldError.functions,
					data: [...oldError.data, data],
				});
			} else {
				this.errorListeners.set(name, { functions: [], data: [data] });
			}
			if (this.waitedListeners.has(name)) {
				const awaitedListeners = this.waitedListeners.get(name);
				awaitedListeners.forEach((listener: (...args: any) => void) => {
					const [formName, ...rest] = name.split('_');
					const fieldName = rest.join('_');
					this.subscribeError(formName, fieldName, listener);
				});
				this.waitedListeners.delete(name);
			}
		},

		/**
		 * Unsubscriber custom errors prototype, only used by fields
		 */
		_unsubscribeCustomErrors(name) {
			if (this.errorListeners.has(name)) {
				const oldError = this.errorListeners.get(name);
				const data = oldError.data.filter((error: any) => !error.custom);
				this.errorListeners.set(name, { functions: oldError.functions, data });
			}
		},

		/**
		 * Subscriber
		 */
		subscribeError(formName, fieldName, listener) {
			if (this.errorListeners.has(`${formName}_${fieldName}`)) {
				const error = this.errorListeners.get(`${formName}_${fieldName}`);
				error.functions.push(listener);
				this.errorListeners.set(`${formName}_${fieldName}`, error);
			} else {
				if (this.waitedListeners.has(`${formName}_${fieldName}`)) {
					this.waitedListeners.set(`${formName}_${fieldName}`, [
						...this.waitedListeners.get(`${formName}_${fieldName}`),
						listener,
					]);
				} else {
					this.waitedListeners.set(`${formName}_${fieldName}`, [listener]);
				}
			}
		},

		/**
		 * Subscriber
		 */
		subscribeField(formName, fieldName, listener) {
			if (this.fieldListeners.has(`${formName}_${fieldName}`)) {
				this.fieldListeners.set(`${formName}_${fieldName}`, [
					...this.fieldListeners.get(`${formName}_${fieldName}`),
					listener,
				]);
			} else {
				this.fieldListeners.set(`${formName}_${fieldName}`, [listener]);
			}
		},

		/**
		 * Unsubscribe
		 */
		unsubscribe(formname) {
			if (this.formListeners.has(formname)) {
				this.formListeners.delete(formname);
			}
		},

		/**
		 * Unsubscribe Field
		 */
		unsubscribeField(formName, fieldName) {
			if (this.fieldListeners.has(`${formName}_${fieldName}`)) {
				this.fieldListeners.delete(`${formName}_${fieldName}`);
			}
		},

		/**
		 * Unsubscribe all Fields
		 */
		unsubscribeFields(formName) {
			this.getFieldKeys(formName).forEach((fieldName) => {
				this.unsubscribeField(formName, fieldName);
			});
		},

		/**
		 * Unsubscribe single Error
		 */
		unsubscribeError(formName, fieldname) {
			if (this.errorListeners.has(`${formName}_${fieldname}`)) {
				this.errorListeners.delete(`${formName}_${fieldname}`);
			}
		},

		/**
		 * Unsubscribe all Errors
		 */
		unsubscribeErrors(formName) {
			this.getFieldKeys(formName).forEach((fieldName) => {
				this.unsubscribeError(formName, fieldName);
			});
		},

		/**
		 * Delete listeners of a single form
		 */
		delete(formName) {
			if (!this.forms.has(formName)) {
				return;
			}

			this.unsubscribeErrors(formName);
			this.unsubscribeFields(formName);
			this.unsubscribe(formName);
			this.forms.delete(formName);
		},

		/**
		 * Listen to event
		 */
		_listen(formName, fieldName, value) {
			//form event
			if (this.formListeners.has(formName)) {
				const events = this.formListeners.get(formName);
				events.forEach((event: any) => {
					event(value, fieldName);
				});
			}
			//Field event
			if (this.fieldListeners.has(`${formName}_${fieldName}`)) {
				const fieldEvents = this.fieldListeners.get(`${formName}_${fieldName}`);
				fieldEvents.forEach((event: any) => {
					event(value, fieldName);
				});
			}
		},

		/**
		 * Listen to event
		 */
		checkError(formName, fieldName, value) {
			//Field event
			if (this.errorListeners.has(`${formName}_${fieldName}`)) {
				const fieldEvents = this.errorListeners.get(`${formName}_${fieldName}`);
				const result = fieldEvents.data
					.map((event: any) => {
						const validationResult = event.validation(value, event.options);
						if (!validationResult) {
							this._setError(formName, fieldName, event.validationType, event.message);
						} else {
							this.removeError(formName, fieldName, event.validationType);
						}
						return {
							name: event.validationType,
							message: event.message(value, fieldName),
							valid: validationResult,
						} as FieldError;
					})
					.filter((err: any) => err);
				fieldEvents.functions.forEach((customFunction: any) => {
					customFunction(value, result);
				});
			}
		},

		/**
		 * Set error
		 */
		_setError(formName, fieldName, errorName, error) {
			if (!formName || !fieldName || !errorName) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				return;
			}
			form._setError(fieldName, errorName, error);
		},

		/**
		 * Set error
		 */
		setError(formName, fieldName, error) {
			if (!formName || !fieldName) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				return;
			}
			this._subscribeError(`${formName}_${fieldName}`, {
				custom: true,
				validation: () => false,
				options: null,
				validationType: 'custom',
				message: () => error,
			});
		},

		/**
		 * Set error
		 */
		removeError(formName, fieldName, errorName) {
			if (!formName || !fieldName || !errorName) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				return;
			}
			form.removeError(fieldName, errorName);
		},

		/**
		 *
		 */
		getError(formName, fieldName, errorName) {
			if (!formName || !fieldName) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				return;
			}
			return form.getError(fieldName, errorName);
		},

		/**
		 * Get all errors of a form
		 */
		getErrors(formName) {
			if (!formName) {
				return new Map();
			}

			const form = this.getForm(formName);
			if (!form) {
				return new Map();
			}
			return form.getErrors();
		},

		/**
		 * Validate form
		 */
		validate(formName) {
			this.errorListeners.forEach((data: any, key: string) => {
				if (key.includes(formName)) {
					const [newFormName, ...rest] = key.split('_');
					const fieldName = rest.join('_');
					this.checkError(newFormName, fieldName, this.getValue(newFormName, fieldName));
				}
			});
			const errors = this.getErrors(formName);
			if (errors.size) {
				const mappedErrors = errors.keys();
				const first = mappedErrors.next();
				const fields = first.value.split('_');
				fields.pop();
				const field = fields.join('_');
				const element = document.getElementById(`${formName}_${field}`);
				if (element) {
					element.focus();
				}
			}
			return {
				valid: !errors.size,
				errors,
			};
		},

		/**
		 * Get classname of the form
		 */
		getClassName(formName) {
			if (!formName) {
				return '';
			}

			const form = this.getForm(formName);
			if (!form) {
				return '';
			}
			return form.className;
		},

		/**
		 * Remove all custom errors
		 */
		removeCustomErrors(formName, fieldName) {
			this._unsubscribeCustomErrors(`${formName}_${fieldName}`);
			if (this.errorListeners.has(`${formName}_${fieldName}`)) {
				const fieldEvents = this.errorListeners.get(`${formName}_${fieldName}`);
				const value = this.getValue(formName, fieldName);
				const result = fieldEvents.data.map((event: any) => {
					let validationResult = false;
					if (event.custom) {
						this.removeError(formName, fieldName, event.validationType);
						validationResult = true;
					}
					return {
						name: event.validationType,
						message: event.message(value, fieldName),
						valid: validationResult,
					};
				});
				fieldEvents.functions.forEach((customFunction: any) => {
					customFunction(value, result);
				});
			}
		},
		/**
		 * Set new condition used in any page
		 */
		setCondition(...args) {
			let [
				depFormName, //required
				depFieldName, //required
				valueFunction, //Can be string or function
				formName, //required
				fieldName, //optional
			] = args;

			// Check if fieldname is undefined, if it's not set a empty string to it
			if (!fieldName) {
				fieldName = '';
			}

			// If the type of variable valuefunction is a string then make a function of this string
			if (typeof valueFunction === 'string') {
				const val = valueFunction;
				valueFunction = (value: string) => val === value;
			}

			if (!Array.isArray(fieldName)) {
				fieldName = [fieldName];
			}

			// Check if the listener allready exists in conditionListeners, if it's not set condition
			fieldName.forEach((name) => {
				if (!this.conditionListeners.has(`${formName}_${name}`)) {
					this.conditionListeners.set(`${formName}_${name}`, {
						depFormName,
						depFieldName,
						functions: [],
					});
				}
			});

			// Subscribe to this field when page is loaded, if it's not the subscribe will work when field value changed
			fieldName.forEach((name) => {
				this.subscribeField(depFormName, depFieldName, (value: string) => {
					const result = valueFunction(value);
					const events = this.conditionListeners.get(`${formName}_${name}`);
					if (events) {
						if (Array.isArray(events.functions)) {
							events.functions.forEach((event: any) => {
								event(result);
							});
						}
					}
				});
			});
		},

		/**
		 * Subscribe to a condition, used in ui-fields
		 */
		subscribeCondition(name, listener) {
			// if condition already exists in conditionListeners, get condition and push listener to this condition
			if (this.conditionListeners.has(name)) {
				const conditions = this.conditionListeners.get(name);
				conditions.functions.push(listener);
				this.conditionListeners.set(name, conditions);

				// makes a listener for a specific field
				this._listen(
					conditions.depFormName,
					conditions.depFieldName,
					this.getValue(conditions.depFormName, conditions.depFieldName)
				);
			}
		},

		/**
		 * Unsubscribe to a condition, used in ui-fields
		 */
		unsubscribeCondition(formName, fieldName) {
			// Check if fieldName is empty, if it is empty make an empty string
			if (!fieldName) {
				fieldName = '';
			}

			// If conditionListener is in this.conditionListeners then remove from the list
			if (this.conditionListeners.has(`${formName}_${fieldName}`)) {
				this.conditionListeners.delete(`${formName}_${fieldName}`);
			}
		},
	};
}
