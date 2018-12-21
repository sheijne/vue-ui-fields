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
			let values = Array.isArray(options.value) ? options.value : [options.value];

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
					const field = fieldSet.data.find((field) => options.key === field.name);
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
	checkParams(options, depth = 0) {
		let newData = {};
		//depth, 0 is form, 1 is fieldset, 2 is field
		if (typeof options !== 'object') options = {};
		//make dubplicate of options
		const optionsDup = { ...options };
		//create variable defaultOptions
		let defaultOptions = [];
		if (depth < 2) {
			//defaultOptions of form and fieldset
			defaultOptions = [
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
			defaultOptions = [
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
					key: 'options',
					value: []
				},
				{
					key: 'maxLength',
					value: null
				},
				{
					key: 'placeholder',
					value: ''
				},
				{
					key: 'container',
					value: {}
				}
			];
		}
		depth++;

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

		//if object has data check the data aswell
		if (newData.data && Array.isArray(newData.data)) {
			newData.data = newData.data.map((data) => this.checkParams(data, depth)).filter((data) => data);
		}
		//create component name based on depth, options: div, fieldset, undefined
		if (!newData.container.component) newData.container.component = depth === 1 ? 'fieldset' : 'div';
		//if no classes add those
		if (!newData.container.classes) newData.container.classes = [];
		//if classes is string and not array make array
		if (!Array.isArray(newData.container.classes)) {
			newData.container.classes = [newData.container.classes];
		}

		//if type of field is select make middle standard selected
		if (newData.type === 'select' || newData.type === 'radio') {
			if (!newData.options.find((input) => input.selected)) {
				newData.value = newData.options[Math.floor((newData.options.length - 1) / 2)].value;
				newData.options[Math.floor((newData.options.length - 1) / 2)].selected = true;
			} else {
				const value = newData.options.find((input) => input.selected).value;
				newData.value = value;
			}
		}
		return newData;
	}
	createCondtion(options) {
		//check if object
		if (typeof options === 'object') {
			//place keys in array
			if (!Array.isArray(options.key)) options.key = [options.key];
			//data we are working with
			const data = this.getFieldSets();
			if (options.depth) {
				//if depth we define condition on field
				const fieldSet = data.find((field) => field.key === options.depth);
				//fieldSet is the depth we want to define condition
				if (fieldSet) {
					//elExists is the field we want where we get the value of the condition
					const elExists = fieldSet.data.find((field) => field.name === options.condition.key);
					if (elExists) {
						//forEach field we want to create the logic
						options.key.forEach((name) => {
							//get the fields that match the element name, returns field
							const newField = fieldSet.data.filter((field) => field.name === name);

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
										depth: options.depth,
										key: options.condition.key,
										value: options.condition.value,
										show: val
									};
								}
							});
						});
					} else {
						this.createWarning('The field you entered does not exists, this condition will be ignored');
					}
				} else {
					this.createWarning('The fieldset you entered does not exists, this condition will be ignored');
				}
			} else {
				if (options.condition.depth) {
					const fieldSet = data.find((field) => field.key === options.condition.depth);
					if (fieldSet) {
						const elExists = fieldSet.data.find((field) => field.name === options.condition.key);
						if (elExists) {
							options.key.forEach((element) => {
								const newField = data.filter((field) => field.key === element);
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
											depth: options.condition.depth,
											key: options.condition.key,
											value: options.condition.value,
											show: val
										};
									}
								});
							});
						} else {
							this.createWarning('The field you entered does not exists, this condition will be ignored');
						}
					} else {
						this.createWarning('The fieldset you entered does not exists, this condition will be ignored');
					}
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

export default uiFieldsInstance;
