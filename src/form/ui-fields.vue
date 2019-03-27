<template>
	<div>fissa</div>
</template>

<script>
export default {
	props: {
		fieldName: {
			type: String,
			default: 'form'
		}
	},
	data() {
		return {
			uiFieldsData: {}
		};
	},
	computed: {
		uiFields: {
			get: function() {
				return this.$store.state.uiFields.fields;
			}
		}
	},
	watch: {
		uiFields: {
			handler() {
				if (this.findCorrectFields(this.uiFields)) {
					this.uiFieldsData = this.findCorrectFields(this.uiFields);
				}
				this.$forceUpdate();
			},
			deep: true
		}
	},
	beforeCreate() {
		this.$store.dispatch('uiFields/resetFields');
	},
	methods: {
		findCorrectFields(fields) {
			return fields.find((field) => field.key === this.$props.fieldName) || [];
		},
		conditions(fields) {
			return fields.data.map((field) => {
				if (field.data) {
					return field.data.map((secondField) => {
						if (secondField.conditional) {
							return secondField.conditional.show;
						}
					});
				}
			});
		},
		checkCondition(input) {
			if (input) {
				return input.show;
			} else {
				return true;
			}
		},
		checkTextField(type) {
			if (type === 'text' || type === 'number' || type === 'email' || type === 'tel' || type === 'password') return true;
		}
	}
};
</script>
