<template>
	<component :is="component" v-show="visible">
		<template v-for="field of uiFields">
			<UiField :key="field" :name="field" :form="name" />
		</template>
	</component>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			default: '',
		},
		component: {
			type: String,
			default: 'div',
		},
	},
	data() {
		return {
			visible: true,
		};
	},
	computed: {
		uiFields() {
			return this.$uiFields.getFieldKeys(this.$props.name);
		},
	},
	created() {
		this.$uiFields.subscribeCondition(this.$props.name + '_', (result) => (this.visible = result));
	},
};
</script>
