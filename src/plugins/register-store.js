const mutations = {
	setSingleField(state, singleField) {
		if (!state.fields.map((field) => field.key).includes(singleField.key)) {
			state.fields.push(singleField);
		} else {
			const index = state.fields.findIndex(
				(field) => field.key === singleField.key
			);
			const stateDup = [...state.fields];

			if (index >= 0) {
				stateDup.splice(index, 1);
			}
			stateDup.push(singleField);
			state.fields = stateDup;
		}
		if (singleField.accros) {
			state.accros.push(singleField.key);
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
					const isValue = options.fieldSet.data.find(
						(newField) => newField.name === field.conditional.key
					);
					//check if condition is function or value
					if (isValue) {
						if (typeof field.conditional.value === 'function') {
							//if function then execute function, parms is the value of the
							field.conditional.show = field.conditional.value(isValue.value);
						} else {
							field.conditional.show =
								isValue.value === field.conditional.value;
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
					const isValueFieldset = options.form.data.find(
						(isValueField) => isValueField.key === fieldSet.conditional.depth
					);
					if (isValueFieldset) {
						const isValue = isValueFieldset.data.find(
							(isValueField) => isValueField.name === fieldSet.conditional.key
						);
						//check if condition is function or value
						if (isValue) {
							if (typeof fieldSet.conditional.value === 'function') {
								//if function then execute function, parms is the value of the
								fieldSet.conditional.show = fieldSet.conditional.value(
									isValue.value
								);
							} else {
								fieldSet.conditional.show =
									isValue.value === fieldSet.conditional.value;
							}
						}
					}
				}
			});
		}
	},
	updateConditionLogicFieldsetAcross(state, options) {
		if (state.accros.length) {
			const accros = state.accros;
			accros.forEach((formName) => {
				const form = state.fields.find((field) => field.key === formName);
				if (form) {
					form.data.forEach((data) => {
						if (data.conditional) {
							const fieldWeNeed =
								options.fieldSet.data[options.fieldOptions.index];
							if (fieldWeNeed && fieldWeNeed.name === data.conditional.key) {
								if (data.conditional.depth === options.fieldOptions.depth) {
									if (typeof data.conditional.value === 'function') {
										//if function then execute function, parms is the value of the
										data.conditional.show = data.conditional.value(
											options.fieldOptions.value
										);
									} else {
										data.conditional.show =
											options.fieldOptions.value === data.conditional.value;
									}
								}
							}
						}
					});
				}
			});
		}
	},
	resetFields(state) {
		state.fields = [];
	}
};

const actions = {
	setNewForm({ commit }, field) {
		commit('setSingleField', field);
	},
	updateFieldValue({ commit, state }, fieldOptions) {
		if (fieldOptions) {
			//find correct form
			const form = state.fields.find(
				(field) => field.key === fieldOptions.name
			);
			if (form) {
				//check if depth is valid
				const fieldSet = form.data.find(
					(field) => field.key === fieldOptions.depth
				);
				if (fieldSet) {
					commit('updateFieldValue', { fieldOptions, fieldSet });
					commit('updateCondtionLogicField', { fieldOptions, fieldSet });
					commit('updateCondtionLogicFieldset', { fieldOptions, form });
					commit('updateConditionLogicFieldsetAcross', {
						fieldOptions,
						fieldSet
					});
				}
			}
		}
	},
	resetSingleForm({ dispatch, state }, fieldName) {
		if (fieldName) {
			//find correct form
			const form = state.fields.find((field) => field.key === fieldName);
			if (form) {
				form.data.forEach((data) => {
					data.data.forEach((field, i) => {
						dispatch('updateFieldValue', {
							name: fieldName,
							depth: data.key,
							index: i,
							value: Array.isArray(field.value) ? [] : ''
						});
					});
				});
			}
		}
	},
	resetFields({ commit }) {
		commit('resetFields');
	}
};

export default async ({ store }) => {
	store.registerModule(
		'uiFields',
		{
			namespaced: true,
			state: () => ({
				fields: [],
				accros: []
			}),
			actions: actions,
			mutations: mutations
		},
		{
			preserveState: false
		}
	);
};
