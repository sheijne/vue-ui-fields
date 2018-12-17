<template>
	<span v-if="fieldData" :class="{'ui-text--required' : fieldData.required}" class="ui-text">
		<label class="ui-text__element">
			<span v-if="fieldData.required" class="ui-text__required"></span>
			<span class="ui-text__label" v-html="fieldData.label"></span>
			<input
				v-if="fieldData.required"
				v-model="fieldDataValue"
				:type="fieldData.type"
				:placeholder="fieldData.placeholder"
				:maxlength="fieldData.maxLength"
				required="required"
				class="ui-text__input"
			>
			<input
				v-else
				:type="fieldData.type"
				v-model="fieldDataValue"
				:maxlength="fieldData.maxLength"
				:placeholder="fieldData.placeholder"
				class="ui-text__input"
			>
		</label>
	</span>
</template>
<script>
import '~/components/icons';

export default {
	props: {
		fieldIndex: {
			type: Number,
			default: 0
		},
		fieldName: {
			type: String,
			default: null
		},
		depth: {
			type: String,
			default: null
		}
	},
	computed: {
		fieldData: {
			get: function() {
				return this.findCorrectFields(this.$store.state.uiFields.fields);
			}
		},
		fieldDataValue: {
			get: function() {
				return this.findCorrectFields(this.$store.state.uiFields.fields).value;
			},
			set: function(newValue) {
				this.$store.commit('uiFields/updateField', {
					name: this.$props.fieldName,
					depth: this.$props.depth,
					index: this.$props.fieldIndex,
					value: newValue
				});
			}
		}
	},
	methods: {
		findCorrectFields(fields) {
			const newField = fields.find((field) => field.key === this.$props.fieldName) || [];
			if (newField) {
				const selectedField = newField.data.find((field) => field.key === this.$props.depth);
				if (selectedField) {
					return selectedField.data[this.$props.fieldIndex];
				}
			}
			return [];
		}
	}
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
