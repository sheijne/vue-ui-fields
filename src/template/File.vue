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
<script>
import mixinSettings from '../helpers/mixin';
export default {
	mixins: [mixinSettings],
	data() {
		return {
			component: 'ui-file',
			pristine: true,
			fileName: '',
			size: 0,
		};
	},
	computed: {
		className() {
			return this.$uiFields.className;
		},
	},
	methods: {
		onFileChange(event) {
			this.size = Math.round(event.target.files[0].size / 1000);
			this.pristine = false;
			this.fileName = event.target.files[0].name;
			this.$uiFields.setValue(this.form, this.name, event.target.files[0]);
		},
	},
};
</script>
