<template>
	<span :class="getClasses(fieldData.container.classes)" class="ui-checkbox">
		<label class="ui-checkbox__element">
			<input
				v-model="fieldDataValue"
				type="checkbox"
				class="ui-checkbox__input"
			>
			<span class="ui-checkbox__label">
				<span class="ui-checkbox__icon">
					<svg-icon width="9" height="8" name="check" />
				</span>
				<span class="ui-checkbox__label-text" v-html="fieldData.label"></span>
			</span>
		</label>
		<slot></slot>
	</span>
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
.ui-checkbox {
	display: flex;
	margin: 0;
	padding: 0;
	padding: rem(10 0);

	align-items: center;
	flex-wrap: wrap;
	@media #{$large-down} {
		flex-wrap: wrap;
	}
	&__element {
		display: flex;
		background-color: color(White);
		margin: 0;
		padding: 0;
		position: relative;
		height: auto;
		width: auto;
		@media #{$large-down} {
			height: auto;
			margin: rem(20 0 0);
		}
	}
	&__input[type='checkbox'] {
		-webkit-appearance: none;
		-moz-appearance: none;
		background: transparent;
		border: none;
		border-radius: 0;
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		font-size: rem(16);
		letter-spacing: 0;
		font-family: $secondary-font-family;
		font-weight: 100;
		outline: none;
		color: color(blueyGrey);
		padding: rem(0);
		&::placeholder {
			font-size: rem(16);
			letter-spacing: 0;
			font-family: $secondary-font-family;
			font-weight: 100;
			outline: none;
			color: color(blueyGrey);
		}
		&:checked {
			& + .ui-checkbox__label svg {
				opacity: 1;
			}
		}
	}
	&__label {
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		font-size: rem(16);
		letter-spacing: 0;
		font-family: $secondary-font-family;
		font-weight: 400;
		color: color(gunMetal);
		line-height: 24px;
		padding: rem(0);
		white-space: nowrap;
		cursor: pointer;
		@media #{$large-down} {
			width: 100%;
			min-width: 100%;
		}
		&-price {
			font-size: rem(12);
			line-height: 24px;
			letter-spacing: 0.2px;
			color: color(blueyGrey);
			padding-left: 3px;
			white-space: nowrap;
		}
		&-text {
			margin-right: rem(10);
		}
	}
	&__icon {
		position: relative;
		display: flex;
		align-items: center;
		width: rem(20);
		height: rem(20);
		background: color(White);
		border: 1px solid color(blueyGrey, 0.5);
		border-radius: 2px;
		margin-right: rem(10);
		justify-content: center;
		svg {
			opacity: 0;
			transition: 0.15s linear;
		}
	}
	.tooltip__trigger {
		white-space: nowrap;
		@media #{$large-down} {
			width: 100%;
			margin-top: rem(8);
		}
	}
}
</style>
