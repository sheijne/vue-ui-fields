(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('~/components/icons'), require('~/plugins/mixins/uiFieldsFunctions'), require('vue'), require('~/components/form/ui-button.vue'), require('~/components/form/ui-checkbox.vue'), require('~/components/form/ui-select.vue'), require('~/components/form/ui-text.vue'), require('~/components/form/ui-fields.vue'), require('~/components/form/ui-radio.vue')) :
	typeof define === 'function' && define.amd ? define(['exports', '~/components/icons', '~/plugins/mixins/uiFieldsFunctions', 'vue', '~/components/form/ui-button.vue', '~/components/form/ui-checkbox.vue', '~/components/form/ui-select.vue', '~/components/form/ui-text.vue', '~/components/form/ui-fields.vue', '~/components/form/ui-radio.vue'], factory) :
	(factory((global.uiFields = {}),null,global.mixin,global.Vue,global.UiButton,global.UiCheckbox,global.UiSelect,global.UiText,global.UiFields,global.UiRadio));
}(this, (function (exports,icons,mixin,Vue,UiButton,UiCheckbox,UiSelect,UiText,UiFields,UiRadio) { 'use strict';

	mixin = mixin && mixin.hasOwnProperty('default') ? mixin['default'] : mixin;
	Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;
	UiButton = UiButton && UiButton.hasOwnProperty('default') ? UiButton['default'] : UiButton;
	UiCheckbox = UiCheckbox && UiCheckbox.hasOwnProperty('default') ? UiCheckbox['default'] : UiCheckbox;
	UiSelect = UiSelect && UiSelect.hasOwnProperty('default') ? UiSelect['default'] : UiSelect;
	UiText = UiText && UiText.hasOwnProperty('default') ? UiText['default'] : UiText;
	UiFields = UiFields && UiFields.hasOwnProperty('default') ? UiFields['default'] : UiFields;
	UiRadio = UiRadio && UiRadio.hasOwnProperty('default') ? UiRadio['default'] : UiRadio;

	//
	var script = {
		mixins: [mixin]
	};

	/* script */
	            const __vue_script__ = script;
	            
	/* template */
	var __vue_render__ = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    {
	      staticClass: "ui-checkbox",
	      class: _vm.getClasses(_vm.fieldData.container.classes)
	    },
	    [
	      _vm._l(_vm.fieldData.options, function(option, index) {
	        return _c(
	          "label",
	          { key: index, staticClass: "ui-checkbox__element" },
	          [
	            _c("input", {
	              directives: [
	                {
	                  name: "validate",
	                  rawName: "v-validate.continues",
	                  value: _vm.getValidationOptions(_vm.fieldData.errors),
	                  expression: "getValidationOptions(fieldData.errors)",
	                  modifiers: { continues: true }
	                },
	                {
	                  name: "model",
	                  rawName: "v-model",
	                  value: _vm.fieldDataValue,
	                  expression: "fieldDataValue"
	                }
	              ],
	              staticClass: "ui-checkbox__input",
	              attrs: { name: _vm.fieldData.name, type: "checkbox" },
	              domProps: {
	                value: option.value,
	                checked: Array.isArray(_vm.fieldDataValue)
	                  ? _vm._i(_vm.fieldDataValue, option.value) > -1
	                  : _vm.fieldDataValue
	              },
	              on: {
	                change: function($event) {
	                  var $$a = _vm.fieldDataValue,
	                    $$el = $event.target,
	                    $$c = $$el.checked ? true : false;
	                  if (Array.isArray($$a)) {
	                    var $$v = option.value,
	                      $$i = _vm._i($$a, $$v);
	                    if ($$el.checked) {
	                      $$i < 0 && (_vm.fieldDataValue = $$a.concat([$$v]));
	                    } else {
	                      $$i > -1 &&
	                        (_vm.fieldDataValue = $$a
	                          .slice(0, $$i)
	                          .concat($$a.slice($$i + 1)));
	                    }
	                  } else {
	                    _vm.fieldDataValue = $$c;
	                  }
	                }
	              }
	            }),
	            _vm._v(" "),
	            _c("span", { staticClass: "ui-checkbox__label" }, [
	              _c("span", { staticClass: "ui-checkbox__icon" }, [
	                _c(
	                  "svg",
	                  {
	                    attrs: {
	                      xmlns: "http://www.w3.org/2000/svg",
	                      width: "8",
	                      height: "8",
	                      viewBox: "0 0 13 12"
	                    }
	                  },
	                  [
	                    _c("path", {
	                      attrs: {
	                        "fill-rule": "evenodd",
	                        d:
	                          "M11.714.363a1.2 1.2 0 0 0-.858.42C8.465 3.42 6.638 5.621 4.419 8.113L2.055 5.916a1.161 1.161 0 0 0-1.231-.243c-.42.167-.727.569-.805 1.053-.078.484.086.977.429 1.292l3.245 3.021a1.167 1.167 0 0 0 1.686-.077c2.689-2.964 4.603-5.332 7.24-8.239.37-.394.483-.999.283-1.521-.2-.523-.672-.856-1.188-.84z"
	                      }
	                    })
	                  ]
	                )
	              ]),
	              _vm._v(" "),
	              _c("span", {
	                staticClass: "ui-checkbox__label-text",
	                domProps: { innerHTML: _vm._s(option.label) }
	              })
	            ])
	          ]
	        )
	      }),
	      _vm._v(" "),
	      _vm.fieldData.component
	        ? _c(
	            _vm.fieldData.component.name,
	            _vm._b(
	              {
	                tag: "component",
	                class: _vm.fieldData.component.classes,
	                domProps: { innerHTML: _vm._s(_vm.fieldData.component.content) }
	              },
	              "component",
	              _vm.fieldData.component.props,
	              false
	            )
	          )
	        : _vm._e(),
	      _vm._v(" "),
	      _vm.fieldData.errors && _vm.fieldData.errors.validation
	        ? _c("div", { staticClass: "ui-checkbox__errors" }, [
	            _vm.errors.collect(_vm.fieldData.name).length
	              ? _c("span", {
	                  staticClass: "ui-checkbox__error",
	                  domProps: { innerHTML: _vm._s(_vm.fieldData.errors.message) }
	                })
	              : _vm._e()
	          ])
	        : _vm._e()
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__ = [];
	__vue_render__._withStripped = true;

	  /* style */
	  const __vue_inject_styles__ = undefined;
	  /* scoped */
	  const __vue_scope_id__ = undefined;
	  /* module identifier */
	  const __vue_module_identifier__ = undefined;
	  /* functional template */
	  const __vue_is_functional_template__ = false;
	  /* component normalizer */
	  function __vue_normalize__(
	    template, style, script$$1,
	    scope, functional, moduleIdentifier,
	    createInjector, createInjectorSSR
	  ) {
	    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

	    // For security concerns, we use only base name in production mode.
	    component.__file = "/Users/dennisdipsaus/Documents/Projects/vue-uiFields/src/form/ui-checkbox.vue";

	    if (!component.render) {
	      component.render = template.render;
	      component.staticRenderFns = template.staticRenderFns;
	      component._compiled = true;

	      if (functional) component.functional = true;
	    }

	    component._scopeId = scope;

	    return component
	  }
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var uiCheckbox = __vue_normalize__(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    undefined,
	    undefined
	  )

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var script$1 = {
		props: {
			fieldName: {
				type: String,
				default: 'form'
			}
		},
		data() {
			return {
				uiFieldsData: {}
			};
		},
		computed: {
			uiFields: {
				get: function() {
					return this.$store.state.uiFields.fields;
				}
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
		beforeCreate() {
			this.$store.dispatch('uiFields/resetFields');
		},
		methods: {
			findCorrectFields(fields) {
				return fields.find((field) => field.key === this.$props.fieldName) || [];
			},
			conditions(fields) {
				return fields.data.map((field) => {
					if (field.data) {
						return field.data.map((secondField) => {
							if (secondField.conditional) {
								return secondField.conditional.show;
							}
						});
					}
				});
			},
			checkCondition(input) {
				if (input) {
					return input.show;
				} else {
					return true;
				}
			},
			checkTextField(type) {
				if (type === 'text' || type === 'number' || type === 'email' || type === 'tel' || type === 'password') return true;
			}
		}
	};

	/* script */
	            const __vue_script__$1 = script$1;
	            
	/* template */
	var __vue_render__$1 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _vm.uiFieldsData && _vm.uiFieldsData.container
	    ? _c(
	        "div",
	        { class: _vm.getClasses(_vm.uiFieldsData.container.classes) },
	        _vm._l(_vm.uiFieldsData.data, function(fields, i) {
	          return _vm.checkCondition(fields.conditional)
	            ? _c(
	                _vm.uiFieldsData.container.component,
	                {
	                  key: i,
	                  tag: "component",
	                  class: _vm.getClasses(fields.container.classes)
	                },
	                [
	                  _c(
	                    "div",
	                    {
	                      class: _vm.getClasses(
	                        fields.container.classes,
	                        "__container"
	                      )
	                    },
	                    [
	                      _vm._l(fields.data, function(item, index) {
	                        return [
	                          _vm.checkTextField(item.type) &&
	                          _vm.checkCondition(item.conditional)
	                            ? _c(
	                                fields.container.component,
	                                {
	                                  key: index,
	                                  tag: "component",
	                                  class:
	                                    _vm.getClasses(
	                                      fields.container.classes,
	                                      "__fieldset"
	                                    ) +
	                                    " " +
	                                    _vm.getClasses(
	                                      fields.container.classes,
	                                      "__fieldset--text"
	                                    )
	                                },
	                                [
	                                  _c(
	                                    "div",
	                                    {
	                                      class:
	                                        "" +
	                                        _vm.getClasses(
	                                          fields.container.classes,
	                                          "__fieldset-container"
	                                        )
	                                    },
	                                    [
	                                      _c("ui-text", {
	                                        attrs: {
	                                          "field-index": index,
	                                          "field-name": _vm.fieldName,
	                                          depth: fields.key
	                                        }
	                                      })
	                                    ],
	                                    1
	                                  )
	                                ]
	                              )
	                            : item.type === "select" &&
	                              _vm.checkCondition(item.conditional)
	                              ? _c(
	                                  fields.container.component,
	                                  {
	                                    key: index,
	                                    tag: "component",
	                                    class:
	                                      _vm.getClasses(
	                                        fields.container.classes,
	                                        "__fieldset"
	                                      ) +
	                                      " " +
	                                      _vm.getClasses(
	                                        fields.container.classes,
	                                        "__fieldset--select"
	                                      )
	                                  },
	                                  [
	                                    _c(
	                                      "div",
	                                      {
	                                        class:
	                                          "" +
	                                          _vm.getClasses(
	                                            fields.container.classes,
	                                            "__fieldset-container"
	                                          )
	                                      },
	                                      [
	                                        _c("ui-select", {
	                                          attrs: {
	                                            "field-index": index,
	                                            "field-name": _vm.fieldName,
	                                            depth: fields.key,
	                                            "icon-name": "arrow-up"
	                                          }
	                                        })
	                                      ],
	                                      1
	                                    )
	                                  ]
	                                )
	                              : item.type === "radio" &&
	                                _vm.checkCondition(item.conditional)
	                                ? _c(
	                                    fields.container.component,
	                                    {
	                                      key: "index " + item,
	                                      tag: "component",
	                                      class:
	                                        _vm.getClasses(
	                                          fields.container.classes,
	                                          "__fieldset"
	                                        ) +
	                                        " " +
	                                        _vm.getClasses(
	                                          fields.container.classes,
	                                          "__fieldset--radio"
	                                        )
	                                    },
	                                    [
	                                      _c(
	                                        "div",
	                                        {
	                                          class:
	                                            "" +
	                                            _vm.getClasses(
	                                              fields.container.classes,
	                                              "__fieldset-container"
	                                            )
	                                        },
	                                        [
	                                          _c("ui-radio", {
	                                            attrs: {
	                                              "field-index": index,
	                                              "field-name": _vm.fieldName,
	                                              depth: fields.key
	                                            }
	                                          })
	                                        ],
	                                        1
	                                      )
	                                    ]
	                                  )
	                                : item.type === "checkbox" &&
	                                  _vm.checkCondition(item.conditional)
	                                  ? _c(
	                                      fields.container.component,
	                                      {
	                                        key: index,
	                                        tag: "component",
	                                        class:
	                                          _vm.getClasses(
	                                            fields.container.classes,
	                                            "__fieldset"
	                                          ) +
	                                          " " +
	                                          _vm.getClasses(
	                                            fields.container.classes,
	                                            "__fieldset--checkbox"
	                                          )
	                                      },
	                                      [
	                                        _c(
	                                          "div",
	                                          {
	                                            class:
	                                              "" +
	                                              _vm.getClasses(
	                                                fields.container.classes,
	                                                "__fieldset-container"
	                                              )
	                                          },
	                                          [
	                                            _c("ui-checkbox", {
	                                              attrs: {
	                                                "field-index": index,
	                                                "field-name": _vm.fieldName,
	                                                depth: fields.key
	                                              }
	                                            })
	                                          ],
	                                          1
	                                        )
	                                      ]
	                                    )
	                                  : item.type === "component" &&
	                                    _vm.checkCondition(item.conditional)
	                                    ? _c(
	                                        fields.container.component,
	                                        {
	                                          key: index,
	                                          tag: "component",
	                                          class:
	                                            _vm.getClasses(
	                                              fields.container.classes,
	                                              "__fieldset"
	                                            ) +
	                                            " " +
	                                            _vm.getClasses(
	                                              fields.container.classes,
	                                              "__fieldset--component"
	                                            )
	                                        },
	                                        [
	                                          item.component &&
	                                          item.component.content
	                                            ? _c(
	                                                item.component.name,
	                                                _vm._b(
	                                                  {
	                                                    tag: "component",
	                                                    class:
	                                                      item.component.classes,
	                                                    domProps: {
	                                                      innerHTML: _vm._s(
	                                                        item.component.content
	                                                      )
	                                                    }
	                                                  },
	                                                  "component",
	                                                  item.component.props,
	                                                  false
	                                                )
	                                              )
	                                            : item.component
	                                              ? _c(
	                                                  item.component.name,
	                                                  _vm._b(
	                                                    {
	                                                      tag: "component",
	                                                      class:
	                                                        item.component.classes
	                                                    },
	                                                    "component",
	                                                    item.component.props,
	                                                    false
	                                                  )
	                                                )
	                                              : _vm._e()
	                                        ],
	                                        1
	                                      )
	                                    : _vm._e()
	                        ]
	                      })
	                    ],
	                    2
	                  )
	                ]
	              )
	            : _vm._e()
	        }),
	        1
	      )
	    : _vm._e()
	};
	var __vue_staticRenderFns__$1 = [];
	__vue_render__$1._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$1 = undefined;
	  /* scoped */
	  const __vue_scope_id__$1 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$1 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$1 = false;
	  /* component normalizer */
	  function __vue_normalize__$1(
	    template, style, script,
	    scope, functional, moduleIdentifier,
	    createInjector, createInjectorSSR
	  ) {
	    const component = (typeof script === 'function' ? script.options : script) || {};

	    // For security concerns, we use only base name in production mode.
	    component.__file = "/Users/dennisdipsaus/Documents/Projects/vue-uiFields/src/form/ui-fields.vue";

	    if (!component.render) {
	      component.render = template.render;
	      component.staticRenderFns = template.staticRenderFns;
	      component._compiled = true;

	      if (functional) component.functional = true;
	    }

	    component._scopeId = scope;

	    return component
	  }
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var uiFields = __vue_normalize__$1(
	    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
	    __vue_inject_styles__$1,
	    __vue_script__$1,
	    __vue_scope_id__$1,
	    __vue_is_functional_template__$1,
	    __vue_module_identifier__$1,
	    undefined,
	    undefined
	  )

	//
	var script$2 = {
		mixins: [mixin]
	};

	/* script */
	            const __vue_script__$2 = script$2;
	            
	/* template */
	var __vue_render__$2 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    {
	      staticClass: "ui-radio",
	      class: _vm.getClasses(_vm.fieldData.container.classes)
	    },
	    [
	      _vm._l(_vm.fieldData.options, function(option, index) {
	        return _c("label", { key: index, staticClass: "ui-radio__element" }, [
	          _c("input", {
	            directives: [
	              {
	                name: "validate",
	                rawName: "v-validate.continues",
	                value: _vm.getValidationOptions(_vm.fieldData.errors),
	                expression: "getValidationOptions(fieldData.errors)",
	                modifiers: { continues: true }
	              },
	              {
	                name: "model",
	                rawName: "v-model",
	                value: _vm.fieldDataValue,
	                expression: "fieldDataValue"
	              }
	            ],
	            staticClass: "ui-radio__input",
	            attrs: { name: _vm.fieldData.name, type: "radio" },
	            domProps: {
	              value: option.value,
	              checked: _vm._q(_vm.fieldDataValue, option.value)
	            },
	            on: {
	              change: function($event) {
	                _vm.fieldDataValue = option.value;
	              }
	            }
	          }),
	          _vm._v(" "),
	          _c("span", { staticClass: "ui-radio__label" }, [
	            _c("span", { staticClass: "ui-radio__icon" }, [
	              _c(
	                "svg",
	                {
	                  attrs: {
	                    xmlns: "http://www.w3.org/2000/svg",
	                    width: "8",
	                    height: "8",
	                    viewBox: "0 0 13 12"
	                  }
	                },
	                [
	                  _c("path", {
	                    attrs: {
	                      "fill-rule": "evenodd",
	                      d:
	                        "M11.714.363a1.2 1.2 0 0 0-.858.42C8.465 3.42 6.638 5.621 4.419 8.113L2.055 5.916a1.161 1.161 0 0 0-1.231-.243c-.42.167-.727.569-.805 1.053-.078.484.086.977.429 1.292l3.245 3.021a1.167 1.167 0 0 0 1.686-.077c2.689-2.964 4.603-5.332 7.24-8.239.37-.394.483-.999.283-1.521-.2-.523-.672-.856-1.188-.84z"
	                    }
	                  })
	                ]
	              )
	            ]),
	            _vm._v(" "),
	            _c("span", {
	              staticClass: "ui-radio__label-text",
	              domProps: { innerHTML: _vm._s(option.label) }
	            })
	          ])
	        ])
	      }),
	      _vm._v(" "),
	      _vm.fieldData.component
	        ? _c(
	            _vm.fieldData.component.name,
	            _vm._b(
	              {
	                tag: "component",
	                class: _vm.fieldData.component.classes,
	                domProps: { innerHTML: _vm._s(_vm.fieldData.component.content) }
	              },
	              "component",
	              _vm.fieldData.component.props,
	              false
	            )
	          )
	        : _vm._e(),
	      _vm._v(" "),
	      _vm.fieldData.errors && _vm.fieldData.errors.validation
	        ? _c("div", { staticClass: "ui-radio__errors" }, [
	            _vm.errors.collect(_vm.fieldData.name).length
	              ? _c("span", {
	                  staticClass: "ui-radio__error",
	                  domProps: { innerHTML: _vm._s(_vm.fieldData.errors.message) }
	                })
	              : _vm._e()
	          ])
	        : _vm._e()
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__$2 = [];
	__vue_render__$2._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$2 = undefined;
	  /* scoped */
	  const __vue_scope_id__$2 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$2 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$2 = false;
	  /* component normalizer */
	  function __vue_normalize__$2(
	    template, style, script,
	    scope, functional, moduleIdentifier,
	    createInjector, createInjectorSSR
	  ) {
	    const component = (typeof script === 'function' ? script.options : script) || {};

	    // For security concerns, we use only base name in production mode.
	    component.__file = "/Users/dennisdipsaus/Documents/Projects/vue-uiFields/src/form/ui-radio.vue";

	    if (!component.render) {
	      component.render = template.render;
	      component.staticRenderFns = template.staticRenderFns;
	      component._compiled = true;

	      if (functional) component.functional = true;
	    }

	    component._scopeId = scope;

	    return component
	  }
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var uiRadio = __vue_normalize__$2(
	    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
	    __vue_inject_styles__$2,
	    __vue_script__$2,
	    __vue_scope_id__$2,
	    __vue_is_functional_template__$2,
	    __vue_module_identifier__$2,
	    undefined,
	    undefined
	  )

	//
	var script$3 = {
		mixins: [mixin]
	};

	/* script */
	            const __vue_script__$3 = script$3;
	            
	/* template */
	var __vue_render__$3 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    {
	      staticClass: "ui-select",
	      class: _vm.getClasses(_vm.fieldData.container.classes)
	    },
	    [
	      _c("label", { staticClass: "ui-select__element" }, [
	        _c("span", {
	          staticClass: "ui-select__label",
	          domProps: { innerHTML: _vm._s(_vm.createLabel(_vm.fieldData)) }
	        }),
	        _vm._v(" "),
	        _vm.fieldData.required
	          ? _c(
	              "span",
	              { staticClass: "ui-text__label ui-text__label--required" },
	              [_vm._v(_vm._s(_vm.fieldData.requiredText))]
	            )
	          : _vm._e(),
	        _vm._v(" "),
	        _c(
	          "select",
	          {
	            directives: [
	              {
	                name: "validate",
	                rawName: "v-validate.continues",
	                value: _vm.getValidationOptions(_vm.fieldData.errors),
	                expression: "getValidationOptions(fieldData.errors)",
	                modifiers: { continues: true }
	              },
	              {
	                name: "model",
	                rawName: "v-model",
	                value: _vm.fieldDataValue,
	                expression: "fieldDataValue"
	              }
	            ],
	            staticClass: "ui-select__select",
	            attrs: { name: _vm.fieldData.name },
	            on: {
	              change: function($event) {
	                var $$selectedVal = Array.prototype.filter
	                  .call($event.target.options, function(o) {
	                    return o.selected
	                  })
	                  .map(function(o) {
	                    var val = "_value" in o ? o._value : o.value;
	                    return val
	                  });
	                _vm.fieldDataValue = $event.target.multiple
	                  ? $$selectedVal
	                  : $$selectedVal[0];
	              }
	            }
	          },
	          _vm._l(_vm.fieldData.options, function(option, index) {
	            return _c(
	              "option",
	              {
	                key: index,
	                attrs: { disabled: option.disabled },
	                domProps: { value: option.value }
	              },
	              [_vm._v(_vm._s(option.label))]
	            )
	          }),
	          0
	        ),
	        _vm._v(" "),
	        _vm.iconName
	          ? _c("span", { staticClass: "ui-select__icon" }, [
	              _c(
	                "svg",
	                {
	                  attrs: {
	                    id: "Layer_1",
	                    version: "1.1",
	                    xmlns: "http://www.w3.org/2000/svg",
	                    "xmlns:xlink": "http://www.w3.org/1999/xlink",
	                    x: "0px",
	                    y: "0px",
	                    viewBox: "0 0 12 12",
	                    "xml:space": "preserve"
	                  }
	                },
	                [
	                  _c("g", [
	                    _c(
	                      "g",
	                      {
	                        attrs: {
	                          id: "Group",
	                          transform:
	                            "translate(6.000000, 6.000000) rotate(45.000000) translate(-6.000000, -6.000000) translate(2.000000, 2.000000)"
	                        }
	                      },
	                      [
	                        _c("rect", {
	                          staticClass: "st0",
	                          attrs: {
	                            id: "Rectangle",
	                            x: "1.7",
	                            y: "1.7",
	                            transform:
	                              "matrix(2.535182e-06 1 -1 2.535182e-06 8.4142 -3)",
	                            width: "8",
	                            height: "2"
	                          }
	                        }),
	                        _vm._v(" "),
	                        _c("rect", {
	                          staticClass: "st0",
	                          attrs: {
	                            x: "1.7",
	                            y: "1.7",
	                            transform:
	                              "matrix(2.535182e-06 1 -1 2.535182e-06 8.4142 3)",
	                            width: "2",
	                            height: "8"
	                          }
	                        })
	                      ]
	                    )
	                  ])
	                ]
	              )
	            ])
	          : _vm._e()
	      ]),
	      _vm._v(" "),
	      _vm.fieldData.component
	        ? _c(
	            _vm.fieldData.component.name,
	            _vm._b(
	              {
	                tag: "component",
	                class: _vm.fieldData.component.classes,
	                domProps: { innerHTML: _vm._s(_vm.fieldData.component.content) }
	              },
	              "component",
	              _vm.fieldData.component.props,
	              false
	            )
	          )
	        : _vm._e(),
	      _vm._v(" "),
	      _vm.fieldData.errors && _vm.fieldData.errors.validation
	        ? _c("div", { staticClass: "ui-select__errors" }, [
	            _vm.errors.collect(_vm.fieldData.name).length
	              ? _c("span", {
	                  staticClass: "ui-select__error",
	                  domProps: { innerHTML: _vm._s(_vm.fieldData.errors.message) }
	                })
	              : _vm._e()
	          ])
	        : _vm._e()
	    ],
	    1
	  )
	};
	var __vue_staticRenderFns__$3 = [];
	__vue_render__$3._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$3 = undefined;
	  /* scoped */
	  const __vue_scope_id__$3 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$3 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$3 = false;
	  /* component normalizer */
	  function __vue_normalize__$3(
	    template, style, script,
	    scope, functional, moduleIdentifier,
	    createInjector, createInjectorSSR
	  ) {
	    const component = (typeof script === 'function' ? script.options : script) || {};

	    // For security concerns, we use only base name in production mode.
	    component.__file = "/Users/dennisdipsaus/Documents/Projects/vue-uiFields/src/form/ui-select.vue";

	    if (!component.render) {
	      component.render = template.render;
	      component.staticRenderFns = template.staticRenderFns;
	      component._compiled = true;

	      if (functional) component.functional = true;
	    }

	    component._scopeId = scope;

	    return component
	  }
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var uiSelect = __vue_normalize__$3(
	    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
	    __vue_inject_styles__$3,
	    __vue_script__$3,
	    __vue_scope_id__$3,
	    __vue_is_functional_template__$3,
	    __vue_module_identifier__$3,
	    undefined,
	    undefined
	  )

	//
	var script$4 = {
		mixins: [mixin]
	};

	/* script */
	            const __vue_script__$4 = script$4;
	            
	/* template */
	var __vue_render__$4 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _vm.fieldData
	    ? _c(
	        "div",
	        {
	          staticClass: "ui-text",
	          class: _vm.getClasses(_vm.fieldData.container.classes)
	        },
	        [
	          _c("label", { staticClass: "ui-text__element" }, [
	            _c("span", {
	              staticClass: "ui-text__label",
	              domProps: { innerHTML: _vm._s(_vm.fieldData.label) }
	            }),
	            _vm._v(" "),
	            _vm.fieldData.required
	              ? _c(
	                  "span",
	                  { staticClass: "ui-text__label ui-text__label--required" },
	                  [_vm._v(_vm._s(_vm.fieldData.requiredText))]
	                )
	              : _vm._e(),
	            _vm._v(" "),
	            _vm.fieldData.type === "checkbox"
	              ? _c("input", {
	                  directives: [
	                    {
	                      name: "validate",
	                      rawName: "v-validate.continues",
	                      value: _vm.getValidationOptions(_vm.fieldData.errors),
	                      expression: "getValidationOptions(fieldData.errors)",
	                      modifiers: { continues: true }
	                    },
	                    {
	                      name: "model",
	                      rawName: "v-model",
	                      value: _vm.fieldDataValue,
	                      expression: "fieldDataValue"
	                    }
	                  ],
	                  ref: "input",
	                  staticClass: "ui-text__input",
	                  attrs: {
	                    name: _vm.fieldData.name,
	                    placeholder: _vm.fieldData.placeholder,
	                    maxlength: _vm.fieldData.maxLength,
	                    minlength: _vm.fieldData.minLength,
	                    required: _vm.fieldData.required,
	                    type: "checkbox"
	                  },
	                  domProps: {
	                    checked: Array.isArray(_vm.fieldDataValue)
	                      ? _vm._i(_vm.fieldDataValue, null) > -1
	                      : _vm.fieldDataValue
	                  },
	                  on: {
	                    change: function($event) {
	                      var $$a = _vm.fieldDataValue,
	                        $$el = $event.target,
	                        $$c = $$el.checked ? true : false;
	                      if (Array.isArray($$a)) {
	                        var $$v = null,
	                          $$i = _vm._i($$a, $$v);
	                        if ($$el.checked) {
	                          $$i < 0 && (_vm.fieldDataValue = $$a.concat([$$v]));
	                        } else {
	                          $$i > -1 &&
	                            (_vm.fieldDataValue = $$a
	                              .slice(0, $$i)
	                              .concat($$a.slice($$i + 1)));
	                        }
	                      } else {
	                        _vm.fieldDataValue = $$c;
	                      }
	                    }
	                  }
	                })
	              : _vm.fieldData.type === "radio"
	                ? _c("input", {
	                    directives: [
	                      {
	                        name: "validate",
	                        rawName: "v-validate.continues",
	                        value: _vm.getValidationOptions(_vm.fieldData.errors),
	                        expression: "getValidationOptions(fieldData.errors)",
	                        modifiers: { continues: true }
	                      },
	                      {
	                        name: "model",
	                        rawName: "v-model",
	                        value: _vm.fieldDataValue,
	                        expression: "fieldDataValue"
	                      }
	                    ],
	                    ref: "input",
	                    staticClass: "ui-text__input",
	                    attrs: {
	                      name: _vm.fieldData.name,
	                      placeholder: _vm.fieldData.placeholder,
	                      maxlength: _vm.fieldData.maxLength,
	                      minlength: _vm.fieldData.minLength,
	                      required: _vm.fieldData.required,
	                      type: "radio"
	                    },
	                    domProps: { checked: _vm._q(_vm.fieldDataValue, null) },
	                    on: {
	                      change: function($event) {
	                        _vm.fieldDataValue = null;
	                      }
	                    }
	                  })
	                : _c("input", {
	                    directives: [
	                      {
	                        name: "validate",
	                        rawName: "v-validate.continues",
	                        value: _vm.getValidationOptions(_vm.fieldData.errors),
	                        expression: "getValidationOptions(fieldData.errors)",
	                        modifiers: { continues: true }
	                      },
	                      {
	                        name: "model",
	                        rawName: "v-model",
	                        value: _vm.fieldDataValue,
	                        expression: "fieldDataValue"
	                      }
	                    ],
	                    ref: "input",
	                    staticClass: "ui-text__input",
	                    attrs: {
	                      name: _vm.fieldData.name,
	                      placeholder: _vm.fieldData.placeholder,
	                      maxlength: _vm.fieldData.maxLength,
	                      minlength: _vm.fieldData.minLength,
	                      required: _vm.fieldData.required,
	                      type: _vm.fieldData.type
	                    },
	                    domProps: { value: _vm.fieldDataValue },
	                    on: {
	                      input: function($event) {
	                        if ($event.target.composing) {
	                          return
	                        }
	                        _vm.fieldDataValue = $event.target.value;
	                      }
	                    }
	                  })
	          ]),
	          _vm._v(" "),
	          _vm.fieldData.component
	            ? _c(
	                _vm.fieldData.component.name,
	                _vm._b(
	                  {
	                    tag: "component",
	                    class: _vm.fieldData.component.classes,
	                    domProps: {
	                      innerHTML: _vm._s(_vm.fieldData.component.content)
	                    }
	                  },
	                  "component",
	                  _vm.fieldData.component.props,
	                  false
	                )
	              )
	            : _vm._e(),
	          _vm._v(" "),
	          _vm.fieldData.errors && _vm.fieldData.errors.validation
	            ? _c("div", { staticClass: "ui-text__errors" }, [
	                _vm.errors.collect(_vm.fieldData.name).length
	                  ? _c("span", {
	                      staticClass: "ui-text__error",
	                      domProps: {
	                        innerHTML: _vm._s(_vm.fieldData.errors.message)
	                      }
	                    })
	                  : _vm._e()
	              ])
	            : _vm._e()
	        ],
	        1
	      )
	    : _vm._e()
	};
	var __vue_staticRenderFns__$4 = [];
	__vue_render__$4._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$4 = undefined;
	  /* scoped */
	  const __vue_scope_id__$4 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$4 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$4 = false;
	  /* component normalizer */
	  function __vue_normalize__$4(
	    template, style, script,
	    scope, functional, moduleIdentifier,
	    createInjector, createInjectorSSR
	  ) {
	    const component = (typeof script === 'function' ? script.options : script) || {};

	    // For security concerns, we use only base name in production mode.
	    component.__file = "/Users/dennisdipsaus/Documents/Projects/vue-uiFields/src/form/ui-text.vue";

	    if (!component.render) {
	      component.render = template.render;
	      component.staticRenderFns = template.staticRenderFns;
	      component._compiled = true;

	      if (functional) component.functional = true;
	    }

	    component._scopeId = scope;

	    return component
	  }
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var uiText = __vue_normalize__$4(
	    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
	    __vue_inject_styles__$4,
	    __vue_script__$4,
	    __vue_scope_id__$4,
	    __vue_is_functional_template__$4,
	    __vue_module_identifier__$4,
	    undefined,
	    undefined
	  )

	class uiFieldsInstance {
		constructor(options) {
			this.formFields = this.init(options);
		}
		init(options) {
			return this.checkParams(options);
		}
		getFieldSettings() {
			return this.formFields;
		}
		getFieldSets() {
			return this.formFields.data;
		}
		getFieldSetByName(name) {
			return this.formFields.data.find((field) => field.key === name);
		}
		setNewCondition(options) {
			if (options) {
				if (Array.isArray(options)) {
					options.forEach((option) => this.createCondtion(option));
				} else {
					this.createCondtion(options);
				}
			}
		}
		setFieldSet(fieldSet) {
			if (Array.isArray(fieldSet)) {
				//we need a for each with an helper function
				fieldSet.forEach((field) => {
					const val = this.checkParams(field, 1);
					if (val) this.formFields.data.push(val);
				});
			} else if (typeof fieldSet === 'object' && fieldSet !== null) {
				const val = this.checkParams(fieldSet, 1);
				if (val) this.formFields.data.push(val);
			}
		}
		setField(options) {
			if (options) {
				if (Array.isArray(options)) {
					options.forEach((option) => {
						if (option.depth) {
							const data = this.getFieldSetByName(option.depth);
							if (data) {
								if (!data.data) data.data = [];
								data.data.push(this.checkParams(option, 2));
							} else {
								//if fieldset does not exist and we want to create a new fieldset
								if (option.createNewFieldset) {
									this.setFieldSet({
										key: option.depth,
										container: option.container
									});
									this.setField(option);
								} else {
									this.createWarning('Depth does not exists');
								}
							}
						}
					});
				} else {
					if (options.depth) {
						const data = this.getFieldSetByName(options.depth);
						if (data) {
							if (!data.data) data.data = [];
							data.data.push(this.checkParams(options, 2));
						} else {
							//if fieldset does not exist and we want to create a new fieldset
							if (options.createNewFieldset) {
								this.setFieldSet({
									key: options.depth,
									container: options.container
								});
								this.setField(options);
							} else {
								this.createWarning('Depth does not exists');
							}
						}
					}
				}
			}
		}
		setClass(options) {
			if (options) {
				let values = Array.isArray(options.value) ? options.value : [options.value];

				if (options.depth) {
					//on field
					const fieldSet = this.getFieldSetByName(options.depth);
					if (Array.isArray(options.key)) {
						//multiple keys / fields
						options.key.forEach((key) => {
							const field = fieldSet.data.find((field) => key === field.name);
							if (field) {
								field.container.classes = [...field.container.classes, ...values];
							}
						});
					} else {
						//single field
						const field = fieldSet.data.find((field) => options.key === field.name);
						if (field) {
							field.container.classes = [...field.container.classes, ...values];
						}
					}
				} else {
					//on fieldset
					if (Array.isArray(options.key)) {
						//multiple keys / fieldSets
						options.key.forEach((key) => {
							const field = this.getFieldSetByName(key);
							if (field) {
								field.container.classes = [...field.container.classes, ...values];
							}
						});
					} else {
						//single fieldSet
						const field = this.getFieldSetByName(options.key);
						if (field) {
							field.container.classes = [...field.container.classes, ...values];
						}
					}
				}
			}
		}
		checkParams(options, depth = 0) {
			let newData = {};
			//depth, 0 is form, 1 is fieldset, 2 is field
			if (typeof options !== 'object') options = {};
			//make dubplicate of options
			const optionsDup = { ...options };
			//create variable defaultOptions
			let defaultOptions = [];
			if (depth < 2) {
				//defaultOptions of form and fieldset
				defaultOptions = [
					{
						key: 'key',
						value: 'form'
					},
					{
						key: 'data',
						value: []
					},
					{
						key: 'container',
						value: {}
					}
				];
			} else {
				//field has different settings
				defaultOptions = [
					{
						key: 'name',
						value: ''
					},
					{
						key: 'value',
						value: ''
					},
					{
						key: 'label',
						value: ''
					},
					{
						key: 'type',
						value: 'text'
					},
					{
						key: 'required',
						value: false
					},
					{
						key: 'requiredText',
						value: '*'
					},
					{
						key: 'options',
						value: []
					},
					{
						key: 'maxLength',
						value: null
					},
					{
						key: 'minLength',
						value: null
					},
					{
						key: 'placeholder',
						value: ''
					},
					{
						key: 'container',
						value: {}
					},
					{
						key: 'component',
						value: {}
					},
					{
						key: 'errors',
						value: {}
					}
				];
			}
			depth++;

			//fill defaultOptions in newData and delete prop of dubplicate
			defaultOptions.forEach((option) => {
				newData[option.key] = optionsDup[option.key] || option.value;
				if (typeof optionsDup[option.key] !== 'undefined') {
					delete optionsDup[option.key];
				}
			});
			//add extra data if there is any
			if (Object.keys(optionsDup).length) {
				const { customData } = optionsDup;
				if (customData) {
					newData.customData = { ...optionsDup, ...customData };
				} else {
					newData.customData = optionsDup;
				}
			}

			//if object has data check the data aswell
			if (newData.data && Array.isArray(newData.data)) {
				newData.data = newData.data.map((data) => this.checkParams(data, depth)).filter((data) => data);
			}
			//create component name based on depth, options: div, fieldset, undefined
			if (!newData.container.component) newData.container.component = depth === 1 ? 'fieldset' : 'div';
			//if no classes add those
			if (!newData.container.classes) newData.container.classes = [];
			//if classes is string and not array make array
			if (!Array.isArray(newData.container.classes)) {
				newData.container.classes = [newData.container.classes];
			}

			//if type of field is select make middle standard selected
			if (newData.type === 'select' || newData.type === 'radio') {
				if (!newData.options.find((input) => input.selected)) {
					newData.value = newData.options[Math.floor((newData.options.length - 1) / 2)].value;
					newData.options[Math.floor((newData.options.length - 1) / 2)].selected = true;
				} else {
					const value = newData.options.find((input) => input.selected).value;
					newData.value = value;
				}
			}
			return newData;
		}
		createCondtion(options) {
			//check if object
			let fieldSet;
			if (typeof options === 'object') {
				//place keys in array
				if (!Array.isArray(options.key)) options.key = [options.key];
				//data we are working with
				const data = this.getFieldSets();
				//if options depth that means we have fields inside a fieldset
				if (options.depth) {
					//if depth we define condition on field
					fieldSet = data.find((field) => field.key === options.depth);
				} else {
					//there is no depth and we filter a whole fieldset?
					fieldSet = data.find((field) => field.key === options.condition.depth);
				}
				//fieldSet is the depth we want to define condition
				if (fieldSet) {
					//elExists is the field we want where we get the value of the condition
					const elExists = fieldSet.data.find((field) => field.name === options.condition.key);
					if (elExists) {
						//forEach field we want to create the logic
						options.key.forEach((name) => {
							//get the fields that match the element name, returns field
							let newField;
							if (options.depth) {
								newField = fieldSet.data.filter((field) => field.name === name);
							} else {
								newField = data.filter((field) => field.key === name);
							}

							//for each cause input fields can have same name, now its more forgiving
							newField.forEach((allFields) => {
								let val;
								if (typeof options.condition.value === 'function') {
									val = options.condition.value(elExists.value);
								} else {
									val = elExists.value === options.condition.value;
								}
								if (allFields) {
									allFields.conditional = {
										depth: options.depth || options.condition.depth,
										key: options.condition.key,
										value: options.condition.value,
										show: val
									};
								}
							});
						});
					} else {
						this.createWarning('The field you entered does not exists, this condition will be ignored');
					}
				} else {
					//fieldset does not exists
					if (options.accros) {
						options.key.forEach((name) => {
							const newField = data.filter((field) => field.key === name);
							newField.forEach((allFields) => {
								if (allFields) {
									allFields.conditional = {
										depth: options.condition.depth,
										key: options.condition.key,
										value: options.condition.value,
										show: options.accrosValue
									};
								}
								this.formFields.accros = true;
							});
						});
					} else {
						this.createWarning('The fieldset you entered does not exists, this condition will be ignored');
					}
				}
			}
		}
		//disabled eslint for the next line cause I need to create a warning for the developers
		/* eslint-disable */
		createWarning(message) {
			console.warn(message);
		}
		/* eslint-enable */
	}

	Array.prototype.getSingleUiField = function(name) {
		if (name) {
			if (this.length) {
				return this.find((field) => field.name === name);
			}
		}
		return null;
	};

	Vue.mixin({
		methods: {
			createNewUiFieldsInstance(options) {
				return new uiFieldsInstance(options);
			},
			getClasses(classes, name = '') {
				if (classes.length) {
					const newClass = classes.map((clas) => `${clas}${name}`);
					classes = [];
					return `${newClass.join(' ')}`;
				} else {
					return '';
				}
			},
			getCorrectFieldSet(options) {
				if (options) {
					const uiField = this.$store.state.uiFields.fields;

					if (options.formName) {
						const form = uiField.find((form) => form.key === options.formName);
						if (form && form.data) {
							if (options.fieldsetName) {
								const fieldSet = form.data.find((fieldset) => fieldset.key === options.fieldsetName);
								if (fieldSet && fieldSet.data) {
									return fieldSet.data;
								}
							}
						}
					}
				}
				return 'something went wrong';
			},
			getCorrectField(options) {
				const fieldSet = this.getCorrectFieldSet(options);
				if (typeof fieldSet === 'object') {
					if (fieldSet.length) {
						return fieldSet.find((field) => field.name === options.fieldName);
					}
				}
				return 'something went wrong';
			}
		}
	});

	const Components = {
		UiButton,
		UiCheckbox,
		UiSelect,
		UiText,
		UiFields,
		UiRadio
	};

	Object.keys(Components).forEach((key) => {
		Vue.component(key, Components[key]);
	});

	const state = () => ({
		fields: []
	});

	const mutations = {
		setSingleField(state, singleField) {
			if (!state.fields.map((field) => field.key).includes(singleField.key)) {
				state.fields.push(singleField);
			}
		},
		updateFieldValue(state, options) {
			if (options.fieldSet) {
				const fieldWeNeed = options.fieldSet.data[options.fieldOptions.index];
				//field we need is the field we want to update
				fieldWeNeed.value = options.fieldOptions.value;
				//in this fieldset we want to check condition logic
			}
		},
		updateCondtionLogicField(state, options) {
			//check if field exists with same key
			if (options.fieldSet) {
				//check each field in fieldset
				options.fieldSet.data.forEach((field) => {
					//if conditional logic
					if (field.conditional) {
						//isValue is the field we need for conditional logic
						const isValue = options.fieldSet.data.find((newField) => newField.name === field.conditional.key);
						//check if condition is function or value
						if (isValue) {
							if (typeof field.conditional.value === 'function') {
								//if function then execute function, parms is the value of the
								field.conditional.show = field.conditional.value(isValue.value);
							} else {
								field.conditional.show = isValue.value === field.conditional.value;
							}
						}
					}
				});
			}
		},
		updateCondtionLogicFieldset(state, options) {
			if (options.form && options.form.data) {
				options.form.data.forEach((fieldSet) => {
					//chechk if fieldset has conditional logic
					if (fieldSet.conditional) {
						//find field of conditional logic
						const isValueFieldset = options.form.data.find((isValueField) => isValueField.key === fieldSet.conditional.depth);
						const isValue = isValueFieldset.data.find((isValueField) => isValueField.name === fieldSet.conditional.key);
						//check if condition is function or value
						if (isValue) {
							if (typeof fieldSet.conditional.value === 'function') {
								//if function then execute function, parms is the value of the
								fieldSet.conditional.show = fieldSet.conditional.value(isValue.value);
							} else {
								fieldSet.conditional.show = isValue.value === fieldSet.conditional.value;
							}
						}
					}
				});
			}
		}
	};

	const actions = {
		setNewForm({ commit }, field) {
			commit('setSingleField', field);
		},
		async updateFieldValue({ commit, state }, fieldOptions) {
			if (fieldOptions) {
				//find correct form
				const form = state.fields.find((field) => field.key === fieldOptions.name);
				if (form) {
					//check if depth is valid
					const fieldSet = form.data.find((field) => field.key === fieldOptions.depth);
					if (fieldSet) {
						commit('updateFieldValue', { fieldOptions, fieldSet });
						commit('updateCondtionLogicField', { fieldOptions, fieldSet });
						commit('updateCondtionLogicFieldset', { fieldOptions, form });
					}
				}
			}
		}
	};

	var uiFieldsStore = { state, mutations, actions };

	// Import vue component

	// install function executed by Vue.use()
	function install(Vue$$1) {
		if (install.installed) return;
		install.installed = true;
		Vue$$1.component('uiCheckbox', uiCheckbox);
		Vue$$1.component('uiFields', uiFields);
		// Vue.component('uiNumber',uiNumber);
		Vue$$1.component('uiRadio ', uiRadio);
		Vue$$1.component('uiSelect', uiSelect);
		Vue$$1.component('uiText', uiText);
		Vue$$1.component('uiText', uiText);
	}

	// Create module definition for Vue.use()
	const plugin = {
		install
	};

	// To auto-install when vue is found
	let GlobalVue = null;
	if (typeof window !== 'undefined') {
		GlobalVue = window.Vue;
	} else if (typeof global !== 'undefined') {
		GlobalVue = global.Vue;
	}
	if (GlobalVue) {
		GlobalVue.use(plugin);
	}

	// To allow use as module (npm/webpack/etc.) export component
	var index = { uiCheckbox, uiFields, uiRadio, uiSelect, uiText, uiFieldsMixin: uiFieldsInstance, uiFieldsStore };

	// It's possible to expose named exports when writing components that can
	// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
	// export const RollupDemoDirective = component;

	exports.install = install;
	exports.default = index;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
