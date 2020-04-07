<template>
	<form @submit.prevent="submit" novalidate v-if="formData && !response">
		<template v-for="field of uiFields">
			<GravityField :key="field" :name="field" :form="formData.id" :sectionComponent="sectionComponent" />
		</template>
		<input type="submit" :value="formData.button.text">
	</form>
	<div v-else-if="formData && response" v-html="response">
	</div>
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
			default: '1'
		},
		sectionComponent: {
			type: String,
			default: 'h2'
		}
	},
	data() {
		return {
			response: '',
			formData: null
		}
	},
	computed: {
		uiFields() {
			return this.$uiFields.getFieldKeys(String(this.name));
		}
	},
	async created() {
		this.formData = await this.$uiFields.gfapi.new(this.name)
	},
	methods: {
		async submit() {
			const response = await this.$uiFields.gfapi.submit(this.name);
			if (response) {
				this.response = response;
			}
		}
	}
}
</script>
