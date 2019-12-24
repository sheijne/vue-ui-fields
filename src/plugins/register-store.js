let waitingTime = 1000 * 60 * 60 * 24;
<% if (options.persistentTime) { %>
  waitingTime = <%= options.persistentTime %>
<% } %>

const time = new Date();

const mutations = {
  setForm(state, form) {
    const formExsist = state.fields.findIndex((singleForm) => singleForm.name === form.name);
    //dont change if it already exsists
    if (formExsist === -1) {
      state.fields.push(form);
    } else {
      state.fields.splice(formExsist, 1, form);
    }
  },
  updateFieldValue(state, options) {
    const form = state.fields.find((form) => form.name === options.formName);
    if (form) {
      const fieldset = form.fieldsets[options.fieldsetIndex];
      if (fieldset) {
        const field = fieldset.fields[options.fieldIndex];
        if (field) {
          field.value = options.value;

          //activate hooks
          if (field.uiFieldsData.hooks) {
            field.uiFieldsData.hooks(options.value);
          }

          if (field.conditions) {
            field.conditions.forEach((condition) => {
              const form = state.fields.find((form) => form.name === condition.formName);
              if (condition.hasOwnProperty('fieldIndex')) {
                const field = form.fieldsets[condition.fieldsetIndex].fields[condition.fieldIndex];
                if (typeof condition.condition !== 'function') {
                  field.conditionValue = options.value === condition.condition;
                } else if (typeof condition.condition === 'function') {
                  field.conditionValue = condition.condition(options.value);
                }
              } else {
                //fieldset condition
                const fieldset = form.fieldsets[condition.fieldsetIndex];
                if (typeof condition.condition !== 'function') {
                  fieldset.conditionValue = options.value === condition.condition;
                } else if (typeof condition.condition === 'function') {
                  fieldset.conditionValue = condition.condition(options.value);
                }
              }
            });
          }
        }
      }
    }
  },
  addExtraCondition(state, { depObj, conditionObj }) {
    const form = state.fields.find((form) => form.name === depObj.formName);
    if (form) {
      const field = form.fieldsets[depObj.fieldSetForCondition].fields[depObj.fieldIndex];
      if (!field.hasOwnProperty('conditions')) {
        field.conditions = [];
      }
      field.conditions.push(conditionObj);
      const form2 = state.fields.find((form) => form.name === conditionObj.formName);
      const field2 = form2.fieldsets[conditionObj.fieldsetIndex].fields[conditionObj.fieldIndex];
      if (typeof conditionObj.condition !== 'function') {
        field2.conditionValue = field.value === conditionObj.condition;
      } else if (typeof conditionObj.condition === 'function') {
        field2.conditionValue = conditionObj.condition(field.value);
      }
    }
  },
  resetFields(state) {
    state.fields = [];
  },
  setError(state, options) {
    const stateDup = [...state.errors];
    const errorExsist = stateDup.findIndex((error) => error.formName === options.formName && error.fieldsetIndex === options.fieldsetIndex && error.fieldIndex === options.fieldIndex && error.name === options.name);

    if (errorExsist === -1) {
      stateDup.push(options);
    }

    state.errors = stateDup;
  },
  removeError(state, options) {
    const stateDup = [...state.errors];
    const errorExsist = stateDup.findIndex((error) => error.formName === options.formName && error.fieldsetIndex === options.fieldsetIndex && error.fieldIndex === options.fieldIndex && error.name === options.name);

    if (errorExsist > -1) {
      //we can only remove an item that already exsists
      stateDup.splice(errorExsist, 1);
    }

    state.errors = stateDup;
  },
};

