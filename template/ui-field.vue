<template>
	<component :is="field.componentType"
		v-if="field && field.componentType" 
		:class="[
			`${className}__field ${className}__field--${field.type}`,
			field.classes,
			pristine ? `${className}__field--pristine` : '',
			error ? `${className}__field--valid` : '',
			(!pristine && !error) ? `${className}__field--invalid` : ''
		]"
		:name="name" :form="form" :field-value="field.value"
	/>
</template>

<script>
export default {
	components: {
		'uiText': () => import('./ui-text.vue'),
		'uiFile': () => import('./ui-file.vue'),
		'uiCheckbox': () => import('./ui-checkbox.vue'),
		'uiSelect': () => import('./ui-select.vue'),
		'uiRadio': () => import('./ui-radio.vue'),
		'uiTextarea': () => import('./ui-textarea.vue')
	},
	props: {
		name: {
			type: String,
			default: ''
		},
		form: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			error: false,
			pristine: true
		};
	},
	computed: {
		className() {
			return this.$uiFields.className
		},
		field() {
			return this.$uiFields.getField(this.form, this.name);
		}
	},
	created() {
		this.$uiFields.subscribeError(this.form, this.name, (value, errorObject) => {
			this.pristine = false;
			this.error = errorObject.valid;
		});
	}
};
</script>
