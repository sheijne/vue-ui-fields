export default {
	props: {
		fieldIndex: {
			type: Number,
			default: 0
		},
		fieldName: {
			type: String,
			default: null
		},
		depth: {
			type: String,
			default: null
		},
		iconName: {
			type: String,
			default: null
		}
	},
	computed: {
		fieldData: {
			get: function() {
				return this.findCorrectFields(this.$store.state.uiFields.fields);
			}
		},
		fieldDataValue: {
			get: function() {
				return this.findCorrectFields(this.$store.state.uiFields.fields).value;
			},
			set: function(newValue) {
				this.$store.dispatch('uiFields/updateFieldValue', {
					name: this.$props.fieldName,
					depth: this.$props.depth,
					index: this.$props.fieldIndex,
					value: newValue
				});
			}
		}
	},
	mounted() {
		if (this.$refs.input) {
			this.$refs.input.setAttribute('attr-henkie', 'hoi');
		}
	},
	methods: {
		findCorrectFields(fields) {
			const newField = fields.find((field) => field.key === this.$props.fieldName) || [];
			if (newField) {
				const selectedField = newField.data.find((field) => field.key === this.$props.depth);
				if (selectedField) {
					return selectedField.data[this.$props.fieldIndex];
				}
			}
			return [];
		},
		createLabel(text) {
			if (text) {
				if (text.indexOf('attribute_') !== -1) {
					//name starts with attribute and we need the last name then we format it
					let newText = text.split('_');
					newText = newText[newText.length - 1];
					return newText.charAt(0).toUpperCase() + newText.slice(1);
				} else {
					return text;
				}
			}
		}
	}
};
