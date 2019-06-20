class uiFieldsInstance {

  #form = {};
  #store = {};

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
    { key: 'requiredText', type: 'string', default: '*' },
    { key: 'step', type: 'number' }
  ];

  defaultInputComponentProps = [
    { key: 'type', type: 'string', default: 'text' },
    { key: 'name', type: 'string' },
    { key: 'label', type: 'string' },
    { key: 'persistent', type: 'boolean', default: true },
  ];

  defaultInputOptions = [
    { key: 'label', type: 'string', default: '' },
    { key: 'selected', type: 'boolean', default: false },
    { key: 'value', type: 'any', value: '' }
  ]
  /**
   * Init a new uiFields instance
   * @params options.name -- { String } name of form
   * @params options.classes -- { String or Array } all classes
   * @params options.component -- { String }
   */
  constructor(options, store) {
    this.#store = store;
    this.setForm(options);
  }
  setForm(options) {
    this.setFormName(options.name);
    this.setFormClasses(options.classes);
    this.setFormComponent(options.component);
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
    const form = this.getForm();
    this.#form.name = name;
  }
  setFormClasses(classes) {
    const formatedClasses = this.formatClasses(classes);

    const form = this.getForm();
    if (!form.hasOwnProperty('classes')) {
      form.classes = [];
    }

    form.classes = form.classes.concat(formatedClasses);
  }
  setFormComponent(component) {
    this.#form.component = component || 'fieldset';
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
        component
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


      //check for remaingin static items

      //check component type
      const componentType = this.formateComponentType(componentProperties.type);


      let value = remainingComponentProps.value || '';

      //we need options for these elements
      const formattedOptions = [];
      if (componentProperties.type === 'select' || componentProperties.type === 'radio') {
        const options = remainingComponentProps.options;
        if (options && Array.isArray(options)) {
          options.forEach((option) => {
            const [singleOption, customDataOptions] = this.formatProperties(option, this.defaultInputOptions);
            formattedOptions.push({
              ...singleOption,
              customData: customDataOptions
            });
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
              value.forEach((val) => {
                const option = formattedOptions.find((option) => option.value === val);
                if (option) option.selected = true;
              });
            } else {
              const option = formattedOptions.find((option) => option.value === value);
              if (option) option.selected = true;
            }
          } else {
            formattedOptions[0].selected = true;
            value = formattedOptions[0].value;
          }

          delete remainingComponentProps.options;
        }
      }

      const classes = this.formatClasses(remainingComponentProps.classes);

      fieldset.fields.push({
        HTMLProperties: HTMLProperties,
        ...componentProperties,
        componentType,
        value,
        options: formattedOptions,
        customData: remainingComponentProps,
        classes
      });
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
      if (!prop && defaultProp.default) {
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
    }
  }
  createError(message) {
    throw `uiFields: ${message}`;
  }
  createWarning(message) {
    console.warn(`uiFields: ${message}`);
  }
  // getFieldSettings() {
  //   return this.formFields;
  // }
  // getFieldSets() {
  //   return this.formFields.data;
  // }
  // getFieldSetByName(name) {
  //   return this.formFields.data.find(field => field.key === name);
  // }
  // setNewCondition(options) {
  //   if (options) {
  //     if (Array.isArray(options)) {
  //       options.forEach(option => this.createCondtion(option));
  //     } else {
  //       this.createCondtion(options);
  //     }
  //   }
  // }
  // setFieldSet(fieldSet) {
  //   if (Array.isArray(fieldSet)) {
  //     //we need a for each with an helper function
  //     fieldSet.forEach(field => {
  //       const val = this.checkParams(field, 1);
  //       if (val) this.formFields.data.push(val);
  //     });
  //   } else if (typeof fieldSet === "object" && fieldSet !== null) {
  //     const val = this.checkParams(fieldSet, 1);
  //     if (val) this.formFields.data.push(val);
  //   }
  // }
  // setField(options) {
  //   if (options) {
  //     if (Array.isArray(options)) {
  //       options.forEach(option => {
  //         if (option.depth) {
  //           const data = this.getFieldSetByName(option.depth);
  //           if (data) {
  //             if (!data.data) data.data = [];
  //             data.data.push(this.checkParams(option, 2));
  //           } else {
  //             //if fieldset does not exist and we want to create a new fieldset
  //             if (option.createNewFieldset) {
  //               this.setFieldSet({
  //                 key: option.depth,
  //                 container: option.container
  //               });
  //               this.setField(option);
  //             } else {
  //               this.createWarning({
  //                 message: "Depth does not exists",
  //                 option
  //               });
  //             }
  //           }
  //         }
  //       });
  //     } else {
  //       if (options.depth) {
  //         const data = this.getFieldSetByName(options.depth);
  //         if (data) {
  //           if (!data.data) data.data = [];
  //           data.data.push(this.checkParams(options, 2));
  //         } else {
  //           //if fieldset does not exist and we want to create a new fieldset
  //           if (options.createNewFieldset) {
  //             this.setFieldSet({
  //               key: options.depth,
  //               container: options.container
  //             });
  //             this.setField(options);
  //           } else {
  //             this.createWarning({
  //               message: "Depth does not exists",
  //               option: options
  //             });
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  // setClass(options) {
  //   if (options) {
  //     let values = Array.isArray(options.value)
  //       ? options.value
  //       : [options.value];

  //     if (options.depth) {
  //       //on field
  //       const fieldSet = this.getFieldSetByName(options.depth);
  //       if (Array.isArray(options.key)) {
  //         //multiple keys / fields
  //         options.key.forEach(key => {
  //           const field = fieldSet.data.find(field => key === field.name);
  //           if (field) {
  //             field.container.classes = [...field.container.classes, ...values];
  //           }
  //         });
  //       } else {
  //         //single field
  //         const field = fieldSet.data.find(field => options.key === field.name);
  //         if (field) {
  //           field.container.classes = [...field.container.classes, ...values];
  //         }
  //       }
  //     } else {
  //       //on fieldset
  //       if (Array.isArray(options.key)) {
  //         //multiple keys / fieldSets
  //         options.key.forEach(key => {
  //           const field = this.getFieldSetByName(key);
  //           if (field) {
  //             field.container.classes = [...field.container.classes, ...values];
  //           }
  //         });
  //       } else {
  //         //single fieldSet
  //         const field = this.getFieldSetByName(options.key);
  //         if (field) {
  //           field.container.classes = [...field.container.classes, ...values];
  //         }
  //       }
  //     }
  //   }
  // }
  // setExtraCustomData(defaultOptions, optionsDup) {
  //   let newData = {};
  //   //fill defaultOptions in newData and delete prop of dubplicate
  //   defaultOptions.forEach(option => {
  //     if (option.key === "persistent") {
  //       if (optionsDup[option.key] == false) {
  //         newData[option.key] = false;
  //       } else {
  //         newData[option.key] = true;
  //       }
  //     } else {
  //       newData[option.key] = optionsDup[option.key] || option.value;
  //     }
  //     if (typeof optionsDup[option.key] !== "undefined") {
  //       delete optionsDup[option.key];
  //     }
  //   });

  //   //add extra data if there is any
  //   if (Object.keys(optionsDup).length) {
  //     const { customData } = optionsDup;
  //     if (customData) {
  //       newData.customData = { ...optionsDup, ...customData };
  //     } else {
  //       newData.customData = optionsDup;
  //     }
  //   }
  //   return newData;
  // }
  // getDefaultOptions(depth) {
  //   if (depth < 2) {
  //     //defaultOptions of form and fieldset
  //     return [
  //       {
  //         key: "key",
  //         value: "form"
  //       },
  //       {
  //         key: "data",
  //         value: []
  //       },
  //       {
  //         key: "container",
  //         value: {}
  //       }
  //     ];
  //   } else {
  //     //field has different settings
  //     return [
  //       {
  //         key: "name",
  //         value: ""
  //       },
  //       {
  //         key: "test",
  //         value: false
  //       },
  //       {
  //         key: "value",
  //         value: ""
  //       },
  //       {
  //         key: "label",
  //         value: ""
  //       },
  //       {
  //         key: "type",
  //         value: "text"
  //       },
  //       {
  //         key: "required",
  //         value: false
  //       },
  //       {
  //         key: "requiredText",
  //         value: "*"
  //       },
  //       {
  //         key: "options",
  //         value: []
  //       },
  //       {
  //         key: "maxLength",
  //         value: null
  //       },
  //       {
  //         key: "minLength",
  //         value: null
  //       },
  //       {
  //         key: "max",
  //         value: null
  //       },
  //       {
  //         key: "min",
  //         value: null
  //       },
  //       {
  //         key: "placeholder",
  //         value: ""
  //       },
  //       {
  //         key: "container",
  //         value: {}
  //       },
  //       {
  //         key: "component",
  //         value: {}
  //       },
  //       {
  //         key: "errors",
  //         value: {}
  //       },
  //       {
  //         key: 'hooks',
  //         value: null
  //       },
  //       {
  //         key: 'persistent',
  //         value: true
  //       }
  //     ];
  //   }
  // }
  // checkParams(options, depth = 0) {
  //   //depth, 0 is form, 1 is fieldset, 2 is field
  //   if (typeof options !== "object") options = {};
  //   //make dubplicate of options
  //   const optionsDup = { ...options };
  //   //create variable defaultOptions
  //   let newData = this.setExtraCustomData(
  //     this.getDefaultOptions(depth),
  //     optionsDup
  //   );

  //   depth++;

  //   //if object has data check the data aswell
  //   if (newData.data && Array.isArray(newData.data)) {
  //     newData.data = newData.data
  //       .map(data => this.checkParams(data, depth))
  //       .filter(data => data);
  //   }

  //   //create component name based on depth, options: div, fieldset, undefined
  //   if (!newData.container.component)
  //     newData.container.component = depth === 1 ? "fieldset" : "div";

  //   //if no classes add those
  //   if (!newData.container.classes) newData.container.classes = [];

  //   //if classes is string and not array make array
  //   if (!Array.isArray(newData.container.classes)) {
  //     newData.container.classes = [newData.container.classes];
  //   }

  //   //if type of field is select make middle standard selected
  //   if (newData.type === "select" || newData.type === "radio") {
  //     if (!newData.options.find(input => input.selected)) {
  //       if (newData.value) {
  //         newData.options[0].selected = true;
  //         const indexOf = newData.options.findIndex(
  //           input => input.value === newData.value
  //         );
  //         if (indexOf > -1) {
  //           newData.options[indexOf].selected = true;
  //         } else {
  //           newData.value = newData.options[0].value;
  //           newData.options[0].selected = true;
  //         }
  //       } else {
  //         newData.value = newData.options[0].value;
  //         newData.options[0].selected = true;
  //       }
  //     } else {
  //       const value = newData.options.find(input => input.selected).value;
  //       newData.value = value;
  //     }
  //   }

  //   newData.edited = false;
  //   newData.load = this.createLoadData(newData);

  //   return newData;
  // }
  // createLoadData(data) {
  //   let component;
  //   switch (data.type) {
  //     case "text":
  //       component = "uiText";
  //       break;
  //     case "select":
  //       component = "uiSelect";
  //       break;
  //     case "checkbox":
  //       component = "uiCheckbox";
  //       break;
  //     case "radio":
  //       component = "uiRadio";
  //       break;
  //     case "number":
  //       component = "uiText";
  //       break;
  //     case "textarea":
  //       component = "uiTextarea";
  //       break;
  //     case "email":
  //       component = "uiText";
  //       break;
  //     case "tel":
  //       component = "uiText";
  //       break;
  //     case "password":
  //       component = "uiText";
  //       break;
  //     case "range":
  //       component = "uiText";
  //       break;
  //   }
  //   return {
  //     name: component,
  //     type: data.type
  //   };
  // }
  // createCondtion(options) {
  //   //check if object
  //   let fieldSet;
  //   if (typeof options === "object") {
  //     //place keys in array
  //     if (!Array.isArray(options.key)) options.key = [options.key];
  //     //data we are working with
  //     const data = this.getFieldSets();
  //     //if options depth that means we have fields inside a fieldset
  //     if (options.depth) {
  //       //if depth we define condition on field
  //       fieldSet = data.find(field => field.key === options.depth);
  //     } else {
  //       //there is no depth and we filter a whole fieldset?
  //       fieldSet = data.find(field => field.key === options.condition.depth);
  //     }
  //     //fieldSet is the depth we want to define condition
  //     if (fieldSet) {
  //       //elExists is the field we want where we get the value of the condition
  //       const elExists = fieldSet.data.find(
  //         field => field.name === options.condition.key
  //       );
  //       if (elExists) {
  //         //forEach field we want to create the logic
  //         options.key.forEach(name => {
  //           //get the fields that match the element name, returns field
  //           let newField;
  //           if (options.depth) {
  //             newField = fieldSet.data.filter(field => field.name === name);
  //           } else {
  //             newField = data.filter(field => field.key === name);
  //           }

  //           //for each cause input fields can have same name, now its more forgiving
  //           newField.forEach(allFields => {
  //             let val;
  //             if (typeof options.condition.value === "function") {
  //               val = options.condition.value(elExists.value);
  //             } else {
  //               val = elExists.value === options.condition.value;
  //             }
  //             if (allFields) {
  //               allFields.conditional = {
  //                 depth: options.depth || options.condition.depth,
  //                 key: options.condition.key,
  //                 value: options.condition.value,
  //                 show: val
  //               };
  //             }
  //           });
  //         });
  //       } else {
  //         this.createWarning({
  //           message:
  //             "The field you entered does not exists, this condition will be ignored",
  //           option: options
  //         });
  //       }
  //     } else {
  //       //fieldset does not exists
  //       if (options.accros) {
  //         options.key.forEach(name => {
  //           const newField = data.filter(field => field.key === name);
  //           newField.forEach(allFields => {
  //             if (allFields) {
  //               allFields.conditional = {
  //                 depth: options.condition.depth,
  //                 key: options.condition.key,
  //                 value: options.condition.value,
  //                 show: options.accrosValue
  //               };
  //             }
  //             this.formFields.accros = true;
  //           });
  //         });
  //       } else {
  //         this.createWarning({
  //           message:
  //             "The field you entered does not exists, this condition will be ignored",
  //           option: options
  //         });
  //       }
  //     }
  //   }
  // }
  // finishForm() {
  //   this.$store.dispatch("uiFields/setNewForm", this.getFieldSettings());
  // }
  // setForm() {
  //   this.$store.dispatch("uiFields/setNewForm", this.getFieldSettings());
  // }
  // //disabled eslint for the next line cause I need to create a warning for the developers
  // /* eslint-disable */
  // createWarning(message) {
  //   console.warn(message);
  // }
  // /* eslint-enable */
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
          const form = uiField.find(form => form.key === options.formName);
          if (form && form.data) {
            if (options.fieldsetName) {
              const fieldSet = form.data.find(
                fieldset => fieldset.key === options.fieldsetName
              );
              if (fieldSet && fieldSet.data) {
                return fieldSet.data;
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

<% if (options.veeValidate && options.veeValidate.preload) { %>
	import VeeValidate from 'vee-validate';
	<% if (options.veeValidate.config) { %>
    Vue.use(VeeValidate, <%= JSON.stringify(options.veeValidate.config, null, 2) %>);
	<% } else { %>
    Vue.use(VeeValidate, {
      events: 'blur'
    });
	<% } %>
<% } %>
