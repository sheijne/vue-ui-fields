import uiFieldsInstance from './instance';

import type { UIFieldsOptions } from './types/options';
import type { Field } from './types/field';

import type _Vue from 'vue';

export default function (options: UIFieldsOptions) {
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
		new(name: string) {
			if (!name) {
				return;
			}

			const form = new uiFieldsInstance(options);
			this.forms.set(name, form);
			return form;
		},

		/**
		 * Set value to array
		 */
		getValue(formName: string, fieldName: string | string[]): string {
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
		getFieldKeys(formName: string): string[] {
			const form = this.getForm(formName);
			if (!form) {
				return [];
			}
			return form.getFieldKeys();
		},

		/**
		 * Get single field
		 */
		getField(formName: string, fieldName: string): Field | undefined {
			const form = this.getForm(formName);
			if (!form) {
				return;
			}
			return form.getField(fieldName);
		},

		/**
		 * Get all fields
		 */
		getFields(formName: string) {
			const form = this.getForm(formName);
			if (!form) {
				return;
			}
			return form.getFields();
		},

		/**
		 * Get form
		 */
		getForm(formName: string) {
			return this.forms.get(formName);
		},

		/**
		 * Get all values mapped
		 */
		getValues(formName: string) {
			if (!formName) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				return;
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
		setField(name: string, options: any) {
			if (!name) {
				return;
			}

			const form = this.getForm(name);
			if (!form) {
				return;
			}
			form.setField(options);
		},

		/**
		 * Set multiple fields
		 * @param {Array} options
		 */
		setFields(name: string, options: any) {
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
		 * @param {String} name
		 * @param {String || Array} value
		 * @param {Boolean} checkError
		 */
		setValue(formName: string, name: string, value: string | string[], checkError: boolean = true) {
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
		subscribe(formName: string, listener: void) {
			if (this.formListeners.has(formName)) {
				this.formListeners.set(formName, [...this.formListeners.get(formName), listener]);
			} else {
				this.formListeners.set(formName, [listener]);
			}
		},

		/**
		 * Subscriber prototype, only used by fields
		 * @param {Object} data
		 */
		_subscribeError(name: string, data: any) {
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
				awaitedListeners.forEach((listener: any) => {
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
		_unsubscribeCustomErrors(name: string) {
			if (this.errorListeners.has(name)) {
				const oldError = this.errorListeners.get(name);
				const data = oldError.data.filter((error: any) => !error.custom);
				this.errorListeners.set(name, { functions: oldError.functions, data });
			}
		},

		/**
		 * Subscriber
		 * @param {Function} listener
		 */
		subscribeError(formName: string, fieldName: string, listener: void) {
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
		subscribeField(formName: string, fieldName: string, listener: any) {
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
		unsubscribe(formname: string) {
			if (this.formListeners.has(formname)) {
				this.formListeners.delete(formname);
			}
		},

		/**
		 * Unsubscribe Field
		 */
		unsubscribeField(formName: string, fieldName: string) {
			if (this.fieldListeners.has(`${formName}_${fieldName}`)) {
				this.fieldListeners.delete(`${formName}_${fieldName}`);
			}
		},

		/**
		 * Unsubscribe all Fields
		 */
		unsubscribeFields(formName: string) {
			this.getFieldKeys(formName).forEach((fieldName) => {
				this.unsubscribeField(formName, fieldName);
			});
		},

		/**
		 * Unsubscribe single Error
		 */
		unsubscribeError(formName: string, fieldname: string) {
			if (this.errorListeners.has(`${formName}_${fieldname}`)) {
				this.errorListeners.delete(`${formName}_${fieldname}`);
			}
		},

		/**
		 * Unsubscribe all Errors
		 */
		unsubscribeErrors(formName: string) {
			this.getFieldKeys(formName).forEach((fieldName) => {
				this.unsubscribeError(formName, fieldName);
			});
		},

		/**
		 * Delete listeners of a single form
		 */
		delete(formName: string) {
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
		_listen(formName: string, fieldName: string, value: string | string[]) {
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
		checkError(formName: string, fieldName: string, value: string | string[]) {
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
						};
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
		_setError(formName: string, fieldName: string, errorName: string, error: string) {
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
		setError(formName: string, fieldName: string, error: string) {
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
		removeError(formName: string, fieldName: string, errorName: string) {
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
		getError(formName: string, fieldName: string) {
			if (!formName || !fieldName) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				return;
			}
			return form.getError(fieldName);
		},

		/**
		 * Get all errors of a form
		 */
		getErrors(formName: string) {
			if (!formName) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				return;
			}
			return form.getErrors();
		},

		/**
		 * Validate form
		 */
		validate(formName: string) {
			this.errorListeners.forEach((data, key) => {
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
		getClassName(formName: string) {
			if (!formName) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				return;
			}
			return form.className;
		},

		/**
		 * Remove all custom errors
		 */
		removeCustomErrors(formName: string, fieldName: string) {
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
		setCondition(...args: [string, string, any, string, string | string[]]) {
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
		subscribeCondition(name: string, listener: void) {
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
		 * @param required {String} formName - name of form from condition
		 * @param optional {Array, String} fieldName - name of field from condition
		 */
		unsubscribeCondition(formName: string, fieldName: string) {
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
