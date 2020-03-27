<template>
	<div v-if="errors && errors.length">
		<uiError v-for="(error, index) of errors" :key="index" :error="error" />
	</div>
</template>
<script>
export default {
	props: {
		form: {
			type: String,
			default: 'null'
		},
		name: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			errors: []
		};
	},
	created() {
		this.$uiFields.subscribeError(this.form, this.name, (value, errors) => {
			errors = errors.filter((error) => !error.valid);
			this.errors = errors;
			if (errors.length && errors[0].name == 'required') {
				this.errors.length = 1;
			}
		});
	}
};
</script>