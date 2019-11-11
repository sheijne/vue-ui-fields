<template>
	<div
		v-if="fieldData"
		:class="[
			`ui-fields__field ui-fields__field--${fieldData.type} ${fieldData.HTMLProperties.classes}`,
			!pristine ? `ui-fields__field--${fieldData.errors.classes.pristine}` : '',
			canBeValid && valid === true ? `ui-fields__field--${fieldData.errors.classes.valid}` : '',
			valid === false ? `ui-fields__field--${fieldData.errors.classes.error}` : ''
		]"
	>
		<div
			v-for="(option, index) in fieldData.options"
			:class="`ui-fields__radio-container ${fieldData.type}__element`"
			:key="index"
		>
			<input
				v-if="visibleField"
				v-model="fieldDataValue"
				:id="`${fieldsetName}__${fieldData.name}_${index + 1}`"
				@input="checkErrors('input')"
				@change="checkErrors('change')"
				@blur="checkErrors('blur')"
				:value="option.value"
				:name="option.name"
				:type="fieldData.type"
				v-bind="fieldData.HTMLProperties"
				:class="`ui-fields__input ${fieldData.type}__input`"
			/>
			<label
				:class="`ui-fields__element ${fieldData.type}__element`"
				:for="`${fieldsetName}__${fieldData.name}_${index + 1}`"
			>
				<span
					:class="[
						fieldData.HTMLProperties.required
							? `${fieldData.type}__label--is-required ui-fields__label ${fieldData.type}__label`
							: `ui-fields__label ${fieldData.type}__label`
					]"
					v-html="option.label"
				>
				</span>
			</label>
		</div>
		<component
			v-if="fieldData.component"
			:is="fieldData.component.name"
			v-bind="fieldData.component.props"
			:class="fieldData.component.classes"
		>
			{{ fieldData.component.content }}
		</component>
		<ui-error
			v-if="fieldData.errors.showErrors"
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
	data() {
		return {
			component: 'ui-radio'
		};
	}
};
</script>
