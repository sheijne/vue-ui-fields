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
							data.data.push(this.checkParams(option.data, 2));
						} else {
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
						data.data.push(this.checkParams(options.data, 2));
					} else {
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
	checkParams(options, depth = 0) {
		if (depth < 2) {
			depth++;
			if (typeof options !== 'object') options = {};
			if (!options.key) options.key = 'form';
			if (!options.data) {
				options.data = [];
			} else if (Array.isArray(options.data)) {
				options.data = options.data.map((data) => this.checkParams(data, depth)).filter((data) => data);
			}
			if (!options.container) options.container = {};
			if (!options.container.component) options.container.component = depth === 1 ? 'fieldset' : 'div';
			if (!options.container.classes) options.container.classes = [];

			if (!Array.isArray(options.container.classes)) {
				const value = options.container.classes;
				options.container.classes = [value];
			}
		} else {
			if (typeof options !== 'object') options = {};
			if (!options.label) options.label = '';
			if (!options.name) options.name = '';
			if (!options.value) options.value = '';
			if (!options.type) options.type = 'text';
			if (options.type === 'select') {
				if (!options.options.find((input) => input.selected)) {
					options.value = options.options[Math.floor((options.options.length - 1) / 2)].value;
					options.options[Math.floor((options.options.length - 1) / 2)].selected = true;
				} else {
					options.value = options.options.find((input) => input.selected).value;
				}
			}
		}
		return options;
	}
	createCondtion(options) {
		if (typeof options === 'object') {
			if (!Array.isArray(options.key)) options.key = [options.key];
			const data = this.getFieldSets();
			if (options.depth) {
				const field = data.find((field) => field.key === options.depth);
				if (field) {
					const elExists = field.data.find((field) => field.name === options.condition.key);
					if (elExists) {
						if (options.key) {
							if (!Array.isArray(options.key)) options.key = [options.key];
							options.key.forEach((element) => {
								const newField = field.data.filter((field) => field.name === element);
								//for each cause input fields can have same name, now its more forgiving
								newField.forEach((allFields) => {
									if (allFields) {
										allFields.conditional = {
											depth: options.depth,
											key: options.condition.key,
											value: options.condition.value,
											show: elExists.value === options.condition.value
										};
									}
								});
							});
						}
					} else {
						this.createWarning('The field you entered does not exists, this condition will be ignored');
					}
				} else {
					this.createWarning('The fieldset you entered does not exists, this condition will be ignored');
				}
			} else {
				if (options.condition.depth) {
					const field = data.find((field) => field.key === options.condition.depth);
					if (field) {
						const elExists = field.data.find((field) => field.name === options.condition.key);
						if (elExists) {
							if (options.key) {
								if (!Array.isArray(options.key)) options.key = [options.key];
								options.key.forEach((element) => {
									const newField = data.filter((field) => field.key === element);
									//for each cause input fields can have same name, now its more forgiving
									newField.forEach((allFields) => {
										if (allFields) {
											allFields.conditional = {
												depth: options.condition.depth,
												key: options.condition.key,
												value: options.condition.value,
												show: elExists.value === options.condition.value
											};
										}
									});
								});
							}
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
	//disabled eslint for the next line cause I need a warning for the developers
	/* eslint-disable */
	createWarning(message) {
		console.warn(message);
	}
	/* eslint-enable */
}

import Vue from 'vue';

Vue.mixin({
	methods: {
		createNewUiFieldsInstance(options) {
			return new uiFieldsInstance(options);
		}
	}
});
