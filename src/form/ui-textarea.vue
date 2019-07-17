<template>
	<div
		v-if="fieldData"
		:class="`uiFields__field ${component} ${fieldData.HTMLProperties.classes}`"
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
			<textarea
				:ref="fieldData.name"
				v-model="fieldDataValue"
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
		<div
			v-if="
				fieldData.uiFieldsData.errors &&
					fieldData.uiFieldsData.errors.validation
			"
			:class="`uiFields__errors ${component}__errors`"
		>
			<span
				v-if="
					errors.collect(
						(fieldData.uiFieldsData.errors.veeValidateScope
							? fieldData.uiFieldsData.errors.veeValidateScope + '.'
							: '') + fieldData.name
					).length && !fieldData.uiFieldsData.errors.message
				"
				:class="`uiFields__error ${component}__error`"
				v-for="error in errors.collect(
					fieldData.name,
					fieldData.uiFieldsData.errors.veeValidateScope
				)"
			>
				{{ error }}
			</span>
			<span
				v-if="
					errors.collect(
						(fieldData.uiFieldsData.errors.veeValidateScope
							? fieldData.uiFieldsData.errors.veeValidateScope + '.'
							: '') + fieldData.name
					).length && fieldData.uiFieldsData.errors.message
				"
				:class="`uiFields__error ${component}__error`"
				v-html="fieldData.uiFieldsData.errors.message"
			></span>
		</div>
	</div>
</template>
<script>
import mixinSettings from '../plugins/ui-fields-functions';
export default {
	mixins: [mixinSettings],
	data: () => ({
		component: 'ui-textarea'
	})
};
</script>
