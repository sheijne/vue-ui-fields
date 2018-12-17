<template>
	<span class="ui-radio">
		<label
			v-for="(option,index) in options"
			:key="index"
			class="ui-radio__element"
		>
			<span class="ui-radio__label" v-html="label"></span>
			<input
				v-modal="inputVal"
				v-if="option.selected"
				:value="option.value"
				:name="fieldName"
				checked="checked"
				type="radio"
			>
			<input
				v-modal="inputVal"
				v-else
				:name="fieldName"
				:value="option.value"
				type="radio"
			>
		</label>
		<span class="ui-radio__slot">
			<slot></slot>
		</span>
	</span>
</template>


<script>
import '~/components/icons';

export default {
	props: {
		options: {
			type: Array,
			default: () => []
		},
		label: {
			type: String,
			default: null
		},
		fieldName: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			inputVal: null
		};
	},
	watch: {
		inputVal: {
			handler() {
				this.changeSelected();
			}
		}
	},
	created() {
		this.setDefault();
	},
	methods: {
		changeSelected() {
			this.options.forEach((option) => {
				option.selected = option.value === this.inputVal;
			});
		},
		setDefault() {
			//if nothing selected select first item. Otherwise make value first selected
			if (!this.options.filter((option) => option.selected).length) {
				this.options[0].selected = true;
				this.inputVal = this.options[0].value;
			} else {
				this.inputVal = this.options.filter((option) => option.selected)[0].value;
			}
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
.ui-radio {
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
	&__radio {
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
		padding: rem(0 20);
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
