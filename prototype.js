import uiFieldsInstance	from './instance.js';

export default function(options, Vue) {
	const uiFieldsInstanceClass = uiFieldsInstance(options, Vue);
	return {
		/**
		 * Current form instance
		 */
		className: options.className,
		forms: new Map(),
		formListeners: new Map(),
		fieldListeners: new Map(),
		errorListeners: new Map(),
		waitedListeners: new Map(),
		/**
		 * Create a new form
		 * @param {String} name
		 */
		new(name, data) {
			if (!name) {
				return;
			}

			const form = new uiFieldsInstanceClass(name, data);
			this.forms.set(name, form);
			return form;
		},

		/**
		 * Set value to array
		 * @param {String} formName
		 * @param {String || Array} value
		 */
		getValue(formName, name) {
			if (!formName || !name) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				console.log('No form found');
				return;
			}
			return form.getValue(name);
		},

		/**
		 * Get all fields of formname
		 * @param {String} formName
		 */
		getFieldKeys(formName) {
			const form = this.getForm(formName);
			if (!form) {
				return;
			}
			return form.getFieldKeys();
		},

		/**
		 * Get single field
		 * @param {String} formName
		 * @param {String} fieldName
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
		 * @param {String} formName
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
		 * @param {String} name
		 */
		getForm(name) {
			return this.forms.get(name);
		},

		/**
		 * Get all values mapped
		 */
		getValues(formName) {
			if (!formName) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				console.log('No form found');
				return;
			}
			return [...form.values.values()];
		},

		/**
		 * Get all values mapped
		 */
		getFormattedValues(formName) {
			if (!formName) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				console.log('No form found');
				return;
			}
			return form.getFormattedValues();
		},

		/**
		 * Set new field
		 * @param {String} name
		 * @param {Object} options
		 */
		setField(name, options) {
			if (!name) {
				return;
			}

			const form = this.getForm(name);
			if (!form) {
				console.log('No form found');
				return;
			}
			form.setField(options);
		},

		/**
		 * Set multiple fields
		 * @param {name} name
		 * @param {Array} options
		 */
		setFields(name, options) {
			if (!name) {
				return;
			}

			const form = this.getForm(name);
			if (!form) {
				console.log('No form found');
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
		setValue(formName, name, value, checkError = true) {
			if (!formName || !name) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				console.log('No form found');
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
		 * @param {String} formName
		 * @param {Function} listener
		 */
		subscribe(formName, listener) {
			if (this.formListeners.has(formName)) {
				this.formListeners.set(formName, [
					...this.formListeners.get(formName),
					listener,
				]);
			} else {
				this.formListeners.set(formName, [listener]);
			}
		},

		/**
		 * Subscriber prototype, only used by fields
		 * @param {String} name
		 * @param {Object} data
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
				awaitedListeners.forEach((listener) => {
					const [formName, ...rest] = name.split('_');
					const fieldName = rest.join('_');
					this.subscribeError(formName, fieldName, listener);
				});
				this.waitedListeners.delete(name);
			}
		},

		/**
		 * Unsubscriber custom errors prototype, only used by fields
		 * @param {String} name
		 * @param {Object} data
		 */
		_unsubscribeCustomErrors(name) {
			if (this.errorListeners.has(name)) {
				const oldError = this.errorListeners.get(name);
				const data = oldError.data.filter((error) => !error.custom);
				this.errorListeners.set(name, { functions: oldError.functions, data });
			}
		},

		/**
		 * Subscriber
		 * @param {String} formName
		 * @param {Function} listener
		 */
		subscribeError(formName, fieldName, listener) {
			if (this.errorListeners.has(`${formName}_${fieldName}`)) {
				const error = this.errorListeners.get(`${formName}_${fieldName}`);
				error.functions.push(listener);
				this.errorListeners.set(`${formName}_${fieldName}`, error);
			} else {
				if (this.waitedListeners.has(`${formName}_${fieldName}`)) {
					this.waitedListeners.set(`${formName}_${fieldName}`, [...this.waitedListeners.get(`${formName}_${fieldName}`), listener]);
				} else {
					this.waitedListeners.set(`${formName}_${fieldName}`, [listener])
				}
			}
		},

		/**
		 * Subscriber
		 * @param {String} formName
		 * @param {Function} listener
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
		 * @param {String} formname
		 */
		unsubscribe(formname) {
			if (this.formListeners.has(formname)) {
				this.formListeners.delete(formname);
			}
		},

		/**
		 * Unsubscribe Field
		 * @param {String} formname
		 * @param {String} fieldName
		 */
		unsubscribeField(formName, fieldName) {
			if (this.fieldListeners.has(`${formName}_${fieldName}`)) {
				this.fieldListeners.delete(`${formName}_${fieldName}`);
			}
		},

		/**
		 * Unsubscribe all Fields from form
		 * @param {String} formname
		 */
		unsubscribeFields(formName) {
			for (let listener of this.fieldListeners.keys()) {
				if(listener.startsWith(formName)) {
					this.fieldListeners.delete(`${listener}`);
				}
			}
		},

		/**
		 * Listen to event
		 * @param {String} formName
		 * @param {String} fieldName
		 * @param {String} value
		 */
		_listen(formName, fieldName, value) {
			//form event
			if (this.formListeners.has(formName)) {
				const events = this.formListeners.get(formName);
				events.forEach((event) => {
					event(value, fieldName);
				});
			}
			//Field event
			if (this.fieldListeners.has(`${formName}_${fieldName}`)) {
				const fieldEvents = this.fieldListeners.get(`${formName}_${fieldName}`);
				fieldEvents.forEach((event) => {
					event(value, fieldName);
				});
			}
		},

		/**
		 * Listen to event
		 * @param {String} formName
		 * @param {String} fieldName* @param {String} value
		 */
		checkError(formName, fieldName, value) {
			//Field event
			if (this.errorListeners.has(`${formName}_${fieldName}`)) {
				const fieldEvents = this.errorListeners.get(`${formName}_${fieldName}`);
				const result = fieldEvents.data
					.map((event) => {
						const validationResult = event.validation(value, event.options);
						if (!validationResult) {
							this._setError(
								formName,
								fieldName,
								event.validationType,
								event.message
							);
						} else {
							this.removeError(formName, fieldName, event.validationType);
						}
						return {
							name: event.validationType,
							message: event.message(value, fieldName),
							valid: validationResult,
						};
					})
					.filter((err) => err);
				fieldEvents.functions.forEach((customFunction) => {
					customFunction(value, result);
				});
			}
		},

		/**
		 * Set error
		 * @param {String} formname
		 * @param {String} fieldName
		 * @param {String} errorName
		 * @param {String} error - message
		 */
		_setError(formName, fieldName, errorName, error) {
			if (!formName || !fieldName || !errorName) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				console.log('No form found');
				return;
			}
			form._setError(fieldName, errorName, error);
		},

		/**
		 * Set error
		 * @param {String} formname
		 * @param {String} fieldName
		 * @param {String} errorName
		 * @param {String} error - message
		 */
		setError(formName, fieldName, error) {
			if (!formName || !fieldName) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				console.log('No form found');
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
		 * @param {String} formname
		 * @param {String} fieldName
		 * @param {String} errorName
		 */
		removeError(formName, fieldName, errorName) {
			if (!formName || !fieldName || !errorName) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				console.log('No form found');
				return;
			}
			form.removeError(fieldName, errorName);
		},

		/**
		 *
		 * @param {String} formName
		 * @param {String} fieldName
		 */
		getError(formName, fieldName) {
			if (!formName || !fieldName) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				console.log('No form found');
				return;
			}
			return form.getError(fieldName);
		},

		/**
		 * Get all errors of a form
		 * @param {String} formName
		 */
		getErrors(formName) {
			if (!formName) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				console.log('No form found');
				return;
			}
			return form.getErrors();
		},

		/**
		 * Validate form
		 * @param {String} formName
		 */
		validate(formName) {
			this.errorListeners.forEach((data, key) => {
				if (key.includes(formName)) {
					const [newFormName, ...rest] = key.split('_');
					const fieldName = rest.join('_');
					this.checkError(
						newFormName,
						fieldName,
						this.getValue(newFormName, fieldName)
					);
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
		 * @param {String} formName
		 */
		getClassName(formName) {
			if (!formName) {
				return;
			}

			const form = this.getForm(formName);
			if (!form) {
				console.log('No form found');
				return;
			}
			return form.className;
		},

		/**
		 * Remove all custom errors
		 * @param {String} formName
		 * @param {String} fieldName
		 */
		removeCustomErrors(formName, fieldName) {
			this._unsubscribeCustomErrors(`${formName}_${fieldName}`);
			if (this.errorListeners.has(`${formName}_${fieldName}`)) {
				const fieldEvents = this.errorListeners.get(`${formName}_${fieldName}`);
				const value = this.getValue(formName, fieldName);
				const result = fieldEvents.data.map((event) => {
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
				fieldEvents.functions.forEach((customFunction) => {
					customFunction(value, result);
				});
			}
		},
		gfapi: {
			async submit(formID) {
				const result = Vue.prototype.$uiFields.validate(formID);
				if (result.valid) {
					const form = Vue.prototype.$uiFields.getForm(formID);
					if (!form) {
						console.log('No form found');
						return;
					}
					if (form.includesFile) {
						return this.submitFiles(formID, form);
					}


					const data = Vue.prototype.$uiFields.getFormattedValues(String(formID));
					const response = await fetch(
						`${options.baseURL}/wp-json/matise/utilities/gfapi/${formID}?path=${window.location.pathname}&${window.location.search.substr(1)}`, {
							method: 'POST', // *GET, POST, PUT, DELETE, etc.
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(data),
						}
					).then((response) => response.json());
					return this.handleFormSubmission(response);
				}
			},
			async submitFiles(formID, form) {
				const data = Vue.prototype.$uiFields.getFormattedValues(String(formID));
				const formData = new FormData();

				Object.keys(data).forEach((key) => {
					const field = form.getField(key);
					const value = data[key];
					if (field.type !== 'file') {
						formData.append(key + '_field', value);
					} else {
						formData.append(key, value);
					}
				});
				let URL = `${options.baseURL}/wp-json/matise/utilities/gfapi/${formID}?path=${window.location.pathname}`;
				if (window.location.search.substr(1)) {
					URL += `&${window.location.search.substr(1)}`;
				}
				const response = await fetch(URL, {
					method: 'POST', // *GET, POST, PUT, DELETE, etc.
					body: formData
				}).then((response) => response.json());
				return this.handleFormSubmission(response);
			},
			handleFormSubmission(response) {
				if (response && response.is_valid) {
					switch (response.confirmation_type) {
						case 'redirect':
							window.location = response.confirmation_redirect;
							break;
						case 'message':
							return response.confirmation_message;
					}
				}
			},
			async new(formID) {
				const URL = `${options.baseURL}/wp-json/matise/utilities/gfapi/${formID}?path=${window.location.pathname}`;
				if (window.location.search.substr(1)) {
					URL += `&${window.location.search.substr(1)}`;
				}
				const formData = await fetch(URL).then((response) => response.json());
				if (formData) {
					const id = String(formData.id);
					formData.id = String(id); //Falback for old wp core
					Vue.prototype.$uiFields.new(id);
					Vue.prototype.$uiFields.setFields(id, [...formData.fields]);
					return formData;
				}
			}
		}
	};
}