const actions = {
  setNewForm({ commit }, form) {
    if (!process.server) {
      commit("setForm", form);
    }
  },
  updateFieldValue({ commit, state }, fieldOptions) {
    const form = state.fields.find((form) => form.name === fieldOptions.formName);
    if (typeof fieldOptions.fieldsetIndex === 'string') {
      const fieldset = form.fieldsets.findIndex((fieldsetItem) => fieldsetItem.name === fieldOptions.fieldsetIndex);
      fieldOptions.fieldsetIndex = fieldset;
    }

    if (typeof fieldOptions.fieldIndex === 'string') {
      const field = form.fieldsets[fieldOptions.fieldsetIndex].fields.findIndex((field) => field.name === fieldOptions.fieldIndex);
      fieldOptions.fieldIndex = field;
    }

    commit('updateFieldValue', fieldOptions);
    if (fieldOptions) {
      if (process.client && fieldOptions.persistent !== false) {
        const uiFieldsLocal = localStorage.getItem("uiFields");
        if (uiFieldsLocal) {
          let uiFields = JSON.parse(uiFieldsLocal);
          const findIndex = uiFields.data.findIndex((item) => item.fieldIndex === fieldOptions.fieldIndex && item.fieldsetIndex === fieldOptions.fieldsetIndex && item.formName === fieldOptions.formName);
          if (findIndex > -1) {
            uiFields.data[findIndex] = fieldOptions;
          } else {
            uiFields.data.push(fieldOptions);
          }
          localStorage.setItem("uiFields", JSON.stringify({ data: uiFields.data, time: time.getTime() }));
        } else {
          localStorage.setItem("uiFields", JSON.stringify({ data: [fieldOptions], time: time.getTime() }));
        }
      }
    }
  },
  resetSingleForm({ dispatch, state }, formName) {
    if (formName) {
      //find correct form
      const form = state.fields.find(field => field.name === formName);
      if (form) {
        form.fieldsets.forEach((fieldset, index) => {
          fieldset.fields.forEach((field, i) => {
            dispatch('updateFieldValue', {
              formName: formName,
              fieldsetIndex: index,
              fieldIndex: i,
              value: Array.isArray(field.value) ? [] : ""
            });
          });
        });
      }
    }
  },
  resetFields({ commit }) {
    commit("resetFields");
  },
  updateFromLocalStorage({ dispatch }) {
    if (process.client) {
      let uiFields = localStorage.getItem("uiFields");
      if (uiFields) {
        uiFields = JSON.parse(uiFields);
        let time = new Date();
        time = time.getTime();
        if (time - uiFields.time < waitingTime) {
          uiFields.data.forEach(field => {
            dispatch("updateFieldValue", field);
          });
        } else {
          localStorage.removeItem("uiFields");
        }
      }
    }
  },
  setError({ commit, state }, fieldOptions) {
    const form = state.fields.find((form) => form.name === fieldOptions.formName);

    if (typeof fieldOptions.fieldsetIndex === 'number') {
      const fieldset = form.fieldsets[fieldOptions.fieldsetIndex];
      fieldOptions.fieldsetIndex = fieldset.name;
    }

    commit('setError', fieldOptions);
  },
  removeError({ commit, state }, fieldOptions) {
    const form = state.fields.find((form) => form.name === fieldOptions.formName);
    if (typeof fieldOptions.fieldsetIndex === 'number') {
      const fieldset = form.fieldsets[fieldOptions.fieldsetIndex];
      fieldOptions.fieldsetIndex = fieldset.name;
    }
    commit('removeError', fieldOptions);
  },
  validate({ dispatch, getters }, { formName, options }) {
    return new Promise(async (resolve) => {
      const fields = getters.flattenFields(formName);
      const validation = fields.reduce((accum, field, index) => {
        if (field.errors.validation) {
          const validation = [...field.errors.validation].map((item) => ({
            item,
            field,
            index
          }));
          if (field.conditionValue === true && field.fieldsetShow === true) {
            accum = accum.concat(validation);
            return accum;
          } else {
            field.errors.validation.forEach((item) => {
              dispatch('removeError', {
                formName: formName,
                fieldsetIndex: field.fieldsetName,
                fieldIndex: field.name,
                name: item.name
              });
            })
          }
        }
        return accum;
      }, []);
      await Promise.all(validation.map((valid) => {
        return new Promise(async (resolveMap) => {
          const item = valid.item;
          const field = valid.field;
          let validate = true;
          if (field.fieldsetShow !== true || field.conditionValue !== true) {
            validate = false;
          }
          if ((options && options.fieldsetName !== field.fieldsetName)) {
            validate = false;
          }
          if ((options && options.fieldName !== field.name)) {
            validate = false;
          }

          if (!validate) {
            dispatch('removeError', {
              formName: formName,
              fieldsetIndex: field.fieldsetName,
              fieldIndex: field.name,
              name: item.name
            });
            resolveMap();
            return;
          }

          const result = await item.validation(field.value, item.options);
          if (!result) {
            //there is an error, lets push it to the store (setter)
            dispatch('setError', {
              formName: formName,
              fieldsetIndex: field.fieldsetName,
              fieldIndex: field.name,
              name: item.name,
              message: item.message(field.value, field.name),
              value: field.value,
              sortIndex: valid.index
            });
          } else {
            dispatch('removeError', {
              formName: formName,
              fieldsetIndex: field.fieldsetName,
              fieldIndex: field.name,
              name: item.name
            });
          }
          resolveMap();
        })
      }));
      const errors = getters.errors({ formName: [formName] });
      resolve({
        valid: errors.length === 0,
        errors
      });
    })
  },
  extraCondition({ commit, getters }, options) {
    const dependentOptions = options.dependent;
    const form = getters['field'](dependentOptions.formName);
    if (form && Object.keys(form).length) {
      const fieldSetForCondition = form.fieldsets.findIndex((fieldset) => {
        if (fieldset.name === dependentOptions.fieldsetName) {
          return true;
        }
      });
      if (fieldSetForCondition > -1) {
        const fieldForCondition = form.fieldsets[fieldSetForCondition].fields.findIndex((field) => field.name === dependentOptions.fieldName);
        if (fieldForCondition > -1) {
          const depObj = {
            formName: dependentOptions.formName,
            fieldIndex: fieldForCondition,
            fieldSetForCondition,
          }
          //depObject found, condition object needs to be created

          const form2 = getters['field'](options.formName);
          if (form2 && Object.keys(form2).length) {
            const fieldSetForCondition2 = form2.fieldsets.findIndex((fieldset) => {
              if (fieldset.name === options.fieldsetName) {
                return true;
              }
            });
            if (fieldSetForCondition2 > -1) {
              const fieldForCondition2 = form2.fieldsets[fieldSetForCondition2].fields.findIndex((field) => field.name === options.fieldName);
              if (fieldForCondition2 > -1) {
                const conditionObj = {
                  formName: options.formName,
                  fieldsetIndex: fieldSetForCondition2,
                  fieldIndex: fieldForCondition2,
                  condition: options.condition
                };
                commit('addExtraCondition',
                  {
                    depObj,
                    conditionObj
                  }
                );
              }
            }
          }
        } else {
          console.warn('setNewCondition will be ignored, field not found')
        }
      } else {
        console.warn('setNewCondition will be ignored, field not found')
      }
    } else {
      console.warn('setNewCondition will be ignored, incorrect formName')
    }
  }
};

