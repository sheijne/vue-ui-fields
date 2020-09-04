<template>
	<span :class="`${className}__error ${className}__error--${error.name}`">
		{{ error.message }}
	</span>
</template>

<script lang="ts">
import type { FieldError } from '../types';
import { mixins } from 'vue-class-component';
import { Vue, Component, Prop } from 'vue-property-decorator';
import UIFieldsMixin from '../helpers/mixin';

@Component
export default class UiError extends Vue {
	@Prop({ type: Object, default: '' }) readonly error!: FieldError;

	public errors: string[] = [];
	get className() {
		return this.$uiFields.className;
	}
}
</script>
