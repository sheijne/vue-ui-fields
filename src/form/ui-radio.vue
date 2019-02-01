<template>
	<div :class="getClasses(fieldData.container.classes)" class="ui-radio">
		<label
			v-for="(option,index) in fieldData.options"
			:key="index"
			class="ui-radio__element"
		>
			<input
				v-validate.continues="getValidationOptions(fieldData.errors)"
				:name="fieldData.name"
				v-model="fieldDataValue"
				:value="option.value"
				type="radio"
				class="ui-radio__input"
			>
			<span class="ui-radio__label">
				<span class="ui-radio__icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="8"
						height="8"
						viewBox="0 0 13 12"
					>
						<path fill-rule="evenodd" d="M11.714.363a1.2 1.2 0 0 0-.858.42C8.465 3.42 6.638 5.621 4.419 8.113L2.055 5.916a1.161 1.161 0 0 0-1.231-.243c-.42.167-.727.569-.805 1.053-.078.484.086.977.429 1.292l3.245 3.021a1.167 1.167 0 0 0 1.686-.077c2.689-2.964 4.603-5.332 7.24-8.239.37-.394.483-.999.283-1.521-.2-.523-.672-.856-1.188-.84z" />
					</svg>
				</span>
				<span class="ui-radio__label-text" v-html="option.label"></span>
			</span>
		</label>
		<component
			v-if="fieldData.component"
			:is="fieldData.component.name"
			v-bind="fieldData.component.props"
			:class="fieldData.component.classes"
			v-html="fieldData.component.content"
		/>
		<div v-if="fieldData.errors && fieldData.errors.validation" class="ui-radio__errors">
			<span v-if="errors.collect(fieldData.name).length" class="ui-radio__error" v-html="fieldData.errors.message"></span>
		</div>
	</div>
</template>
<script>
import mixin from '~/plugins/mixins/uiFieldsFunctions';
export default {
	mixins: [mixin]
};
</script>
