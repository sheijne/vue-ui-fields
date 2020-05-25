<template>
	<div>
		<input
			:id="`${form}_${name}`"
			v-model="value"
			:name="fieldData.name"
			:type="fieldData.type"
			v-bind="fieldData.htmlSettings"
			:class="`${className}__input ${fieldData.type}__input`"
			@blur="setValue"
			:list="fieldData.datalist ? `${form}_${name}_list` : ''"
		/>
		<datalist v-if="fieldData.datalist" :id="`${form}_${name}_list`">
			<option v-for="(item, list) of fieldData.datalist" :key="list" :value="item" />
		</datalist>
		<label :class="`${className}__element ${fieldData.type}__element`" :for="`${form}_${name}`">
			<span
				:class="[
					fieldData.htmlSettings.required
						? `${fieldData.type}__label--is-required ${className}__label ${fieldData.type}__label`
						: `${className}__label ${fieldData.type}__label`
				]"
				v-html="fieldData.label"
			>
			</span>
			<span
				v-if="fieldData.htmlSettings.required && fieldData.requiredText"
				:class="`${className}__label--required ${className}__label ${fieldData.type}__label ${fieldData.type}__label--required`"
			>
				{{ fieldData.requiredText }}
			</span>
		</label>
		<uiErrors :form="form" :name="name" />
	</div>
</template>
<script>
import mixinSettings from '../helpers/mixin.js';
export default {
	mixins: [mixinSettings],
	data() {
		return {
			component: 'ui-text'
		};
	},
	computed: {
		className() {
			return this.$uiFields.getClassName(this.form)
		}
	}
};
</script>
