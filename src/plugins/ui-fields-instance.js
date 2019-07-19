const errorObject = {
  event: 'blur',
  showErrors: true,
  i18n: 'en',
  classes: {
    error: 'invalid',
    valid: 'valid',
    pristine: 'pristine'
  }
}

let errorOptions;
<% if (options.validation) { %> errorOptions = <%= JSON.stringify(options.validation) %><% } %>

if (errorOptions) {
  if (errorOptions.event) {
    errorObject.event = errorOptions.event;
  }
  if (errorOptions.hasOwnProperty('showErrors')) {
    errorObject.showErrors = errorOptions.showErrors;
  }
  if (errorOptions.i18n) {
    errorObject.i18n = errorOptions.i18n;
  }
  if (errorOptions.classes) {
    if (errorOptions.classes.error) {
      errorObject.classes.error = errorOptions.classes.error;
    }
    if (errorOptions.classes.valid) {
      errorObject.classes.valid = errorOptions.classes.valid;
    }
    if (errorOptions.classes.pristine) {
      errorObject.classes.pristine = errorOptions.classes.pristine;
    }
  }
}

import uiFieldsValidationRules from 'uiFieldsValidationRules';
import uiFieldsLanguageNL from 'uiFieldsLanguageNL';
import uiFieldsLanguageEN from 'uiFieldsLanguageEN';

const messages = {
  en: uiFieldsLanguageEN,
  nl: uiFieldsLanguageNL
};

class uiFieldsInstance {

  #form = {};
  #store = {};

  errorSettings = errorObject;

  defaultHTMLProps = [
    { key: 'autocomplete', type: 'string' },
    { key: 'disabled', type: 'boolean' },
    { key: 'max', type: 'number' },
    { key: 'maxlength', type: 'number' },
    { key: 'min', type: 'number' },
    { key: 'minlength', type: 'number' },
    { key: 'multiple', type: 'boolean' },
    { key: 'placeholder', type: 'string' },
    { key: 'required', type: 'boolean' },
    { key: 'step', type: 'number' }
  ];

  defaultInputComponentProps = [
    { key: 'type', type: 'string', default: 'text' },
    { key: 'name', type: 'string' },
    { key: 'label', type: 'string' }
  ];

  defaultInputOptions = [
    { key: 'label', type: 'string', default: '' },
    { key: 'selected', type: 'boolean', default: false },
    { key: 'value', type: 'any', value: '' },
    { key: 'disabled', type: 'boolean' },
  ]

  defaultRemainingDataValues = [
    { key: 'persistent', type: 'boolean', default: true },
    { key: 'errors', type: 'object' },
    { key: 'requiredText', type: 'string', default: '*' },
    { key: 'hooks', type: 'function' }

  ]

  defaultErrorSettings = [
    { key: 'validation', type: 'string' },
    { key: 'message', type: 'string' },
    { key: 'veeValidateScope', type: 'string' }
  ]

