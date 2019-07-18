<template>
	<div
		v-if="fieldData"
		:id="`${fieldsetName}__${fieldData.name}`"
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
		<label
			v-for="(option, index) in fieldData.options"
			:key="index"
			:class="`uiFields__element ${component}__element`"
		>
			<input
				v-model="fieldDataValue"
				@input="checkErrors('input')"
				@change="checkErrors('change')"
				@blur="checkErrors('blur')"
				:value="option.value"
				:name="fieldData.name"
				:type="fieldData.type"
				v-bind="fieldData.HTMLProperties"
				:class="`uiFields__input ${component}__input`"
			/>
			<span class="uiFields__label ui-checkbox__label">
				<span class="ui-checkbox__label-text" v-html="option.label"></span>
			</span>
			<component
				v-if="option.component"
				:is="option.component.name"
				v-bind="option.component.props"
				:class="option.component.classes"
				>{{ option.component.content }}</component
			>
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
		component: 'ui-checkbox'
	})
};
</script>
