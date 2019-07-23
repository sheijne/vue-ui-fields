<template>
	<div
		v-if="fieldData"
		:class="[
			`uiFields__field ${component} ${fieldData.HTMLProperties.classes}`,
			!pristine ? `uiFields__field--${fieldData.errors.classes.pristine}` : '',
			valid === true
				? `uiFields__field--${fieldData.errors.classes.valid}`
				: '',
			valid === false
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
				v-if="visibleField"
				:id="`${fieldsetName}__${fieldData.name}`"
				v-model="fieldDataValue"
				@input="checkErrors('input')"
				@change="checkErrors('change')"
				@blur="checkErrors('blur')"
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
			:field-index="fieldData.name"
			:component-name="component"
		/>
	</div>
</template>
<script>
import mixinSettings from '../plugins/ui-fields-functions';
export default {
	mixins: [mixinSettings],
	data: () => ({
		component: 'ui-text'
	})
};
</script>
