<template>
<div>
	<component :is="field.componentType"
		v-if="field && field.componentType && field.componentType !== 'section' " :class="[
			`ui-fields__field ui-fields__field--${field.type}`,
			field.classes,
			{ 'ui-fields__field--pristine' : pristine },
			{ 'ui-fields__field--valid' : error },
			{ 'ui-fields__field--invalid' : !pristine && !error }
		]" :name="name" :form="form" :field-value="field.value"
	/>
	<component :is="sectionComponent" v-else-if="field && field.componentType && field.componentType === 'section'">
		{{ field.label }}
	</component>
	</div>
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
		},
		sectionComponent: {
			type: String,
			default: 'h2'
		}
	},
	data() {
		return {
			error: false,
			pristine: true
		};
	},
	computed: {
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
