<template>
	<component :is="component">
		<template v-for="field of uiFields">
			<uiField :key="field" :name="field" :form="name" />
		</template>
	</component>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			default: ''
		},
		component: {
			type: String,
			default: 'div'
		}
	},
	computed: {
		uiFields() {
			return this.$uiFields.getFieldKeys(this.$props.name);
		}
	}
};
</script>
