<template>
	<div>
		<select
			:id="`${form}_${name}`"
			v-model="value"
			:name="fieldData.name"
			:type="fieldData.type"
			v-bind="fieldData.htmlSettings"
			:class="`ui-fields__input ${fieldData.type}__input`"
			@blur="setValue"
		>
			<option v-for="(option, key) in fieldData.options" :key="key" :value="option.value" :disabled="option.disabled">
				{{ option.label }}
			</option>
		</select>
		<label :class="`ui-fields__element ${fieldData.type}__element`" :for="`${form}_${name}`">
			<span
				:class="[
					fieldData.htmlSettings.required
						? `${fieldData.type}__label--is-required ui-fields__label ${fieldData.type}__label`
						: `ui-fields__label ${fieldData.type}__label`
				]"
				v-html="fieldData.label"
			>
			</span>
			<span
				v-if="fieldData.htmlSettings.required && fieldData.requiredText"
				:class="`ui-fields__label--required ui-fields__label ${fieldData.type}__label ${fieldData.type}__label--required`"
			>
				{{ fieldData.requiredText }}
			</span>
			<uiErrors :form="form" :name="name" />
		</label>
	</div>
</template>
<script>
import mixinSettings from './../helpers/mixin.js';
export default {
	mixins: [mixinSettings],
	data() {
		return {
			component: 'ui-select'
		};
	}
};
</script>
