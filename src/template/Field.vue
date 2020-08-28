<template>
	<component
		:is="field.componentType"
		v-show="visible"
		v-if="field && field.componentType"
		:class="[
			`${className}__field ${className}__field--${field.type}`,
			field.classes,
			pristine ? `${className}__field--pristine` : '',
			error ? `${className}__field--valid` : '',
			!pristine && !error ? `${className}__field--invalid` : '',
		]"
		:name="name"
		:form="form"
		:field-value="field.value"
	/>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
	components: {
		UiText: () => import('./Text.vue'),
		UiHidden: () => import('./Hidden.vue'),
		UiCheckbox: () => import('./Checkbox.vue'),
		UiSelect: () => import('./Select.vue'),
		UiRadio: () => import('./Radio.vue'),
		UiTextarea: () => import('./Textarea.vue'),
	},
})
export default class Fields extends Vue {
	@Prop({ type: String, default: '' }) readonly name!: string;
	@Prop({ type: String, default: '' }) readonly form!: string;

	public error: boolean = false;
	public pristine: boolean = true;
	public visible: boolean = true;

	get className() {
		return this.$uiFields.className;
	}
	get field() {
		return this.$uiFields.getField(this.form, this.name);
	}
	created() {
		this.$uiFields.subscribeError(this.form, this.name, (value, errorObject) => {
			this.pristine = false;
			this.error = errorObject.valid;
		});
		this.$uiFields.subscribeCondition(`${this.form}_${this.name}`, (result) => (this.visible = result));
	}
}
</script>
