<template>
	<div :class="getClasses(fieldData.container.classes)" class="uiFields__field ui-select">
		<label class="uiFields__element ui-select__element">
			<span
				:class="{ 'ui-select__label--is-required': fieldData.required }"
				class="uiFields__label ui-select__label"
				v-html="createLabel(fieldData)"
			>
			</span>
			<span v-if="fieldData.required" class="uiFields__label--required ui-text__label ui-text__label--required">{{
				fieldData.requiredText
			}}</span>
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
		<div v-if="fieldData.errors && fieldData.errors.validation" class="uiFields__errors ui-select__errors">
			<span
				v-if="errors.collect(fieldData.name).length"
				class="uiFields__error ui-select__error"
				v-html="fieldData.errors.message"
			></span>
		</div>
	</div>
</template>

<script>
import mixin from '../plugins/uiFieldsFunctions';
export default {
	mixins: [mixin]
};
</script>
