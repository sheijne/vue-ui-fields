<template>
	<component :is="component">
		<template v-for="field of uiFields">
			<GravityField :key="field" :name="field" :form="id" :sectionComponent="sectionComponent" />
		</template>
	</component>
</template>

<script>
export default {
	components: {
		GravityField: () => import('./ui-gravity-field.vue')
	},
	props: {
		formId: {
			type: String,
			default: '0'
		},
		component: {
			type: String,
			default: 'div'
		},
		sectionComponent: {
			type: String,
			default: 'h2'
		}
	},
	data() {
		return {
			id: 0
		}
	},
	computed: {
		uiFields() {
			return this.$uiFields.getFieldKeys(this.id);
		}
	},
	async created() {
		const formData = await fetch('/wp-json/matise/utilities/gfapi/1').then((response) => response.json())
		if (formData) {
			this.id = formData.id;
			this.$uiFields.new(formData.id)
			this.$uiFields.setFields(formData.id, [...formData.fields])
		}
	}
};
</script>
