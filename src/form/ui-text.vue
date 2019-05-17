<template>
  <div
    v-if="fieldData"
    :class="getClasses(fieldData.container.classes)"
    class="uiFields__field ui-text"
  >
    <label class="uiFields__element ui-text__element">
      <span
        :class="{ 'ui-text__label--is-required': fieldData.required }"
        class="uiFields__label ui-text__label"
        v-html="fieldData.label"
      >
      </span>
      <span
        v-if="fieldData.required"
        class="uiFields__label--required ui-text__label ui-text__label--required"
        >{{ fieldData.requiredText }}</span
      >
      <input
        v-validate.continues="getValidationOptions(fieldData.errors)"
        ref="input"
        v-model="fieldDataValue"
        :name="fieldData.name"
        :type="fieldData.type"
        :placeholder="fieldData.placeholder"
        :maxlength="fieldData.maxLength"
        :minlength="fieldData.minLength"
        :required="fieldData.required"
        class="uiFields__input ui-text__input"
      />
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
      class="uiFields__errors ui-text__errors"
    >
      <span
        v-if="errors.collect(fieldData.name).length"
        class="uiFields__error ui-text__error"
        v-html="fieldData.errors.message"
      ></span>
    </div>
  </div>
</template>
<script>
import mixinSettings from "../plugins/ui-fields-functions";
export default {
  mixins: [mixinSettings]
};
</script>
