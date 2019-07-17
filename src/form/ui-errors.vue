<template>
	<div v-else-if="errors.length" :class="`uiFields__errors`">
		<span :class="`uiFields__error`" v-for="error in errors">
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
		errors() {
			return this.$store.getters['uiFields/errors']({
				formName: this.fieldName.split('|'),
				fieldIndex: this.fieldIndex,
				fieldsetIndex: this.fieldsetIndex
			});
		}
	}
};
</script>
