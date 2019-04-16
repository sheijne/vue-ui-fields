class uiFieldsInstance {
	constructor(options) {
		this.formFields = this.init(options);
	}
	init(options) {
		return this.checkParams(options);
	}
	getFieldSettings() {
		return this.formFields;
	}
	getFieldSets() {
		return this.formFields.data;
	}
	getFieldSetByName(name) {
		return this.formFields.data.find((field) => field.key === name);
	}
	setNewCondition(options) {
		if (options) {
			if (Array.isArray(options)) {
				options.forEach((option) => this.createCondtion(option));
			} else {
				this.createCondtion(options);
			}
		}
	}
	setFieldSet(fieldSet) {
		if (Array.isArray(fieldSet)) {
			//we need a for each with an helper function
			fieldSet.forEach((field) => {
				const val = this.checkParams(field, 1);
				if (val) this.formFields.data.push(val);
			});
		} else if (typeof fieldSet === 'object' && fieldSet !== null) {
			const val = this.checkParams(fieldSet, 1);
			if (val) this.formFields.data.push(val);
		}
	}
	setField(options) {
		if (options) {
			if (Array.isArray(options)) {
				options.forEach((option) => {
					if (option.depth) {
						const data = this.getFieldSetByName(option.depth);
						if (data) {
							if (!data.data) data.data = [];
							data.data.push(this.checkParams(option, 2));
						} else {
							//if fieldset does not exist and we want to create a new fieldset
							if (option.createNewFieldset) {
								this.setFieldSet({
									key: option.depth,
									container: option.container
								});
								this.setField(option);
							} else {
								this.createWarning('Depth does not exists');
							}
						}
					}
				});
			} else {
				if (options.depth) {
					const data = this.getFieldSetByName(options.depth);
					if (data) {
						if (!data.data) data.data = [];
						data.data.push(this.checkParams(options, 2));
					} else {
						//if fieldset does not exist and we want to create a new fieldset
						if (options.createNewFieldset) {
							this.setFieldSet({
								key: options.depth,
								container: options.container
							});
							this.setField(options);
						} else {
							this.createWarning('Depth does not exists');
						}
					}
				}
			}
		}
	}
	setClass(options) {
		if (options) {
			let values = Array.isArray(options.value)
				? options.value
				: [options.value];

			if (options.depth) {
				//on field
				const fieldSet = this.getFieldSetByName(options.depth);
				if (Array.isArray(options.key)) {
					//multiple keys / fields
					options.key.forEach((key) => {
						const field = fieldSet.data.find((field) => key === field.name);
						if (field) {
							field.container.classes = [...field.container.classes, ...values];
						}
					});
				} else {
					//single field
					const field = fieldSet.data.find(
						(field) => options.key === field.name
					);
					if (field) {
						field.container.classes = [...field.container.classes, ...values];
					}
				}
			} else {
				//on fieldset
				if (Array.isArray(options.key)) {
					//multiple keys / fieldSets
					options.key.forEach((key) => {
						const field = this.getFieldSetByName(key);
						if (field) {
							field.container.classes = [...field.container.classes, ...values];
						}
					});
				} else {
					//single fieldSet
					const field = this.getFieldSetByName(options.key);
					if (field) {
						field.container.classes = [...field.container.classes, ...values];
					}
				}
			}
		}
	}
	setExtraCustomData(defaultOptions, optionsDup) {
		let newData = {};
		//fill defaultOptions in newData and delete prop of dubplicate
		defaultOptions.forEach((option) => {
			newData[option.key] = optionsDup[option.key] || option.value;
			if (typeof optionsDup[option.key] !== 'undefined') {
				delete optionsDup[option.key];
			}
		});

		//add extra data if there is any
		if (Object.keys(optionsDup).length) {
			const { customData } = optionsDup;
			if (customData) {
				newData.customData = { ...optionsDup, ...customData };
			} else {
				newData.customData = optionsDup;
			}
		}
		return newData;
	}
	getDefaultOptions(depth) {
		if (depth < 2) {
			//defaultOptions of form and fieldset
			return [
				{
					key: 'key',
					value: 'form'
				},
				{
					key: 'data',
					value: []
				},
				{
					key: 'container',
					value: {}
				}
			];
		} else {
			//field has different settings
			return [
				{
					key: 'name',
					value: ''
				},
				{
					key: 'value',
					value: ''
				},
				{
					key: 'label',
					value: ''
				},
				{
					key: 'type',
					value: 'text'
				},
				{
					key: 'required',
					value: false
				},
				{
					key: 'requiredText',
					value: '*'
				},
				{
					key: 'options',
					value: []
				},
				{
					key: 'maxLength',
					value: null
				},
				{
					key: 'minLength',
					value: null
				},
				{
					key: 'placeholder',
					value: ''
				},
				{
					key: 'container',
					value: {}
				},
				{
					key: 'component',
					value: {}
				},
				{
					key: 'errors',
					value: {}
				}
			];
		}
	}
	checkParams(options, depth = 0) {
		//depth, 0 is form, 1 is fieldset, 2 is field
		if (typeof options !== 'object') options = {};
		//make dubplicate of options
		const optionsDup = { ...options };
		//create variable defaultOptions
		let newData = this.setExtraCustomData(
			this.getDefaultOptions(depth),
			optionsDup
		);

		depth++;

		//if object has data check the data aswell
		if (newData.data && Array.isArray(newData.data)) {
			newData.data = newData.data
				.map((data) => this.checkParams(data, depth))
				.filter((data) => data);
		}

		//create component name based on depth, options: div, fieldset, undefined
		if (!newData.container.component)
			newData.container.component = depth === 1 ? 'fieldset' : 'div';

		//if no classes add those
		if (!newData.container.classes) newData.container.classes = [];

		//if classes is string and not array make array
		if (!Array.isArray(newData.container.classes)) {
			newData.container.classes = [newData.container.classes];
		}

		//if type of field is select make middle standard selected
		if (newData.type === 'select' || newData.type === 'radio') {
			if (!newData.options.find((input) => input.selected)) {
				newData.value = newData.options[0].value;
				newData.options[0].selected = true;
			} else {
				const value = newData.options.find((input) => input.selected).value;
				newData.value = value;
			}
		}

		newData.load = this.createLoadData(newData);

		return newData;
	}
	createLoadData(data) {
		let component;
		switch (data.type) {
			case 'text':
				component = 'uiText';
				break;
			case 'select':
				component = 'uiSelect';
				break;
			case 'checkbox':
				component = 'uiCheckbox';
				break;
			case 'radio':
				component = 'uiRadio';
				break;
			case 'number':
				component = 'uiText';
				break;
			case 'email':
				component = 'uiText';
				break;
			case 'tel':
				component = 'uiText';
				break;
			case 'password':
				component = 'uiText';
				break;
		}
		return {
			name: component,
			type: data.type
		};
	}
	createCondtion(options) {
		//check if object
		let fieldSet;
		if (typeof options === 'object') {
			//place keys in array
			if (!Array.isArray(options.key)) options.key = [options.key];
			//data we are working with
			const data = this.getFieldSets();
			//if options depth that means we have fields inside a fieldset
			if (options.depth) {
				//if depth we define condition on field
				fieldSet = data.find((field) => field.key === options.depth);
			} else {
				//there is no depth and we filter a whole fieldset?
				fieldSet = data.find((field) => field.key === options.condition.depth);
			}
			//fieldSet is the depth we want to define condition
			if (fieldSet) {
				//elExists is the field we want where we get the value of the condition
				const elExists = fieldSet.data.find(
					(field) => field.name === options.condition.key
				);
				if (elExists) {
					//forEach field we want to create the logic
					options.key.forEach((name) => {
						//get the fields that match the element name, returns field
						let newField;
						if (options.depth) {
							newField = fieldSet.data.filter((field) => field.name === name);
						} else {
							newField = data.filter((field) => field.key === name);
						}

						//for each cause input fields can have same name, now its more forgiving
						newField.forEach((allFields) => {
							let val;
							if (typeof options.condition.value === 'function') {
								val = options.condition.value(elExists.value);
							} else {
								val = elExists.value === options.condition.value;
							}
							if (allFields) {
								allFields.conditional = {
									depth: options.depth || options.condition.depth,
									key: options.condition.key,
									value: options.condition.value,
									show: val
								};
							}
						});
					});
				} else {
					this.createWarning(
						'The field you entered does not exists, this condition will be ignored'
					);
				}
			} else {
				//fieldset does not exists
				if (options.accros) {
					options.key.forEach((name) => {
						const newField = data.filter((field) => field.key === name);
						newField.forEach((allFields) => {
							if (allFields) {
								allFields.conditional = {
									depth: options.condition.depth,
									key: options.condition.key,
									value: options.condition.value,
									show: options.accrosValue
								};
							}
							this.formFields.accros = true;
						});
					});
				} else {
					this.createWarning(
						'The fieldset you entered does not exists, this condition will be ignored'
					);
				}
			}
		}
	}
	//disabled eslint for the next line cause I need to create a warning for the developers
	/* eslint-disable */
	createWarning(message) {
		console.warn(message);
	}
	/* eslint-enable */
}

