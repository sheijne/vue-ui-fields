<template>
	<component
		:is="field.componentType"
		v-show="visible"
		v-if="field && field.componentType"
		:class="[
			`${className}__field ${className}__field--${field.type}`,
			field.classes,
			pristine ? `${className}__field--pristine` : '',
			error ? `${className}__field--valid` : '',
			!pristine && !error ? `${className}__field--invalid` : '',
		]"
		:name="name"
		:form="form"
		:field-value="field.value"
	/>
</template>

<script>
export default {
	components: {
		UiText: () => import('./Text.vue'),
		UiHidden: () => import('./Hidden.vue'),
		UiCheckbox: () => import('./Checkbox.vue'),
		UiSelect: () => import('./Select.vue'),
		UiRadio: () => import('./Radio.vue'),
		UiTextarea: () => import('./Textarea.vue'),
	},
	props: {
		name: {
			type: String,
			default: '',
		},
		form: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			error: false,
			pristine: true,
			visible: true,
		};
	},
	computed: {
		className() {
			return this.$uiFields.className;
		},
		field() {
			return this.$uiFields.getField(this.form, this.name);
		},
	},
	created() {
		this.$uiFields.subscribeError(this.form, this.name, (value, errorObject) => {
			this.pristine = false;
			this.error = errorObject.valid;
		});
		this.$uiFields.subscribeCondition(`${this.form}_${this.name}`, (result) => (this.visible = result));
	},
};
</script>
