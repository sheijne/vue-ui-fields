<template>
  <div
    v-if="fieldData"
    :class="getClasses(fieldData.container.classes)"
    class="uiFields__field ui-textarea"
  >
    <label class="uiFields__element ui-textarea__element">
      <span
        :class="{ 'ui-textarea__label--is-required': fieldData.required }"
        class="uiFields__label ui-textarea__label"
        v-html="fieldData.label"
      >
      </span>
      <span
        v-if="fieldData.required"
        class="uiFields__label--required ui-textarea__label ui-textarea__label--required"
        >{{ fieldData.requiredText }}</span
      >
      <textarea
        v-validate.continues="getValidationOptions(fieldData.errors)"
        :ref="fieldData.name"
        v-model="fieldDataValue"
        :name="fieldData.name"
        :type="fieldData.type"
        :placeholder="fieldData.placeholder"
        :maxlength="fieldData.maxLength"
        :minlength="fieldData.minLength"
        :required="fieldData.required"
        class="uiFields__input ui-textarea__input"
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
      class="uiFields__errors ui-textarea__errors"
    >
      <span
        v-if="
          errors.collect(fieldData.name, fieldData.errors.veeValidateScope)
            .length
        "
        class="uiFields__error ui-textarea__error"
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
