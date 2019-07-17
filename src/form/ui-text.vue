<template>
	<div
		v-if="fieldData"
		:class="[
			`uiFields__field ${component} ${fieldData.HTMLProperties.classes}`,
			!pristine ? `uiFields__field--${fieldData.errors.classes.pristine}` : '',
			pristine && valid === true
				? `uiFields__field--${fieldData.errors.classes.valid}`
				: '',
			pristine && valid === false
				? `uiFields__field--${fieldData.errors.classes.error}`
				: ''
		]"
	>
		<label :class="`uiFields__element ${component}__element`">
			<span
				:class="[
					fieldData.HTMLProperties.required
						? `${component}__label--is-required uiFields__label ${component}__label`
						: `uiFields__label ${component}__label`
				]"
				v-html="fieldData.label"
			>
			</span>
			<span
				v-if="fieldData.HTMLProperties.required"
				:class="
					`uiFields__label--required ${component}__label ${component}__label--required`
				"
			>
				{{ fieldData.uiFieldsData.requiredText }}
			</span>
			<input
				:ref="fieldData.name"
				v-model="fieldDataValue"
				@input="checkErrorsInput"
				@blur="checkErrorsBlur"
				:name="fieldData.name"
				:type="fieldData.type"
				v-bind="fieldData.HTMLProperties"
				:class="`uiFields__input ${component}__input`"
			/>
		</label>
		<component
			v-if="fieldData.component"
			:is="fieldData.component.name"
			v-bind="fieldData.component.props"
			:class="fieldData.component.classes"
		>
			{{ fieldData.component.content }}
		</component>
		<ui-error
			v-if="fieldData.errors.showErrors && fieldData.errors.validation"
			:form-name="formName"
			:fieldset-index="fieldsetIndex"
			:field-index="fieldIndex"
			:component-name="component"
			:classes="fieldData.errors.classes"
		/>
	</div>
</template>
<script>
import mixinSettings from '../plugins/ui-fields-functions';
export default {
	mixins: [mixinSettings],
	data: () => ({
		component: 'ui-text'
	}),
	methods: {
		checkErrorsBlur() {
			if (this.fieldData.errors.event === 'blur') {
				this.checkErrors();
			}
		},
		checkErrorsInput() {
			if (this.fieldData.errors.event === 'input') {
				this.checkErrors();
			}
		},
		checkErrors() {
			const validation = this.fieldData.errors.validation;
			if (validation) {
				validation.forEach((item) => {
					const result = item.validation(this.fieldDataValue);
					if (!result) {
						//there is an error, lets push it to the store (setter)
						this.$store.dispatch('uiFields/setError', {
							formName: this.formName,
							fieldsetIndex: this.fieldsetIndex,
							fieldIndex: this.fieldIndex,
							name: item.name,
							message: item.message,
							value: this.fieldDataValue
						});
						this.valid = false;
					} else {
						this.$store.dispatch('uiFields/removeError', {
							formName: this.formName,
							fieldsetIndex: this.fieldsetIndex,
							fieldIndex: this.fieldIndex,
							name: item.name,
							message: item.message,
							value: this.fieldDataValue
						});
						this.valid = true;
					}
				});
			} else {
				this.valid = true;
			}
		}
	}
};
</script>
