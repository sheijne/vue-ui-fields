<template>
	<span class="ui-select">
		<label class="ui-select__element">
			<span class="ui-select__label" v-html="createLabel(fieldData.name)"></span>
			<select :name="fieldData.name" v-model="fieldDataValue" class="ui-select__select">
				<option
					v-for="(option,index) in fieldData.options"
					:key="index"
					:value="option.value"
					:selected="option.selected"
				>{{ option.label }}</option>
			</select>
			<span v-if="iconName" class="ui-select__icon">
				<svg-icon
					:name="iconName"
					:original="true"
					width="8"
					height="8"
				/>
			</span>
		</label>
		<span class="ui-select__slot">
			<button v-if="fieldData.description" class="button--moreinfo" @click.prevent="shownInfo = select; shownInfoVisible = true">?</button>
		</span>
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
		},
		iconName: {
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
			const newField = fields.find((field) => field.key === this.$props.fieldName);
			if (newField) {
				const selectedField = newField.data.find((field) => field.key === this.$props.depth);
				if (selectedField) {
					return selectedField.data[this.$props.fieldIndex];
				}
			}
			return [];
		},
		createLabel(text) {
			if (text) {
				if (text.indexOf('attribute_') !== -1) {
					//name starts with attribute and we need the last name then we format it
					let newText = text.split('_');
					newText = newText[newText.length - 1];
					return newText.charAt(0).toUpperCase() + newText.slice(1);
				} else {
					return text;
				}
			}
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.ui-select {
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
	&__select {
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
