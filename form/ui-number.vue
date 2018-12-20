<template>
	<div :class="{'ui-number--required' : required, 'ui-number--pristine': pristine, 'ui-number--warn': warn }" class="ui-number">
		<label v-if="label" class="ui-number__label">{{ label }}
			<span v-if="required" class="ui-number__required"></span>
		</label>
		<div class="ui-number">
			<div class="ui-number__element">
				<input
					v-model="inputVal"
					type="number"
					class="ui-number__input"
					disabled="disabled"
					@focus="setFocus"
					@blur="setBlur"
				>
				<div v-if="showControls" class="ui-number__controls">
					<button class="ui-number__control ui-number__control--add" @click.prevent="add">+</button>
					<button class="ui-number__control ui-number__control--sub" @click.prevent="sub">-</button>
				</div>
			</div>
		</div>
		<div v-if="field && field.children" class="childfields">
			<ui-fields :debug="debug" :fields="field.children" />
		</div>
	</div>
</template>


<script>
import '~/components/icons';
import mixin from '~/plugins/mixins/uiFieldsFunctions';
export default {
	mixins: [mixin]
};
</script>

<style lang="scss">
@import '~tools';
.ui-number {
	display: flex;
	justify-content: flex-end;
	&__label {
		width: 100%;
	}
	&__element {
		display: flex;
		flex-direction: row;
	}
	&:focus,
	input:focus,
	button:focus {
		outline: none;
		box-shadow: none;
	}
	&__input {
		border: none;
	}
	&__controls {
		display: flex;
		flex-direction: column;
	}
	&__control {
		display: block;
		padding: 0;
		cursor: pointer;
		background: transparent;
		box-shadow: none;
		appearance: none;
		border: none;
		-webkit-appearance: none;
		&:hover {
		}
	}
}
</style>
