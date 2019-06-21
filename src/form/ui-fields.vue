<template>
  <div v-if="uiFields" :class="uiFields.classes">
    <component
      v-for="(fieldset, i) of uiFields.fieldsets.filter(
        fieldset => fieldset.conditionValue
      )"
      :is="uiFields.component"
      :class="fieldset.classes"
      :key="i"
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
                '__fieldset--' + field.uiFieldsData.componentType
              ),
              'uiFields__fieldset',
              'uiFields__fieldset--' + field.uiFieldsData.componentType
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
          <!-- <component
            v-else-if="
              item.type === 'component' && checkCondition(item.conditional)
            "
            :is="fields.container.component"
            :key="index"
            :class="[
              getClasses(item.container.classes, '__fieldset'),
              getClasses(item.container.classes, '__fieldset--component')
            ]"
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
          </component> -->
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
