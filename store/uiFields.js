export const state = () => ({
	fields: []
});

export const mutations = {
	setSingleField(state, singleField) {
		state.fields = [singleField];
	},
	updateField(state, updateOptions) {
		const newField = state.fields.find((field) => field.key === updateOptions.name);
		if (newField) {
			const selectedField = newField.data.find((field) => field.key === updateOptions.depth);
			if (selectedField) {
				const fieldWeNeed = selectedField.data[updateOptions.index];
				fieldWeNeed.value = updateOptions.value;
				selectedField.data.forEach((field) => {
					if (field.conditional) {
						const isValue = selectedField.data.find((newField) => newField.name === field.conditional.key);
						if (typeof field.conditional.value === 'function') {
							if (field.conditional.value(isValue.value)) {
								field.conditional.show = true;
							} else {
								field.conditional.show = false;
							}
						} else {
							if (isValue && isValue.value === field.conditional.value) {
								field.conditional.show = true;
							} else {
								field.conditional.show = false;
							}
						}
					}
				});
			}
		}
		const data = state.fields;
		data.forEach((firstLayer) => {
			const fieldSet = firstLayer.data.find(
				(field) => field.conditional && field.conditional.depth === updateOptions.depth
			);
			if (fieldSet) {
				if (fieldSet.conditional.value === updateOptions.value) {
					fieldSet.conditional.show = true;
				} else {
					fieldSet.conditional.show = false;
				}
			}
		});
	}
};

export const actions = {
	setField({ commit }, field) {
		commit('setSingleField', field);
	}
};
