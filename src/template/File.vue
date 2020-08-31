<template>
	<div>
		<input
			:id="`${form}_${name}`"
			:name="fieldData.name"
			type="file"
			v-bind="fieldData.htmlSettings"
			:class="`${className}__input ${fieldData.type}__input`"
			@change="onFileChange($event)"
		/>
		<label :class="`${className}__element ${fieldData.type}__element`" :for="`${form}_${name}`">
			<span
				:class="[
					fieldData.htmlSettings.required
						? `${fieldData.type}__label--is-required ${className}__label ${fieldData.type}__label`
						: `${className}__label ${fieldData.type}__label`,
				]"
				v-html="fieldData.label"
			>
			</span>
			<span
				v-if="fieldData.htmlSettings.required && fieldData.requiredText"
				:class="`${className}__label--required ${className}__label ${fieldData.type}__label ${fieldData.type}__label--required`"
			>
				{{ fieldData.requiredText }}
			</span>
		</label>
		<p :class="`${className}__fileinfo`">
			<span :class="[pristine ? `${className}__filename--placeholder` : '', `${className}__filename`]">
				{{ pristine ? fieldData.htmlSettings.placeholder : fileName }}
			</span>
			<span v-if="!pristine" :class="`${className}__filesize`"> {{ size }}MB </span>
			<span v-if="fieldData.htmlSettings.maxUploadSize && pristine" :class="`${className}__max-filesize`">
				Max. {{ fieldData.htmlSettings.maxUploadSize }}MB
			</span>
		</p>
		<uiErrors :form="form" :name="name" />
	</div>
</template>
<script lang="ts">
import { mixins } from 'vue-class-component';
import { Vue, Component } from 'vue-property-decorator';
import UIFieldsMixin from '../helpers/mixin';

@Component
export default class UiFile extends mixins(UIFieldsMixin) {
	public component: string = 'ui-file';
public pristine: boolean = true;
			public fileName: string = '',
			public size: number = 0;
	get className() {
		return this.$uiFields.getClassName(this.form);
	}
	onFileChange(event: any) {
			this.size = Math.round(event.target.files[0].size / 1000);
			this.pristine = false;
			this.fileName = event.target.files[0].name;
			this.$uiFields.setValue(this.form, this.name, event.target.files[0]);
		}
}
</script>
