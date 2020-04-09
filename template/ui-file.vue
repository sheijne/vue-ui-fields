<template>
	<div>
		<input
			:id="`${form}_${name}`"
			:name="fieldData.name"
			type="file"
			v-bind="fieldData.htmlSettings"
			@change="onFileChange($event)"
			:class="`${className}__input ${fieldData.type}__input`"
		/>
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
			component: 'ui-file'
		};
	},
	computed: {
		className() {
			return this.$uiFields.className
		}
	},
	methods: {
		onFileChange(event) {
			this.$uiFields.setValue(this.form, this.name, event.target.files[0]);
		}
	}
};
</script>