  defaultCustomComponentProps = [
    { key: 'content', type: 'string' },
    { key: 'name', type: 'string' },
    { key: 'props', type: 'object' },
  ]
  /**
   * Init a new uiFields instance
   * @params options.name -- { String } name of form
   * @params options.classes -- { String or Array } all classes
   * @params options.component -- { String }
   */
  constructor(options, store) {
    this.#store = store;
    this.setFormName(options.name);
    this.setFormClasses(options.classes);
    this.setFormComponent(options.component);
    this.setFormErrorSettings(options.validation);

  }
  setFormName(name) {
    //check if name
    if (!name) {
      this.createError('No name entered on construct function');
    }

    //check name type
    if (typeof name !== 'string') {
      this.createError('Name property on construct function has to be a String');
    }
    this.#form.name = name;
  }
  setFormClasses(classes) {
    const formatedClasses = this.formatClasses(classes);

    const form = this.getForm();
    if (!form.hasOwnProperty('classes')) {
      form.classes = [];
    }

    this.#form.classes = form.classes.concat(formatedClasses);
  }
  setFormComponent(component) {
    this.#form.component = component || 'fieldset';
  }
  setFormErrorSettings(options) {
    if (options) {
      this.errorSettings.event = options.event || errorObject.event;
      this.errorSettings.showErrors = options.hasOwnProperty('showErrors') ? options.showErrors : errorObject.showErrors;
      this.errorSettings.i18n = options.i18n || errorObject.i18n;

      if (options.classes) {
        this.errorSettings.classes = {
          error: options.classes.error || errorObject.classes.error,
          valid: options.classes.valid || errorObject.classes.valid,
          pristine: options.classes.pristine || errorObject.classes.pristine
        }
      }
    } else {
      this.errorSettings = errorObject;
    }
  }
  getForm() {
    return this.#form;
  }
  getFormName() {
    return this.getForm().name;
  }
  getFormClasses() {
    return this.getForm().classes;
  }
  getFormComponent() {
    return this.getForm().component;
  }
  setFieldset(options) {
    const form = this.getForm();

    //if the form has no fieldsets yet create a data property
    if (!form.hasOwnProperty('fieldsets')) {
      form.fieldsets = [];
    }

    //check if name
    if (!options.name) {
      this.createError('No name entered on construct function of fieldset');
    }

    //check name type
    if (typeof options.name !== 'string') {
      this.createError('Name property on construct function has to be a String');
    }

    const name = options.name;
    const classes = this.formatClasses(options.classes);
    const component = options.component || 'div';

    const exist = form.fieldsets.some((fieldset) => fieldset.name === name);
    if (!exist) {
      form.fieldsets.push({
        name,
        classes,
        component,
        conditionValue: true
      });
    } else {
      this.createError('You can not create two fieldsets with the same name');
    }
  }
  setFieldsets(options) {
    if (Array.isArray(options)) {
      options.forEach((option) => {
        this.setFieldset(option);
      });
    }
  }
  setFieldsetClassesByName(name, classes) {
    const fieldset = this.getFieldsetByName(name);
    if (fieldset) {
      const formattedClasses = this.formatClasses(classes);
      fieldset.classes = fieldset.classes.concat(formattedClasses);
    } else {
      this.createWarning(`uiFields: setFieldsetClasses function will be ignored for ${name} cause the fieldset is not found`);
    }
  }
  setFieldsetClassesAll(classes) {
    const fieldsets = this.getFieldsets();
    const formattedClasses = this.formatClasses(classes);
    fieldsets.forEach((fieldset) => {
      fieldset.classes = fieldset.classes.concat(formattedClasses);
    });
  }
  setField(options) {
    //first we need to decide all the props
    const fieldset = this.getFieldsetByName(options.fieldsetName);
    if (fieldset) {
      if (!fieldset.hasOwnProperty('fields')) {
        fieldset.fields = [];
      }
      const fieldExsist = fieldset.fields.some((field) => field.name === options.name);

      if (fieldExsist) {
        this.createError(`Field already exsist, choose another name ${options.name}`);
      }
      delete options.fieldsetName;

      const [HTMLProperties, remainingHTMLProps] = this.formatProperties(options, this.defaultHTMLProps);
      const [componentProperties, remainingComponentProps] = this.formatProperties(remainingHTMLProps, this.defaultInputComponentProps);
      const [defaultRemainingProperties, remainingProperties] = this.formatProperties(remainingComponentProps, this.defaultRemainingDataValues);
      //check for remaingin static items
      //check component type
      const componentType = this.formateComponentType(componentProperties.type);

      let newField = {};

      let value = remainingProperties.value || '';

      //we need options for these elements
      //format things when select or radio
      if (componentProperties.type === 'select' || componentProperties.type === 'radio' || componentProperties.type === 'checkbox') {
        const options = remainingProperties.options;
        if (options && Array.isArray(options)) {

          const formattedOptions = options.map((option) => {
            const [singleOption, customDataOptions] = this.formatProperties(option, this.defaultInputOptions);
            return {
              ...singleOption,
              customData: customDataOptions
            };
          });


          const selected = formattedOptions.filter((option) => option.selected);
          if (selected && selected.length) {
            //a value is selected
            if (selected.length === 1) {
              //value is single item
              if (Array.isArray(value)) {
                value = [selected[0].value];
              } else {
                value = selected[0].value;
              }
            } else {
              //there is a multiple select
              value = selected.map((option) => option.value);
            }
          } else if (value) {
            //there is a value in the global
            if (Array.isArray(value)) {
              if (value.length) {
                value.forEach((val) => {
                  const option = formattedOptions.find((option) => option.value === val);
                  if (option) option.selected = true;
                });
              } else {
                value = value;
              }
            } else {
              const option = formattedOptions.find((option) => option.value === value);
              if (option) option.selected = true;
            }
          } else {
            if (componentProperties.type !== 'checkbox') {
              formattedOptions[0].selected = true;
              value = formattedOptions[0].value;
            } else {
              value = false;
            }
          }
          newField.options = formattedOptions,
            delete remainingProperties.options;
        }
      }

      const classes = this.formatClasses(remainingProperties.classes);

      delete remainingProperties.classes;

      newField.HTMLProperties = {
        ...HTMLProperties,
        classes,
        ...remainingProperties.props
      };

      delete remainingProperties.props;

      if (remainingProperties.component) {
        const [componentOptions, remainingProps] = this.formatProperties(remainingProperties.component, this.defaultCustomComponentProps);

        const componentClasses = this.formatClasses(remainingProps.classes);
        componentOptions.classes = componentClasses;
        newField.component = componentOptions;
        delete remainingProps.classes;
        delete remainingProperties.component;
      }

      newField.errors = { ...this.errorSettings };
      if (remainingProperties.hasOwnProperty('validation')) {
        //set validation elements
        if (Array.isArray(remainingProperties.validation)) {
          newField.errors.validation = remainingProperties.validation.map((validation) => {
            if (typeof validation === 'string') {
              const data = uiFieldsValidationRules[validation];
              return {
                message: () => messages[this.errorSettings.i18n][validation],
                validation: data,
                name: validation,
                options: {}
              }
            } else if (typeof validation.custom === 'function') {
              return {
                message: validation.message,
                validation: validation.custom,
                name: validation.custom,
                options: validation.options
              }
            } else if (typeof validation === 'object') {
              const data = uiFieldsValidationRules[validation.name];
              let message = () => messages[this.errorSettings.i18n][validation.name];
              if (typeof validation.message === 'function') {
                message = validation.message;
              } else if (validation.message) {
                message = () => validation.message;
              }
              return {
                message,
                validation: data,
                name: validation.name,
                options: validation.options
              }
            }
          });
        }
      }
      newField = { ...newField, ...componentProperties };
      newField.value = value;
      newField.uiFieldsData = {
        componentType: componentType,
        ...defaultRemainingProperties,
      };
      newField.customData = remainingProperties;
      newField.conditionValue = true;

      fieldset.fields.push(newField);
    } else {
      this.createWarning(`the field you want to register has no fieldset, the field will be ignored. fieldsetName: ${options.fieldsetName}, fieldName: ${options.name}`);
    }
  }
  setFields(options) {
    if (Array.isArray(options)) {
      options.forEach((option) => {
        this.setField(option);
      });
    }
  }
  setNewCondition(options) {
    //lets find the dependent first
    const dependentOptions = options.dependent;

    //check required variables
    if (!dependentOptions.fieldName) {
      this.createWarning(`setNewCondition will be ignored, missing dependent.fieldName`);
    }

    if (!dependentOptions.fieldsetName) {
      this.createWarning(`setNewCondition will be ignored, missing dependent.fieldsetName`);
    }

    if (!options.fieldsetName) {
      this.createWarning(`setNewCondition will be ignored, missing fieldsetName`);
    }

    if (!options.condition) {
      this.createWarning(`setNewCondition will be ignored, missing condition`);
    }

    if (!options.fieldName) {
      //condition is on fieldset level
      const fieldForCondition = this.getFieldByName(dependentOptions.fieldName, dependentOptions.fieldsetName);
      if (fieldForCondition) {
        if (!fieldForCondition.hasOwnProperty('conditions')) {
          fieldForCondition.conditions = [];
        }
        if (Array.isArray(options.fieldsetName)) {
          options.fieldsetName.forEach((fieldName) => {
            let optionDup = { ...options };
            optionDup.fieldsetName = fieldName;
            this._setNewFieldsetConditionHelper(optionDup, fieldForCondition);
          });
        } else {
          this._setNewFieldsetConditionHelper(options, fieldForCondition);
        }
      }
    } else {
      if (!dependentOptions.hasOwnProperty('formName') || dependentOptions.formName === this.getFormName()) {

        const fieldForCondition = this.getFieldByName(dependentOptions.fieldName, dependentOptions.fieldsetName);

        if (fieldForCondition) {
          if (!fieldForCondition.hasOwnProperty('conditions')) {
            fieldForCondition.conditions = [];
          }

          if (Array.isArray(options.fieldName)) {
            options.fieldName.forEach((fieldName) => {
              let optionDup = { ...options };
              optionDup.fieldName = fieldName;
              this._setNewFieldConditionHelper(optionDup, fieldForCondition);
            });
          } else {
            this._setNewFieldConditionHelper(options, fieldForCondition);
          }

        } else {
          this.createWarning(`setNewCondition will be ignored for the following field: dependent: ${dependentOptions.formName}, ${dependentOptions.fieldsetName}, ${this.getFormName()}`)
        }
      } else {
        //create condition accross feature request
      }
    }
  }
  _setNewFieldsetConditionHelper(options, fieldForCondition) {
    const fieldSetCurrent = this.getFieldsetByName(options.fieldsetName);
    const fieldsetIndex = this.getFieldsets().findIndex((fieldset) => fieldset.name === options.fieldsetName);
    if (fieldsetIndex > -1) {
      fieldForCondition.conditions.push({
        formName: this.getFormName(),
        fieldsetIndex,
        condition: options.condition
      });

      //test condition the first time
      if (typeof options.condition !== 'function') {
        fieldSetCurrent.conditionValue = fieldForCondition.value === options.condition;
      } else if (typeof options.condition === 'function') {
        fieldSetCurrent.conditionValue = options.condition(fieldForCondition.value);
      }

    } else {
      this.createWarning(`setNewCondition will be ignored for the following field: options: ${options.formName}, ${options.fieldsetName}, ${this.getFormName()}`)
    }
  }
  _setNewFieldConditionHelper(options, fieldForCondition) {
    const fieldCurrent = this.getFieldByName(options.fieldName, options.fieldsetName);
    if (!fieldCurrent) {
      this.createWarning(`setNewCondition will be ignored for the following field: options: ${options.formName}, ${options.fieldsetName}, ${this.getFormName()}`)
      return;
    }
    const fieldsetIndex = this.getFieldsets().findIndex((fieldset) => fieldset.name === options.fieldsetName);
    if (fieldsetIndex === -1) {
      this.createWarning(`setNewCondition will be ignored for the following field: options: ${options.formName}, ${options.fieldsetName}, ${this.getFormName()}`)
      return;
    }

    const fieldIndex = this.getFieldsetByName(options.fieldsetName).fields.findIndex((field) => field.name === options.fieldName);

    if (fieldsetIndex > -1 && fieldIndex > -1) {
      fieldForCondition.conditions.push({
        formName: this.getFormName(),
        fieldsetIndex,
        fieldIndex,
        condition: options.condition
      });

      //test condition the first time

      if (typeof options.condition !== 'function') {
        fieldCurrent.conditionValue = fieldForCondition.value === options.condition;
      } else if (typeof options.condition === 'function') {
        fieldCurrent.conditionValue = options.condition(fieldForCondition.value);
      }

    } else {
      this.createWarning(`setNewCondition will be ignored for the following field: options: ${options.formName}, ${options.fieldsetName}, ${this.getFormName()}`)
    }
  }
  getFieldsets() {
    return this.getForm().fieldsets;
  }
  getFieldsetByName(name) {
    const fieldsets = this.getFieldsets();
    return fieldsets.find((fieldset) => fieldset.name === name);
  }
  getFields() {
    const fieldsets = this.getFieldsets();
    let fields = [];
    fieldsets.forEach((field) => fields = fields.concat(field.fields));
    return fields;
  }
  getFieldByName(name, fieldsetName) {
    if (fieldsetName) {
      const fieldset = this.getFieldsetByName(fieldsetName);
      return fieldset.fields.find((field) => field.name === name);
    } else {
      const fields = this.getFields();
      return fields.find((field) => field.name === name);
    }
  }
  //helper functions
  formatClasses(classes) {
    if (classes) {
      if (Array.isArray(classes)) {
        return classes.filter((className) => typeof className === 'string');
      } else if (typeof classes === 'string') {
        return [classes];
      }
    }
    //default returns an array
    return [];
  }
  formatProperties(property, defaultProps) {
    //create a duplicate so we don't modify this info directly
    const propertyDup = { ...property };
    const defaultPropsDup = [...defaultProps];
    const properties = {};

    defaultPropsDup.forEach((defaultProp) => {
      const prop = propertyDup[defaultProp.key];
      if (defaultProp.default) {
        properties[defaultProp.key] = defaultProp.default;
      }
      if (prop !== 'undefined' && prop !== null && (typeof prop === defaultProp.type || defaultProp.type === 'any')) {
        properties[defaultProp.key] = prop;
        delete propertyDup[defaultProp.key];
      }
    });

    return [
      properties,
      propertyDup
    ]
  }
  formateComponentType(type) {
    switch (type) {
      case "text":
        return "uiText";
      case "select":
        return "uiSelect";
      case "checkbox":
        return "uiCheckbox";
      case "radio":
        return "uiRadio";
      case "number":
        return "uiText";
      case "textarea":
        return "uiTextarea";
      case "email":
        return "uiText";
      case "tel":
        return "uiText";
      case "password":
        return "uiText";
      case "range":
        return "uiText";
      default:
        return type;
    }
  }
  createError(message) {
    throw `uiFields: ${message}`;
  }
  createWarning(message) {
    console.warn(`uiFields: ${message}`);
  }
  finishForm() {
    this.#store.dispatch("uiFields/setNewForm", this.getForm());
  }
  setForm() {
    this.#store.dispatch("uiFields/setNewForm", this.getForm());
  }
}

