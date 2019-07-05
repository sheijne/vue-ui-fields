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
          value: newValue,
          persistent: this.fieldData.uiFieldsData.persistent
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