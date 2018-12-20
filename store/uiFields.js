export const state = () => ({
	fields: []
});

export const mutations = {
	setSingleField(state, singleField) {
		if (!state.fields.map((field) => field.key).includes(singleField.key)) {
			state.fields.push(singleField);
		}
	},
	updateFieldValue(state, options) {
		if (options.fieldSet) {
			const fieldWeNeed = options.fieldSet.data[options.fieldOptions.index];
			//field we need is the field we want to update
			fieldWeNeed.value = options.fieldOptions.value;
			//in this fieldset we want to check condition logic
		}
	},
	updateCondtionLogicField(state, options) {
		//check if field exists with same key
		if (options.fieldSet) {
			//check each field in fieldset
			options.fieldSet.data.forEach((field) => {
				//if conditional logic
				if (field.conditional) {
					//isValue is the field we need for conditional logic
					const isValue = options.fieldSet.data.find((newField) => newField.name === field.conditional.key);
					//check if condition is function or value
					if (isValue) {
						if (typeof field.conditional.value === 'function') {
							//if function then execute function, parms is the value of the
							field.conditional.show = field.conditional.value(isValue.value);
						} else {
							field.conditional.show = isValue.value === field.conditional.value;
						}
					}
				}
			});
		}
	},
	updateCondtionLogicFieldset(state, options) {
		if (options.form && options.form.data) {
			options.form.data.forEach((fieldSet) => {
				//chechk if fieldset has conditional logic
				if (fieldSet.conditional) {
					//find field of conditional logic
					const isValueFieldset = options.form.data.find((isValueField) => isValueField.key === fieldSet.conditional.depth);
					const isValue = isValueFieldset.data.find((isValueField) => isValueField.name === fieldSet.conditional.key);
					//check if condition is function or value
					if (isValue) {
						if (typeof fieldSet.conditional.value === 'function') {
							//if function then execute function, parms is the value of the
							fieldSet.conditional.show = fieldSet.conditional.value(isValue.value);
						} else {
							fieldSet.conditional.show = isValue.value === fieldSet.conditional.value;
						}
					}
				}
			});
		}
	}
};

export const actions = {
	setNewForm({ commit }, field) {
		commit('setSingleField', field);
	},
	async updateFieldValue({ commit, state }, fieldOptions) {
		if (fieldOptions) {
			//find correct form
			const form = state.fields.find((field) => field.key === fieldOptions.name);
			if (form) {
				//check if depth is valid
				const fieldSet = form.data.find((field) => field.key === fieldOptions.depth);
				if (fieldSet) {
					commit('updateFieldValue', { fieldOptions, fieldSet });
					commit('updateCondtionLogicField', { fieldOptions, fieldSet });
					commit('updateCondtionLogicFieldset', { fieldOptions, form });
				}
			}
		}
	}
};
