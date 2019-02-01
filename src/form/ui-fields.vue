<template>
	<div v-if="uiFieldsData && uiFieldsData.container" :class="getClasses(uiFieldsData.container.classes)">
		<component
			v-for="(fields, i) of uiFieldsData.data"
			v-if="checkCondition(fields.conditional)"
			:is="uiFieldsData.container.component"
			:class="getClasses(fields.container.classes)"
			:key="i"
		>
			<div :class="getClasses(fields.container.classes, '__container')">
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
						:key="`index ${item}`"
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
							</ui-checkbox>
						</div>
					</component>
					<component
						v-else-if="item.type === 'component' && checkCondition(item.conditional)"
						:is="fields.container.component"
						:key="index"
						:class="`${getClasses(fields.container.classes, '__fieldset')} ${getClasses(fields.container.classes, '__fieldset--component')}`"
					>
						<component
							v-if="item.component && item.component.content"
							:is="item.component.name"
							v-bind="item.component.props"
							:class="item.component.classes"
							v-html="item.component.content"
						/>
						<component
							v-else-if="item.component"
							:is="item.component.name"
							v-bind="item.component.props"
							:class="item.component.classes"
						/>
					</component>
				</template>
			</div>
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
	data() {
		return {
			uiFieldsData: {}
		};
	},
	computed: {
		uiFields: {
			get: function() {
				return this.$store.state.uiFields.fields;
			}
		}
	},
	watch: {
		uiFields: {
			handler() {
				if (this.findCorrectFields(this.uiFields)) {
					this.uiFieldsData = this.findCorrectFields(this.uiFields);
				}
				this.$forceUpdate();
			},
			deep: true
		}
	},
	beforeCreate() {
		this.$store.dispatch('uiFields/resetFields');
	},
	methods: {
		findCorrectFields(fields) {
			return fields.find((field) => field.key === this.$props.fieldName) || [];
		},
		conditions(fields) {
			return fields.data.map((field) => {
				if (field.data) {
					return field.data.map((secondField) => {
						if (secondField.conditional) {
							return secondField.conditional.show;
						}
					});
				}
			});
		},
		checkCondition(input) {
			if (input) {
				return input.show;
			} else {
				return true;
			}
		},
		checkTextField(type) {
			if (type === 'text' || type === 'number' || type === 'email' || type === 'tel' || type === 'password') return true;
		}
	}
};
</script>
