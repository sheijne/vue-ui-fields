<template>
	<div v-else-if="uiFieldsErrors.length" :class="`uiFields__errors`">
		<span :class="`uiFields__error`" v-for="error in uiFieldsErrors">
			{{ error.message }}
		</span>
	</div>
</template>
<script>
export default {
	props: {
		fieldName: {
			type: String,
			default: ''
		},
		fieldIndex: {
			type: Number,
			default: null
		},
		fieldsetIndex: {
			type: Number,
			default: null
		}
	},
	computed: {
		uiFieldsErrors() {
			return this.$store.getters['uiFields/errors']({
				formName: this.fieldName.split('|'),
				fieldIndex: this.fieldIndex,
				fieldsetIndex: this.fieldsetIndex
			});
		}
	}
};
</script>
