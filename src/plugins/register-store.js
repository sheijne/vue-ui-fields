let waitingTime = 1000 * 60 * 60 * 24;
<% if (options.persistentTime) { %>
  waitingTime = <%= options.persistentTime %>
<% } %>


const mutations = {
  setForm(state, form) {
    const formExsist = state.fields.findIndex((singleForm) => singleForm.name === form.name);
    if (formExsist > -1) {
      state.fields[formExsist] = form;
    } else {
      state.fields.push(form);
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
            field.uiFieldsData.hooks();
          }
          if (field.conditions) {
            field.conditions.forEach((condition) => {
              const form = state.fields.find((form) => form.name === condition.formName);
              if (condition.hasOwnProperty('fieldIndex')) {
                const field = form.fieldsets[condition.fieldsetIndex].fields[condition.fieldIndex];
                if (typeof condition.condition === 'string') {
                  field.conditionValue = options.value === condition;
                } else if (typeof condition.condition === 'function') {
                  field.conditionValue = condition.condition(options.value);
                }
              } else {
                //fieldset condition
                const fieldset = form.fieldsets[condition.fieldsetIndex];
                if (typeof condition.condition === 'string') {
                  fieldset.conditionValue = options.value === condition;
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
  resetFields(state) {
    state.fields = [];
  }
};

const actions = {
  setNewForm({ commit }, form) {
    commit("setForm", form);
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
    // if (fieldOptions) {
    //   //find correct form
    //   const form = state.fields.find(field => field.key === fieldOptions.name);

    //   if (form) {
    //     //check if depth is valid
    //     const fieldSet = form.data.find(
    //       field => field.key === fieldOptions.depth
    //     );
    //     if (fieldSet) {

    //       if (fieldOptions.index > -1 && fieldSet.data[fieldOptions.index]) {
    //         const persistent = fieldSet.data[fieldOptions.index].persistent;
    //         const time = new Date();
    //         fieldOptions.time = time.getTime();
    //         if (process.browser && persistent) {
    //           const uiFieldsLocal = localStorage.getItem("uiFields");
    //           const time = new Date();
    //           if (uiFieldsLocal) {
    //             //change settings
    //             let uiFields = JSON.parse(uiFieldsLocal);
    //             const fieldIndex = uiFields.data.findIndex(
    //               field =>
    //                 field.name === fieldOptions.name &&
    //                 field.depth === fieldOptions.depth &&
    //                 field.index === fieldOptions.index
    //             );
    //             if (fieldIndex > -1) {
    //               uiFields.data[fieldIndex].value = fieldOptions.value;
    //               uiFields.time = fieldOptions.time;
    //               if (!uiFields.time) {
    //                 uiFields.time = time.getTime();
    //               }
    //             } else {
    //               if (!fieldOptions.time) {
    //                 uiFields.time = time.getTime();
    //               }
    //               uiFields.data.push(fieldOptions);
    //             }
    //             localStorage.setItem("uiFields", JSON.stringify(uiFields));
    //           } else {
    //             localStorage.setItem(
    //               "uiFields",
    //               JSON.stringify({ data: [fieldOptions], time: time.getTime() })
    //             );
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
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
    if (process.browser) {
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
  }
};

export default async ({ store }) => {
  store.registerModule(
    "uiFields",
    {
      namespaced: true,
      state: () => ({
        fields: []
      }),
      actions: actions,
      mutations: mutations
    },
    {
      preserveState: false
    }
  );
};
