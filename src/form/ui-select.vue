<template>
	<div
		:class="getClasses(fieldData.container.classes)"
		class="uiFields__field ui-select"
	>
		<label class="uiFields__element ui-select__element">
			<span
				:class="{ 'ui-select__label--is-required': fieldData.required }"
				class="uiFields__label ui-select__label"
				v-html="createLabel(fieldData)"
			>
			</span>
			<span
				v-if="fieldData.required"
				class="uiFields__label--required ui-text__label ui-text__label--required"
				>{{ fieldData.requiredText }}</span
			>
			<select
				v-validate.continues="getValidationOptions(fieldData.errors)"
				:name="fieldData.name"
				:required="fieldData.required"
				v-model="fieldDataValue"
				class="uiFields__input ui-select__select"
			>
				<option
					v-for="(option, index) in fieldData.options"
					:key="index"
					:value="option.value"
					:disabled="option.disabled"
					>{{ option.label }}</option
				>
			</select>
		</label>
		<component
			v-if="fieldData.component"
			:is="fieldData.component.name"
			v-bind="fieldData.component.props"
			:class="fieldData.component.classes"
			>{{ fieldData.component.content }}</component
		>
		<div
			v-if="fieldData.errors && fieldData.errors.validation"
			class="uiFields__errors ui-select__errors"
		>
			<span
				v-if="errors.collect(fieldData.name).length"
				class="uiFields__error ui-select__error"
				v-html="fieldData.errors.message"
			></span>
		</div>
	</div>
</template>
<script>
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
	methods: {
		findCorrectFields(fields) {
			const newField =
				fields.find((field) => field.key === this.$props.fieldName) || [];
			if (newField) {
				const selectedField = newField.data.find(
					(field) => field.key === this.$props.depth
				);
				if (selectedField) {
					return selectedField.data[this.$props.fieldIndex];
				}
			}
			return [];
		},
		createLabel(text) {
			const textLabel = text.label || text.name;
			if (textLabel) {
				if (textLabel.indexOf('attribute_') !== -1) {
					//name starts with attribute and we need the last name then we format it
					let newText = textLabel.split('_');
					newText = newText[newText.length - 1];
					return newText.charAt(0).toUpperCase() + newText.slice(1);
				} else {
					return textLabel;
				}
			}
		},
		getValidationOptions(input) {
			if (input) {
				if (input.validation) {
					return input.validation;
				}
			}
			return '';
		}
	}
};
</script>
