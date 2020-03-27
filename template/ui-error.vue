<template>
	<span :class="`uiFields__error uiFields__error--${error.name}`">
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
	}
};
</script>
