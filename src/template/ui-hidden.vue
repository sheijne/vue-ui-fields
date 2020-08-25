<template>
	<input
		:id="`${form}_${name}`"
		v-model="value"
		:name="fieldData.name"
		type="hidden"
		v-bind="fieldData.htmlSettings"
		:class="`${className}__input ${fieldData.type}__input`"
	/>
</template>
<script>
import mixinSettings from '../helpers/mixin.js';
export default {
	mixins: [mixinSettings],
	data() {
		return {
			component: 'ui-hidden'
		};
	},
	computed: {
		className() {
			return this.$uiFields.getClassName(this.form)
		}
	}
};
</script>
