<template>
  <div v-if="fieldData" class="uiFields__field ui-text">
    <label class="uiFields__element ui-text__element">
      <span
        :class="{
          'ui-text__label--is-required': fieldData.HTMLProperties.required
        }"
        class="uiFields__label ui-text__label"
        v-html="fieldData.label"
      >
      </span>
      <span
        v-if="fieldData.HTMLProperties.required"
        class="uiFields__label--required ui-text__label ui-text__label--required"
        >{{ fieldData.uiFieldsData.requiredText }}</span
      >
      <input
        v-validate.continues="
          fieldData.uiFieldsData.errors
            ? fieldData.uiFieldsData.errors.validation
            : undefined
        "
        :ref="fieldData.name"
        v-model="fieldDataValue"
        :name="fieldData.name"
        :type="fieldData.type"
        v-bind="fieldData.HTMLProperties"
        class="uiFields__input ui-text__input"
      />
    </label>
    <component
      v-if="fieldData.component"
      :is="fieldData.component.name"
      v-bind="fieldData.component.props"
      :class="fieldData.component.classes"
    >
      {{ fieldData.component.content }}
    </component>
    <div
      v-if="
        fieldData.uiFieldsData.errors &&
          fieldData.uiFieldsData.errors.validation
      "
      class="uiFields__errors ui-text__errors"
    >
      <span
        v-if="
          errors.collect(
            fieldData.name,
            fieldData.uiFieldsData.errors.veeValidateScope
          ).length && !fieldData.uiFieldsData.errors.message
        "
        class="uiFields__error ui-text__error"
        v-for="error in errors.collect(
          fieldData.name,
          fieldData.uiFieldsData.errors.veeValidateScope
        )"
        >{{ error }}</span
      >
      <span
        v-else-if="
          errors.collect(
            fieldData.name,
            fieldData.uiFieldsData.errors.veeValidateScope
          ).length && fieldData.uiFieldsData.errors.message
        "
        class="uiFields__error ui-text__error"
        v-html="fieldData.uiFieldsData.errors.message"
      ></span>
    </div>
  </div>
</template>
<script>
// import mixinSettings from "../plugins/ui-fields-functions";
export default {
  props: {
    formName: {
      type: String,
      default: "null"
    },
    fieldIndex: {
      type: Number,
      default: 0
    },
    fieldsetIndex: {
      type: Number,
      default: null
    }
  },
  computed: {
    fieldData: {
      get() {
        const form = this.findCorrectFields(this.$store.state.uiFields.fields);
        if (form) {
          const fieldsets = form.fieldsets[this.$props.fieldsetIndex];
          if (fieldsets) {
            return fieldsets.fields[this.$props.fieldIndex];
          }
        } else {
          return {};
        }
      }
    },
    fieldDataValue: {
      get() {
        const form = this.findCorrectFields(this.$store.state.uiFields.fields);
        if (form) {
          return form.fieldsets[this.$props.fieldsetIndex].fields[
            this.$props.fieldIndex
          ].value;
        } else {
          return undefined;
        }
      },
      set(newValue) {
        this.$store.dispatch("uiFields/updateFieldValue", {
          formName: this.$props.formName,
          fieldsetIndex: this.$props.fieldsetIndex,
          fieldIndex: this.$props.fieldIndex,
          value: newValue
        });
      }
    }
  },
  methods: {
    findCorrectFields(fields) {
      return fields.find(field => field.name === this.$props.formName) || [];
    }
  }
};
</script>
