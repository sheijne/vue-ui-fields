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
			return this.$uiFields.getFieldKeys(String(this.id));
		}
	},
	async created() {
		const formData = await fetch(`/wp-json/matise/utilities/gfapi/${this.formId}`).then((response) => response.json())
		if (formData) {
			this.id = String(formData.id);
			this.$uiFields.new(String(formData.id))
			this.$uiFields.setFields(String(formData.id), [...formData.fields])
		}
	}
};
</script>
