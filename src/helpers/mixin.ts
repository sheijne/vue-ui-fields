import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class UIFieldsMixin extends Vue {
	@Prop({ type: String, default: '' }) readonly name!: string;
	@Prop({ type: String, default: '' }) readonly form!: string;
	@Prop({ type: [String, Array], default: '' }) readonly fieldValue!: string | string[];

	get fieldData() {
		return this.$uiFields.getField(this.$props.form, this.name);
	}

	get value() {
		return this.$uiFields.getValue(this.$props.form, this.name);
	}
	set value(value) {
		this.$uiFields.setValue(this.$props.form, this.name, value, false);
	}

	setValue($event: any) {
		this.$uiFields.setValue(this.$props.form, this.$props.name, $event.target.value);
	}
}