Array.prototype.getSingleUiField = function(name) {
	if (name) {
		if (this.length) {
			return this.find((field) => field.name === name);
		}
	}
	return null;
};

//global mixin functions
import Vue from 'vue';

Vue.mixin({
	methods: {
		createNewUiFieldsInstance(options) {
			return new uiFieldsInstance(options);
		},
		getClasses(classes, name = '') {
			if (classes.length) {
				return classes.map((clas) => `${clas}${name}`);
			}
			return '';
		},
		getCorrectFieldSet(options) {
			if (options) {
				const uiField = this.$store.state.uiFields.fields;
				if (options.formName) {
					const form = uiField.find((form) => form.key === options.formName);
					if (form && form.data) {
						if (options.fieldsetName) {
							const fieldSet = form.data.find(
								(fieldset) => fieldset.key === options.fieldsetName
							);
							if (fieldSet && fieldSet.data) {
								return fieldSet.data;
							}
						}
					}
				}
			}
			throw `The fields you asked for does not exist: ${options.formName} ${JSON.stringify(options)}`;
		},
		getCorrectField(options) {
			const fieldSet = this.getCorrectFieldSet(options);
			if (typeof fieldSet === 'object') {
				if (fieldSet.length) {
					return fieldSet.find((field) => field.name === options.fieldName);
				}
			}
			throw `The fields you asked for does not exist: ${options.fieldName} ${JSON.stringify(options)}`;
		}
	}
});

import VeeValidate from 'vee-validate';

Vue.use(VeeValidate, {
	events: 'blur'
});

export default new uiFieldsInstance();
