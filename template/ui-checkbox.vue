<template>
	<div :id="`${form}_${name}`">
		<p v-if="fieldData.label" :class="`ui-fields__element ${fieldData.type}__element`">
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
				:class="`ui-fields__input ${fieldData.type}__input`"
				@change="setCheckboxValue"
			/>
			<label :key="`label_${key}`" :class="`ui-fields__element ${fieldData.type}__element`" :for="`${form}_${name}_${key}`">
				<span
					:class="[
						fieldData.htmlSettings.required
							? `${fieldData.type}__label--is-required ui-fields__label ${fieldData.type}__label`
							: `ui-fields__label ${fieldData.type}__label`
					]"
					v-html="option.label"
				>
				</span>
			</label>
		</template>
		<uiErrors :form="form" :name="name" />
	</div>
</template>
<script>
import mixinSettings from './../helpers/mixin.js';
export default {
	mixins: [mixinSettings],
	data() {
		return {
			component: 'ui-checkbox',
			firstValue: []
		};
	},
	methods: {
		setCheckboxValue() {
			this.$uiFields.setValue(this.form, this.name, this.firstValue);
		}
	}
};
</script>
