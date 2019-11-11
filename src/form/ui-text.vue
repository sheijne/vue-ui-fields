<template>
	<div
		v-if="fieldData"
		:class="[
			`ui-fields__field ui-fields__field--${component} ${fieldData.HTMLProperties.classes}`,
			!pristine ? `ui-fields__field--${fieldData.errors.classes.pristine}` : '',
			canBeValid && valid === true ? `ui-fields__field--${fieldData.errors.classes.valid}` : '',
			valid === false ? `ui-fields__field--${fieldData.errors.classes.error}` : ''
		]"
	>
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
			:class="`ui-fields__input ${component}__input`"
		/>
		<label :class="`ui-fields__element ${component}__element`" :for="`${fieldsetName}__${fieldData.name}`">
			<span
				:class="[
					fieldData.HTMLProperties.required
						? `${component}__label--is-required ui-fields__label ${component}__label`
						: `ui-fields__label ${component}__label`
				]"
				v-html="fieldData.label"
			>
			</span>
			<span
				v-if="fieldData.HTMLProperties.required"
				:class="`ui-fields__label--required ${component}__label ${component}__label--required`"
			>
				{{ fieldData.uiFieldsData.requiredText }}
			</span>
		</label>
		<ui-error
			v-if="fieldData.errors.showErrors"
			:form-name="formName"
			:fieldset-index="fieldsetIndex"
			:field-index="fieldData.name"
			:component-name="component"
		/>
		<component
			v-if="fieldData.component"
			:is="fieldData.component.name"
			v-bind="fieldData.component.props"
			:class="fieldData.component.classes"
		>
			{{ fieldData.component.content }}
		</component>
	</div>
</template>
<script>
import mixinSettings from '../plugins/ui-fields-functions';
export default {
	mixins: [mixinSettings],
	data() {
		return {
			component: 'ui-text'
		};
	}
};
</script>
