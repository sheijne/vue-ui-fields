<template>
	<div
		v-if="errors.length && errors.some((error) => error.name === 'required')"
		:class="`uiFields__errors ${componentName}__errors`"
	>
		<span :class="`uiFields__error ${componentName}__error`">
			{{ errors.find((error) => error.name === 'required').message }}
		</span>
	</div>
	<div
		v-else-if="errors.length"
		:class="`uiFields__errors ${componentName}__errors`"
	>
		<span
			:class="`uiFields__error ${componentName}__error`"
			v-for="error in errors"
		>
			{{ error.message }}
		</span>
	</div>
</template>
<script>
export default {
	props: {
		formName: {
			type: String,
			default: 'null'
		},
		fieldIndex: {
			type: String,
			default: ''
		},
		fieldsetIndex: {
			type: Number,
			default: null
		},
		componentName: {
			type: String,
			default: ''
		}
	},
	computed: {
		errors() {
			return this.$store.getters['uiFields/error']({
				formName: this.formName,
				fieldIndex: this.fieldIndex,
				fieldsetIndex: this.fieldsetIndex
			});
		}
	}
};
</script>
