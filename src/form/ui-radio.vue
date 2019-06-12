<template>
  <div
    :class="getClasses(fieldData.container.classes)"
    class="uiFields__field ui-radio"
  >
    <label
      v-for="(option, index) in fieldData.options"
      :key="index"
      class="uiFields__element ui-radio__element"
    >
      <input
        v-validate.continues="getValidationOptions(fieldData.errors)"
				:ref="fieldData.name"
        :name="fieldData.name"
        v-model="fieldDataValue"
        :value="option.value"
        type="radio"
        class="uiFields__input ui-radio__input"
      />
      <span class="uiFields__label ui-radio__label">
        <span class="ui-radio__label-text" v-html="option.label"></span>
      </span>
      <component
        v-if="option.component"
        :is="option.component.name"
        v-bind="option.component.props"
        :class="option.component.classes"
        >{{ option.component.content }}</component
      >
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
      class="uiFields__errors ui-radio__errors"
    >
      <span
        v-if="
          errors.collect(fieldData.name, fieldData.errors.veeValidateScope)
            .length
        "
        class="uiFields__error ui-radio__error"
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
