<template>
	<div
		v-if="uiFieldsErrors.length && uiFieldsErrors.some((error) => error.name === 'required')"
		:class="`uiFields__errors ${componentName}__errors`"
	>
		<span :class="`uiFields__error ${componentName}__error`">
			{{ uiFieldsErrors.find((error) => error.name === 'required').message }}
		</span>
	</div>
	<div v-else-if="uiFieldsErrors.length" :class="`uiFields__errors ${componentName}__errors`">
		<span :class="`uiFields__error ${componentName}__error`" v-for="error in uiFieldsErrors">
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
		uiFieldsErrors() {
			return this.$store.getters['uiFields/error']({
				formName: this.formName,
				fieldIndex: this.fieldIndex,
				fieldsetIndex: this.fieldsetIndex
			});
		}
	}
};
</script>
