<template>
	<div v-if="uiFieldsData && uiFieldsData.container" :class="getClasses(uiFieldsData.container.classes)">
		<component
			v-for="(fields, i) of uiFieldsData.data"
			v-if="checkCondition(fields.conditional)"
			:is="uiFieldsData.container.component"
			:class="getClasses(fields.container.classes)"
			:key="i"
		>
			<slot></slot>
			<template v-for="(item, index) of fields.data">
				<component
					v-if="checkTextField(item.type) && checkCondition(item.conditional)"
					:is="fields.container.component"
					:key="index"
					:class="`${getClasses(fields.container.classes, '__fieldset')} ${getClasses(fields.container.classes, '__fieldset--text')}`"
				>
					<div :class="`${getClasses(fields.container.classes, '__fieldset-container')}`">
						<ui-text :field-index="index" :field-name="fieldName" :depth="fields.key" />
					</div>
				</component>
				<component
					v-else-if="item.type === 'select' && checkCondition(item.conditional)"
					:is="fields.container.component"
					:key="index"
					:class="`${getClasses(fields.container.classes, '__fieldset')} ${getClasses(fields.container.classes, '__fieldset--select')}`"
				>
					<div :class="`${getClasses(fields.container.classes, '__fieldset-container')}`">
						<ui-select
							:field-index="index"
							:field-name="fieldName"
							:depth="fields.key"
							icon-name="arrow-up"
						/>
					</div>
				</component>
				<component
					v-else-if="item.type === 'radio' && checkCondition(item.conditional)"
					:is="fields.container.component"
					:key="index"
					:class="`${getClasses(fields.container.classes, '__fieldset')} ${getClasses(fields.container.classes, '__fieldset--radio')}`"
				>
					<div :class="`${getClasses(fields.container.classes, '__fieldset-container')}`">
						<ui-radio
							:field-index="index"
							:field-name="fieldName"
							:depth="fields.key"
						/>
					</div>
				</component>
				<component
					v-else-if="item.type === 'checkbox' && checkCondition(item.conditional)"
					:is="fields.container.component"
					:key="index"
					:class="`${getClasses(fields.container.classes, '__fieldset')} ${getClasses(fields.container.classes, '__fieldset--checkbox')}`"
				>
					<div :class="`${getClasses(fields.container.classes, '__fieldset-container')}`">
						<ui-checkbox
							:field-index="index"
							:field-name="fieldName"
							:depth="fields.key"
						>
							<modal-trigger
								v-if="item.description"
								:content="item.description"
								title="Would you like logo embroidery? "
								size="two-third"
							>Would you like logo embroidery?</modal-trigger>
						</ui-checkbox>
					</div>
				</component>
			</template>
		</component>
	</div>
</template>

<script>
export default {
	props: {
		fieldName: {
			type: String,
			default: 'form'
		}
	},
	computed: {
		uiFieldsData: {
			get: function() {
				return this.findCorrectFields(this.$store.state.uiFields.fields);
			}
		}
	},
	methods: {
		findCorrectFields(fields) {
			return fields.find((field) => field.key === this.$props.fieldName) || [];
		},
		checkCondition(input) {
			if (input) {
				return input.show;
			} else {
				return true;
			}
		},
		checkTextField(type) {
			if (type === 'text' || type === 'number' || type === 'email' || type === 'tel') return true;
		}
	}
};
</script>
