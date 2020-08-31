<template>
	<div :id="`${form}_${name}`">
		<p v-if="fieldData.label" :class="`${className}__element ${fieldData.type}__element`">
			{{ fieldData.label }}
		</p>
		<template v-for="(option, key) in fieldData.options">
			<input
				:id="`${form}_${name}_${key}`"
				:key="key"
				v-model="firstValue"
				:value="option.value"
				:name="option.name"
				:type="fieldData.type"
				v-bind="fieldData.htmlSettings"
				:class="`${className}__input ${fieldData.type}__input`"
				@change="setCheckboxValue"
			/>
			<label
				:key="`label_${key}`"
				:class="`${className}__element ${fieldData.type}__element`"
				:for="`${form}_${name}_${key}`"
			>
				<span
					:class="[
						fieldData.htmlSettings.required
							? `${fieldData.type}__label--is-required ${className}__label ${fieldData.type}__label`
							: `${className}__label ${fieldData.type}__label`,
					]"
					v-html="option.label"
				/>
			</label>
		</template>
		<uiErrors :form="form" :name="name" />
	</div>
</template>
<script lang="ts">
import { mixins } from 'vue-class-component';
import { Vue, Component } from 'vue-property-decorator';
import UIFieldsMixin from '../helpers/mixin';

@Component
export default class UiCheckbox extends mixins(UIFieldsMixin) {
	public component: string = 'ui-checkbox';
	public firstValue: string[] = [];

	get className() {
		return this.$uiFields.getClassName(this.form);
	}
	setCheckboxValue() {
		this.$uiFields.setValue(this.form, this.name, this.firstValue);
	}
}
</script>
