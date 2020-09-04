<template>
	<p v-if="errors && errors.length" class="ui-fields__error-message">
		<UiError v-for="(error, index) of errors" :key="index" :error="error" />
	</p>
</template>
<script lang="ts">
import type { FieldError } from '../types';
import { mixins } from 'vue-class-component';
import { Vue, Component, Prop } from 'vue-property-decorator';
import UIFieldsMixin from '../helpers/mixin';

@Component
export default class UiErrors extends Vue {
	@Prop({ type: String, default: '' }) readonly form!: string;
	@Prop({ type: String, default: '' }) readonly name!: string;

	public errors: FieldError[] = [];
	created() {
		this.$uiFields.subscribeError(this.form, this.name, (value, errors: FieldError[]) => {
			errors = errors.filter((error) => !error.valid);
			this.errors = errors;
			if (errors.length && errors[0].name == 'required') {
				this.errors.length = 1;
			}
		});
	}
}
</script>
