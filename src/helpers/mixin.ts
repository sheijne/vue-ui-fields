import Vue from 'vue';

export default Vue.extend({
	props: {
		name: {
			type: String,
			default: '',
		},
		form: {
			type: String,
			default: '',
		},
		fieldValue: {
			type: [String, Array],
			default: '',
		},
	},
	computed: {
		fieldData() {
			return this.$uiFields.getField(this.form, this.name);
		},
		value: {
			get() {
				return this.$uiFields.getValue(this.form, this.name);
			},
			set(value) {
				if (this.fieldData !== 'chekcbox') {
					this.$uiFields.setValue(this.form, this.name, value, false);
				}
			},
		},
	},
	methods: {
		setValue($event: any) {
			this.$uiFields.setValue(this.$props.form, this.$props.name, $event.target.value);
		},
	},
});
