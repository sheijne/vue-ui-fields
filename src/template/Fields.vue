<template>
	<component :is="component" v-show="visible">
		<template v-for="field of uiFields">
			<UiField :key="field" :name="field" :form="name" />
		</template>
	</component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Fields extends Vue {
	@Prop({ type: String, default: '' }) readonly name!: string;
	@Prop({ type: String, default: 'div' }) readonly component!: string;

	public visible: boolean = true;

	get uiFields() {
		return this.$uiFields.getFieldKeys(this.$props.name);
	}
	created() {
		this.$uiFields.subscribeCondition(this.$props.name + '_', (result: boolean) => (this.visible = result));
	}
}
</script>