Array.prototype.getSingleUiField = function (name) {
  if (name) {
    if (this.length) {
      return this.find(field => field.name === name);
    }
  }
  return undefined;
};

//global mixin functions
import Vue from "vue";

Vue.component('uiText', () => import('uiText'));
Vue.component('uiError', () => import('uiError'));
Vue.component('uiErrors', () => import('uiErrors'));
Vue.component('uiCheckbox', () => import('uiCheckbox'));
Vue.component('uiSelect', () => import('uiSelect'));
Vue.component('uiRadio', () => import('uiRadio'));
Vue.component('uiFields', () => import('uiFields'));
Vue.component('uiTextarea', () => import('uiTextarea'));


Vue.mixin({
  methods: {
    createNewUiFieldsInstance(options) {
      return new uiFieldsInstance(options, this.$store);
    },
    getClasses(classes, name = "") {
      if (classes.length) {
        return classes.map(clas => `${clas}${name}`);
      }
      return "";
    },
    getCorrectFieldSet(options) {
      if (options) {
        const uiField = this.$store.state.uiFields.fields;
        if (options.formName) {
          const form = uiField.find(form => form.name === options.formName);
          if (form && form.fieldsets) {
            if (options.fieldsetName) {
              const fieldSet = form.fieldsets.find(
                fieldset => fieldset.name === options.fieldsetName
              );
              if (fieldSet && fieldSet.fields) {
                return fieldSet.fields;
              }
            }
          }
        }
      }
      return false;
    },
    getCorrectField(options) {
      const fieldSet = this.getCorrectFieldSet(options);
      if (typeof fieldSet === "object") {
        if (fieldSet.length) {
          return fieldSet.find(field => field.name === options.fieldName);
        }
      }
      return false;
    }
  }
});

export default async ({ store }) => {
  Vue.prototype.$uiFields = {
    new(options) {
      return new uiFieldsInstance(options, store);
    },
    validate(formName) {
      return new Promise(async (resolve) => {
        const result = await store.dispatch('uiFields/validate', formName);
        if (!result.valid) {
          const errors = result.errors.filter((error) => error.custom_error);
          if (errors.length === result.errors.length) {
            //only custom errors, delete and return
            errors.forEach((error) => store.dispatch('uiFields/removeError', error));
            result.errors = [];
            result.valid = true;
          } else {
            //there are only own errors, scroll to the first error
            const element = document.getElementById(`${result.errors[0].fieldsetIndex}__${result.errors[0].fieldIndex}`);
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
              });
            }
          }
        }
        resolve(result);
      });
    },
    setError(options) {
      store.dispatch('uiFields/setError', { ...options, custom_error: true });
    },
    removeError(options) {
      store.dispatch('uiFields/removeError', { ...options, custom_error: true });
    }
  }
}