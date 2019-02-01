<template>
	<div v-if="fieldData" :class="getClasses(fieldData.container.classes)" class="ui-text">
		<label class="ui-text__element">
			<span class="ui-text__label" v-html="fieldData.label"></span>
			<span v-if="fieldData.required" class="ui-text__label ui-text__label--required">{{ fieldData.requiredText }}</span>
			<input
				v-validate.continues="getValidationOptions(fieldData.errors)"
				ref="input"
				v-model="fieldDataValue"
				:name="fieldData.name"
				:type="fieldData.type"
				:placeholder="fieldData.placeholder"
				:maxlength="fieldData.maxLength"
				:minlength="fieldData.minLength"
				:required="fieldData.required"
				class="ui-text__input"
			>
		</label>
		<component
			v-if="fieldData.component"
			:is="fieldData.component.name"
			v-bind="fieldData.component.props"
			:class="fieldData.component.classes"
			v-html="fieldData.component.content"
		/>
		<div v-if="fieldData.errors && fieldData.errors.validation" class="ui-text__errors">
			<span v-if="errors.collect(fieldData.name).length" class="ui-text__error" v-html="fieldData.errors.message"></span>
		</div>
	</div>
</template>
<script>
import mixin from '../plugins/uiFieldsFunctions';
export default {
	mixins: [mixin]
};
</script>
