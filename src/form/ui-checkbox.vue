<template>
  <div
    :class="getClasses(fieldData.container.classes)"
    class="uiFields__field ui-checkbox"
  >
    <label
      v-for="(option, index) in fieldData.options"
      :key="index"
      class="uiFields__element ui-checkbox__element"
    >
      <input
        v-validate.continues="getValidationOptions(fieldData.errors)"
        :name="fieldData.name"
        v-model="fieldDataValue"
        :value="option.value"
        :required="fieldData.required"
        type="checkbox"
        class="uiFields__input ui-checkbox__input"
      />
      <span class="uiFields__label ui-checkbox__label">
        <span class="ui-checkbox__label-text" v-html="option.label"></span>
      </span>
    </label>
    <component
      v-if="fieldData.component"
      :is="fieldData.component.name"
      v-bind="fieldData.component.props"
      :class="fieldData.component.classes"
      >{{ fieldData.component.content }}</component
    >
    <div
      v-if="fieldData.errors && fieldData.errors.validation"
      class="uiFields__errors ui-checkbox__errors"
    >
      <span
        v-if="errors.collect(fieldData.name).length"
        class="uiFields__error ui-checkbox__error"
        v-html="fieldData.errors.message"
      ></span>
    </div>
  </div>
</template>
<script>
const { mixinSettings } = require("../plugins/ui-fields-functions");
export default {
  mixins: [mixinSettings]
};
</script>
