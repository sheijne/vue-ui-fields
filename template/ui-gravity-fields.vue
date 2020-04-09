<template>
	<component :is="component">
		<template v-for="field of uiFields">
			<GravityField :key="field" :name="field" :form="name" :sectionComponent="sectionComponent" />
		</template>
	</component>
</template>

<script>
import GravityField from './ui-gravity-field.vue';
export default {
	components: {
		GravityField
	},
	props: {
		name: {
			type: String,
			default: ''
		},
		component: {
			type: String,
			default: 'div'
		},
		sectionComponent: {
			type: String,
			default: 'h3'
		}
	},
	computed: {
		uiFields() {
			return this.$uiFields.getFieldKeys(this.$props.name);
		}
	}
};
</script>
