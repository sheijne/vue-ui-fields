<template>
  <div
    v-if="fieldData"
    :class="`uiFields__field ${component} ${fieldData.HTMLProperties.classes}`"
  >
    <label
      v-for="(option, index) in fieldData.options"
      :key="index"
      :class="`uiFields__element ${component}__element`"
    >
      <input
        v-validate.continues="
          fieldData.uiFieldsData.errors
            ? fieldData.uiFieldsData.errors.validation
            : undefined
        "
        :ref="fieldData.name"
        v-model="fieldDataValue"
        :value="option.value"
        :name="fieldData.name"
        :type="fieldData.type"
        v-bind="fieldData.HTMLProperties"
        :class="`uiFields__input ${component}__input`"
      />
      <span class="uiFields__label ui-radio__label">
        <span class="ui-radio__label-text" v-html="option.label"></span>
      </span>
      <component
        v-if="option.customData.component"
        :is="option.customData.component.name"
        v-bind="option.customData.component.props"
        :class="option.customData.component.classes"
        >{{ option.customData.component.content }}</component
      >
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
      :class="`uiFields__errors ${component}__errors`"
    >
      <span
        v-if="
          errors.collect(
            (fieldData.uiFieldsData.errors.veeValidateScope
              ? fieldData.uiFieldsData.errors.veeValidateScope + '.'
              : '') + fieldData.name
          ).length && !fieldData.uiFieldsData.errors.message
        "
        :class="`uiFields__error ${component}__error`"
        v-for="error in errors.collect(
          fieldData.name,
          fieldData.uiFieldsData.errors.veeValidateScope
        )"
      >
        {{ error }}
      </span>
      <span
        v-if="
          errors.collect(
            (fieldData.uiFieldsData.errors.veeValidateScope
              ? fieldData.uiFieldsData.errors.veeValidateScope + '.'
              : '') + fieldData.name
          ).length && fieldData.uiFieldsData.errors.message
        "
        :class="`uiFields__error ${component}__error`"
        v-html="fieldData.uiFieldsData.errors.message"
      ></span>
    </div>
  </div>
</template>
<script>
import mixinSettings from "../plugins/ui-fields-functions";
export default {
  mixins: [mixinSettings],
  data: () => ({
    component: "ui-radio"
  })
};
</script>
