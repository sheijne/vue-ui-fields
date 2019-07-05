<template>
  <div v-if="uiFields && uiFields.fieldsets" :class="uiFields.classes">
    <component
      v-for="(fieldset, i) of uiFields.fieldsets"
      :is="uiFields.component"
      :class="fieldset.classes"
      :key="i"
      v-show="fieldset.conditionValue"
    >
      <div
        :class="[
          getClasses(fieldset.classes, '__container'),
          'uiFields__container'
        ]"
      >
        <template v-for="(field, index) of fieldset.fields">
          <component
            v-if="
              field.conditionValue &&
                field.uiFieldsData.componentType !== 'component'
            "
            :is="fieldset.component"
            :key="index"
            :class="[
              getClasses(field.HTMLProperties.classes, '__fieldset'),
              getClasses(
                field.HTMLProperties.classes,
                '__fieldset--' + field.type
              ),
              'uiFields__fieldset',
              'uiFields__fieldset--' + field.type
            ]"
          >
            <div
              :class="[
                getClasses(
                  field.HTMLProperties.classes,
                  '__fieldset-container'
                ),
                'uiFields__fieldset-container'
              ]"
            >
              <component
                :is="field.uiFieldsData.componentType"
                :form-name="fieldName"
                :fieldset-index="i"
                :field-index="index"
              />
            </div>
          </component>
          <component
            v-else-if="
              field.conditionValue &&
                field.uiFieldsData.componentType === 'component'
            "
            :is="fieldset.component"
            :key="index"
            :class="[
              getClasses(field.HTMLProperties.classes, '__fieldset'),
              getClasses(field.HTMLProperties.classes, '__fieldset--component'),
              'uiFields__fieldset',
              'uiFields__fieldset--component'
            ]"
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
      </div>
    </component>
  </div>
</template>

<script>
export default {
  props: {
    fieldName: {
      type: String,
      default: "form"
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
  mounted() {
    this.$store.dispatch("uiFields/updateFromLocalStorage");
  },
  methods: {
    findCorrectFields(fields) {
      return fields.find(field => field.name === this.$props.fieldName) || [];
    }
  }
};
</script>
