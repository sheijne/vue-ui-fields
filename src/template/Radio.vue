<template>
	<div :id="`${form}_${name}`">
		<p v-if="fieldData.label" :class="`${className}__element ${fieldData.type}__element`">
			{{ fieldData.label }}
		</p>
		<template v-for="(option, key) in fieldData.options">
			<input
				:id="`${form}_${name}_${key}`"
				:key="key"
				v-model="value"
				:value="option.value"
				:name="fieldData.name"
				:type="fieldData.type"
				v-bind="fieldData.htmlSettings"
				:class="`${className}__input ${fieldData.type}__input`"
				@blur="setValue"
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
				>
				</span>
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
export default class UiRadio extends mixins(UIFieldsMixin) {
	public component: string = 'ui-radio';

	get className() {
		return this.$uiFields.getClassName(this.form);
	}
}
</script>
