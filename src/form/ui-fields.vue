<template>
	<div>
		<client-only>
			<div v-if="uiFields && uiFields.fieldsets" :class="uiFields.classes">
				<component
					v-for="(fieldset, i) of uiFields.fieldsets"
					:is="uiFields.component"
					:class="[
						'ui-fields__fieldset',
						fieldset.classes,
						fieldset.conditionValue ? 'ui-fields__fieldset--enabled' : 'ui-fields__fieldset--disabled'
					]"
					:key="i"
					v-show="fieldset.conditionValue"
				>
					<template v-for="(field, index) of fieldset.fields" v-if="fieldset.conditionValue">
						<component
							v-if="field.uiFieldsData.componentType !== 'component'"
							v-show="field.conditionValue"
							:key="index"
							:is="field.uiFieldsData.componentType"
							:visibleField="field.conditionValue ? true : false"
							:form-name="fieldName"
							:fieldset-index="i"
							:fieldset-name="fieldset.name"
							:field-index="index"
						/>
						<component
							v-else-if="field.conditionValue && field.uiFieldsData.componentType === 'component'"
							:is="fieldset.component"
							:key="index"
							:class="['ui-fields__component-container']"
						>
							<component
								v-if="field.component && field.component.content"
								:is="field.component.name"
								v-bind="field.component.props"
								:class="field.component.classes"
								v-html="field.component.content"
							/>
							<component
								v-else-if="field.component"
								:is="field.component.name"
								v-bind="field.component.props"
								:class="field.component.classes"
							/>
						</component>
					</template>
				</component>
			</div>
		</client-only>
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
		uiFields() {
			return this.findCorrectFields(this.$store.state.uiFields.fields);
		}
	},
	watch: {
		uiFields: {
			handler() {
				this.$forceUpdate();
			},
			deep: true
		}
	},
	created() {
		if (process.client) {
			this.$store.dispatch('uiFields/updateFromLocalStorage');
		}
	},
	methods: {
		findCorrectFields(fields) {
			return fields.find((field) => field.name === this.$props.fieldName) || [];
		}
	}
};
</script>
