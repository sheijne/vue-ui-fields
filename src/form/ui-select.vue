<template>
	<div :class="getClasses(fieldData.container.classes)" class="ui-select">
		<label class="ui-select__element">
			<span class="ui-select__label" v-html="createLabel(fieldData)"></span>
			<span v-if="fieldData.required" class="ui-text__label ui-text__label--required">{{ fieldData.requiredText }}</span>
			<select
				v-validate.continues="getValidationOptions(fieldData.errors)"
				:name="fieldData.name"
				v-model="fieldDataValue"
				class="ui-select__select"
			>
				<option
					v-for="(option,index) in fieldData.options"
					:key="index"
					:value="option.value"
					:disabled="option.disabled"
				>{{ option.label }}</option>
			</select>
			<span v-if="iconName" class="ui-select__icon">
				<svg
					id="Layer_1"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					viewBox="0 0 12 12"
					xml:space="preserve"
				>
					<g>
						<g id="Group" transform="translate(6.000000, 6.000000) rotate(45.000000) translate(-6.000000, -6.000000) translate(2.000000, 2.000000)">
							<rect
								id="Rectangle"
								x="1.7"
								y="1.7"
								transform="matrix(2.535182e-06 1 -1 2.535182e-06 8.4142 -3)"
								class="st0"
								width="8"
								height="2"
							/>
							<rect
								x="1.7"
								y="1.7"
								transform="matrix(2.535182e-06 1 -1 2.535182e-06 8.4142 3)"
								class="st0"
								width="2"
								height="8"
							/>
						</g>
					</g>
				</svg>
			</span>
		</label>
		<component
			v-if="fieldData.component"
			:is="fieldData.component.name"
			v-bind="fieldData.component.props"
			:class="fieldData.component.classes"
			v-html="fieldData.component.content"
		/>
		<div v-if="fieldData.errors && fieldData.errors.validation" class="ui-select__errors">
			<span v-if="errors.collect(fieldData.name).length" class="ui-select__error" v-html="fieldData.errors.message"></span>
		</div>
	</div>
</template>

<script>
import mixin from '../plugins/uiFieldsFunctions';
export default {
	mixins: [mixin]
};
</script>
