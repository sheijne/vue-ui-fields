<template>
	<component :is="component" v-show="visible">
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
	},
	data() {
		return {
			visible: true
		}
	},
	created() {
		this.$uiFields.subscribeCondition(this.$props.name + '_', (result) => this.visible = result);
	}
};
</script>
