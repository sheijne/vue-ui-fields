<template>
  <div
    v-if="uiFieldsData && uiFieldsData.container"
    :class="getClasses(uiFieldsData.container.classes)"
  >
    <component
      v-for="(fields, i) of fieldsDataData"
      :is="uiFieldsData.container.component"
      :class="getClasses(fields.container.classes)"
      :key="i"
    >
      <div
        :class="[
          getClasses(fields.container.classes, '__container'),
          'uiFields__container'
        ]"
      >
        <template v-for="(item, index) of fields.data">
          <component
            v-if="checkCondition(item.conditional) && item.type !== 'component'"
            :is="fields.container.component"
            :key="index"
            :class="[
              getClasses(item.container.classes, '__fieldset'),
              getClasses(
                item.container.classes,
                '__fieldset--' + item.load.type
              ),
              'uiFields__fieldset',
              'uiFields__fieldset--' + item.load.type
            ]"
          >
            <div
              :class="[
                getClasses(item.container.classes, '__fieldset-container'),
                'uiFields__fieldset-container'
              ]"
            >
              <component
                :is="item.load.name"
                :field-index="index"
                :field-name="fieldName"
                :depth="fields.key"
              />
            </div>
          </component>
          <component
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
  data() {
    return {
      uiFieldsData: {}
    };
  },
  computed: {
    uiFields() {
      return this.$store.state.uiFields.fields;
    },
    fieldsDataData: function() {
      return this.uiFieldsData.data.filter(fields => {
        return this.checkCondition(fields.conditional);
      });
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
  created() {
    if (this.findCorrectFields(this.uiFields)) {
      this.uiFieldsData = this.findCorrectFields(this.uiFields);
    }
  },
  mounted() {
    this.$store.dispatch("uiFields/updateFromLocalStorage");
  },
  methods: {
    findCorrectFields(fields) {
      return fields.find(field => field.key === this.$props.fieldName) || [];
    },
    conditions(fields) {
      return fields.data.map(field => {
        if (field.data) {
          return field.data.map(secondField => {
            if (secondField.conditional) {
              return secondField.conditional.show;
            }
          });
        }
      });
    },
    checkCondition(input) {
      if (input) {
        if (input.show) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  }
};
</script>
