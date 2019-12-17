export default {
  data: () => ({
    pristine: false,
    valid: null,
    canBeValid: false
  }),
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
    },
    fieldsetName: {
      type: String,
      default: ''
    },
    visibleField: {
      type: Boolean,
      default: true
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
        this.pristine = true;
        if (this.fieldData.type === 'number') {
          newValue = Number(newValue);
        }
        this.$store.dispatch("uiFields/updateFieldValue", {
          formName: this.$props.formName,
          fieldsetIndex: this.$props.fieldsetIndex,
          fieldIndex: this.$props.fieldIndex,
          value: newValue,
          persistent: this.fieldData.uiFieldsData.persistent
        });
      }
    },
    errors() {
      return this.$store.getters['uiFields/error']({
        formName: this.formName,
        fieldIndex: this.fieldData.name,
        fieldsetIndex: this.fieldsetIndex
      });
    }
  },
  watch: {
    errors: {
      handler() {
        if (this.errors.length === 0) {
          this.valid = true;
        } else {
          this.valid = false;
        }
      },
      deep: true
    }
  },
  methods: {
    findCorrectFields(fields) {
      return fields.find(field => field.name === this.$props.formName) || [];
    },
    checkErrors(event) {
      if (this.fieldData.errors.event === event) {
        this.canBeValid = true;
        const validation = this.fieldData.errors.validation;
        if (validation) {
          validation.forEach(async (item) => {
            const result = await item.validation(this.fieldDataValue, item.options);
            if (!result) {
              //there is an error, lets push it to the store (setter)
              this.$store.dispatch('uiFields/setError', {
                formName: this.formName,
                fieldsetIndex: this.fieldsetIndex,
                fieldIndex: this.fieldData.name,
                name: item.name,
                message: item.message(this.fieldDataValue, this.fieldData.name),
                value: this.fieldDataValue
              });
              this.valid = false;
            } else {
              this.$store.dispatch('uiFields/removeError', {
                formName: this.formName,
                fieldsetIndex: this.fieldsetIndex,
                fieldIndex: this.fieldData.name,
                name: item.name
              });
              this.valid = true;
            }
          });
        } else {
          this.valid = true;
        }
      }
    }
  }
};