<template>
	<span v-if="fieldData" :class="getClasses(fieldData.container.classes)" class="ui-text">
		<label class="ui-text__element">
			<span v-if="fieldData.required" class="ui-text__required"></span>
			<span class="ui-text__label" v-html="fieldData.label"></span>
			<input
				ref="input"
				v-model="fieldDataValue"
				:type="fieldData.type"
				:placeholder="fieldData.placeholder"
				:maxlength="fieldData.maxLength"
				required="required"
				class="ui-text__input"
			>
		</label>
	</span>
</template>
<script>
import mixin from '~/plugins/mixins/uiFieldsFunctions';
export default {
	mixins: [mixin]
};
</script>

<style lang="scss">
@import '~tools';
.ui-text {
	display: flex;
	margin: 0;
	padding: 0;
	&__element {
		display: flex;
		height: rem(64);
		background-color: color(White);
		width: 100%;
		margin: 0;
		position: relative;
		padding: 0;
		@media #{$large-down} {
			background: transparent;
			flex-wrap: wrap;
			height: auto;
		}
	}
	&__input {
		-webkit-appearance: none;
		-moz-appearance: none;
		background: transparent;
		border: none;
		border-radius: 0;
		padding: 0;
		margin: 0;
		width: calc(70% + 20px);
		display: flex;
		align-items: center;
		font-size: rem(16);
		letter-spacing: 0;
		font-family: $secondary-font-family;
		font-weight: 100;
		outline: none;
		color: color(blueyGrey);
		padding: rem(0 20);
		@media #{$large-down} {
			width: 100%;
			height: rem(64);
			border-radius: 2px;
			border: 1px solid color(blueyGrey, 0.5);
		}
		&::placeholder {
			font-size: rem(16);
			letter-spacing: 0;
			font-family: $secondary-font-family;
			font-weight: 100;
			outline: none;
			color: color(blueyGrey);
		}
	}
	&__label {
		padding: 0;
		margin: 0;
		width: calc(30% - 20px);
		display: flex;
		align-items: center;
		font-size: rem(16);
		letter-spacing: 0;
		font-family: $secondary-font-family;
		font-weight: 400;
		color: color(gunMetal);
		line-height: 24px;
		padding: rem(0 0 0 20);
		&-price {
			font-size: rem(12);
			line-height: 24px;
			letter-spacing: 0.2px;
			color: color(blueyGrey);
			padding-left: 3px;
			white-space: nowrap;
		}
		@media #{$large-down} {
			width: 100%;
			padding: 0;
			margin: rem(20 0 8);
		}
	}
	&__icon {
		top: 50%;
		right: rem(20);
		transform: translateY(-50%);
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		@media #{$large-down} {
			top: calc(50% + 22px);
		}
		svg {
			transform: rotate(180deg);
		}
	}
}
</style>
