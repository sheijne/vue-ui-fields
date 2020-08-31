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
<script lang="ts">
import { mixins } from 'vue-class-component';
import { Vue, Component } from 'vue-property-decorator';
import UIFieldsMixin from '../helpers/mixin';

@Component
export default class UiHidden extends mixins(UIFieldsMixin) {
	public component: string = 'ui-hidden';

	get className() {
		return this.$uiFields.getClassName(this.form);
	}
}
</script>
