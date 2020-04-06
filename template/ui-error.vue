<template>
	<span :class="`${className}__error ${className}__error--${error.name}`">
		{{ error.message }}
	</span>
</template>
<script>
export default {
	props: {
		error: {
			type: Object,
			default: () => {
				return {};
			}
		}
	},
	computed: {
		className() {
			return this.$uiFields.className
		}
	}
};
</script>