const getters = {
  field: (state) => (name) => {
    if (name && state.fields) {
      return state.fields.find((item) => item.name === name) || {};
    }
    return {};
  },
  error: (state) => (options) => {
    const form = state.fields.find((form) => form.name === options.formName);

    if (typeof options.fieldsetIndex === 'number') {
      const fieldset = form.fieldsets[options.fieldsetIndex];
      options.fieldsetIndex = fieldset.name;
    }

    if (options && state.errors) {
      return state.errors.filter((item) => item.formName === options.formName && item.fieldsetIndex === options.fieldsetIndex && item.fieldIndex === options.fieldIndex);
    }
    return [];
  },
  errors: (state) => (options) => {
    if (options) {
      if (options.formName) {
        let errors = options.formName.reduce((accum, error) => {
          if (!!options.fieldsetIndex) {
            if (!!options.fieldIndex) {
              accum = accum.concat(state.errors.filter((item) => item.formName === error && item.fieldsetIndex === options.fieldsetIndex && item.fieldIndex === options.fieldIndex));
            } else {
              accum = accum.concat(state.errors.filter((item) => item.formName === error && item.fieldsetIndex === options.fieldsetIndex));
            }
          } else {
            accum = accum.concat(state.errors.filter((item) => item.formName === error));
          }
          return accum;
        }, []);
        errors.sort((a, b) => a.sortIndex > b.sortIndex ? 1 : -1)
        return errors;
      }
    }
    return [];
  },
  flattenFields: (state) => (formName, fieldsetName) => {
    const form = state.fields.find((form) => form.name === formName);
    if (form) {
      return form.fieldsets.reduce((accum, curr) => {
        if (curr.fields) {
          accum = accum.concat(curr.fields.map((field) => ({ ...field, fieldsetName: curr.name, fieldsetShow: curr.conditionValue })));
          if (fieldsetName) {
            accum = accum.filter((item) => item.fieldsetName === fieldsetName)
          }
        }
        return accum;
      }, []);
    }
    return [];
  }
}
export default async ({ store }) => {
  store.registerModule(
    "uiFields",
    {
      namespaced: true,
      state: () => ({
        fields: [],
        errors: []
      }),
      actions,
      mutations,
      getters
    },
    {
      preserveState: false
    }
  );
};
