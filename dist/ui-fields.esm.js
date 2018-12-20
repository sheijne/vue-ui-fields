(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();















var uiButton = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.to)?_c('nuxt-link',{class:_vm.buttonClasses,attrs:{"to":_vm.to}},[(!_vm.emptySlot)?_c('span',{staticClass:"button__text"},[_vm._t("default")],2):_vm._e(),_vm._v(" "),_c('span',{staticClass:"button__icon"})]):(_vm.href)?_c('a',{class:_vm.buttonClasses,attrs:{"href":_vm.href}},[(!_vm.emptySlot)?_c('span',{staticClass:"button__text"},[_vm._t("default")],2):_vm._e(),_vm._v(" "),_c('span',{staticClass:"button__icon"})]):(_vm.disabled)?_c('button',{class:_vm.buttonClasses,attrs:{"disabled":"disabled"}},[(!_vm.emptySlot)?_c('span',{staticClass:"button__text"},[_vm._t("default")],2):_vm._e(),_vm._v(" "),_c('span',{staticClass:"button__icon"})]):(!_vm.disabled)?_c('button',{class:_vm.buttonClasses},[(!_vm.emptySlot)?_c('span',{staticClass:"button__text"},[_vm._t("default")],2):_vm._e(),_vm._v(" "),_c('span',{staticClass:"button__icon"})]):_vm._e()},staticRenderFns: [],
	props: {
		iconName: {
			type: String,
			default: ''
		},
		height: {
			type: [String, Number],
			default: '12'
		},
		width: {
			type: [String, Number],
			default: '12'
		},
		to: {
			type: String,
			default: null
		},
		href: {
			type: String,
			default: null
		},
		disabled: {
			type: Boolean,
			default: false
		},
		greyIcon: {
			type: Boolean,
			default: false
		},
		buttonAfter: {
			type: Boolean,
			default: false
		},
		bgColor: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			buttonClasses: ['button'],
			emptySlot: true
		};
	},
	created() {
		if (this.$slots.default) {
			this.emptySlot = false;
		}

		if (this.$props.iconName === '') {
			this.buttonClasses.push('button__text-only');
			if (this.$props.bgColor === 'white') {
				this.buttonClasses.push('button__text-only--white');
			}
		} else {
			if (this.$props.buttonAfter) {
				this.buttonClasses.push('button__text-only--after');
				if (this.$props.bgColor === 'inverted') {
					this.buttonClasses.push('button__text-only--after-inverted');
				}
			} else {
				this.buttonClasses.push('button__icon-only');
			}
		}
		if (this.$props.greyIcon && this.$props.iconName !== '') {
			this.buttonClasses.push('button__icon-only--inverted');
		}
	}
};

var mixin = {
	props: {
		fieldIndex: {
			type: Number,
			default: 0
		},
		fieldName: {
			type: String,
			default: null
		},
		depth: {
			type: String,
			default: null
		},
		iconName: {
			type: String,
			default: null
		}
	},
	computed: {
		fieldData: {
			get: function() {
				return this.findCorrectFields(this.$store.state.uiFields.fields);
			}
		},
		fieldDataValue: {
			get: function() {
				return this.findCorrectFields(this.$store.state.uiFields.fields).value;
			},
			set: function(newValue) {
				this.$store.dispatch('uiFields/updateFieldValue', {
					name: this.$props.fieldName,
					depth: this.$props.depth,
					index: this.$props.fieldIndex,
					value: newValue
				});
			}
		}
	},
	mounted() {
		if (this.$refs.input) {
			this.$refs.input.setAttribute('attr-henkie', 'hoi');
		}
	},
	methods: {
		findCorrectFields(fields) {
			const newField = fields.find((field) => field.key === this.$props.fieldName) || [];
			if (newField) {
				const selectedField = newField.data.find((field) => field.key === this.$props.depth);
				if (selectedField) {
					return selectedField.data[this.$props.fieldIndex];
				}
			}
			return [];
		},
		createLabel(text) {
			if (text) {
				if (text.indexOf('attribute_') !== -1) {
					//name starts with attribute and we need the last name then we format it
					let newText = text.split('_');
					newText = newText[newText.length - 1];
					return newText.charAt(0).toUpperCase() + newText.slice(1);
				} else {
					return text;
				}
			}
		}
	}
};

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
var uiCheckbox = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"ui-checkbox",class:_vm.getClasses(_vm.fieldData.container.classes)},[_c('label',{staticClass:"ui-checkbox__element"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.fieldDataValue),expression:"fieldDataValue"}],staticClass:"ui-checkbox__input",attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.fieldDataValue)?_vm._i(_vm.fieldDataValue,null)>-1:(_vm.fieldDataValue)},on:{"change":function($event){var $$a=_vm.fieldDataValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.fieldDataValue=$$a.concat([$$v]));}else{$$i>-1&&(_vm.fieldDataValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.fieldDataValue=$$c;}}}}),_vm._v(" "),_c('span',{staticClass:"ui-checkbox__label"},[_c('span',{staticClass:"ui-checkbox__icon"}),_vm._v(" "),_c('span',{staticClass:"ui-checkbox__label-text",domProps:{"innerHTML":_vm._s(_vm.fieldData.label)}})])]),_vm._v(" "),_vm._t("default")],2)},staticRenderFns: [],
	mixins: [mixin]
};

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();












































































var uiFields = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.uiFieldsData && _vm.uiFieldsData.container)?_c('div',{class:_vm.getClasses(_vm.uiFieldsData.container.classes)},_vm._l((_vm.uiFieldsData.data),function(fields,i){return (_vm.checkCondition(fields.conditional))?_c(_vm.uiFieldsData.container.component,{key:i,tag:"component",class:_vm.getClasses(fields.container.classes)},[_vm._t("default"),_vm._v(" "),_vm._l((fields.data),function(item,index){return [(_vm.checkTextField(item.type) && _vm.checkCondition(item.conditional))?_c(fields.container.component,{key:index,tag:"component",class:`${_vm.getClasses(fields.container.classes, '__fieldset')} ${_vm.getClasses(fields.container.classes, '__fieldset--text')}`},[_c('div',{class:`${_vm.getClasses(fields.container.classes, '__fieldset-container')}`},[_c('ui-text',{attrs:{"field-index":index,"field-name":_vm.fieldName,"depth":fields.key}})],1)]):(item.type === 'select' && _vm.checkCondition(item.conditional))?_c(fields.container.component,{key:index,tag:"component",class:`${_vm.getClasses(fields.container.classes, '__fieldset')} ${_vm.getClasses(fields.container.classes, '__fieldset--select')}`},[_c('div',{class:`${_vm.getClasses(fields.container.classes, '__fieldset-container')}`},[_c('ui-select',{attrs:{"field-index":index,"field-name":_vm.fieldName,"depth":fields.key,"icon-name":"arrow-up"}})],1)]):(item.type === 'radio' && _vm.checkCondition(item.conditional))?_c(fields.container.component,{key:index,tag:"component",class:`${_vm.getClasses(fields.container.classes, '__fieldset')} ${_vm.getClasses(fields.container.classes, '__fieldset--radio')}`},[_c('div',{class:`${_vm.getClasses(fields.container.classes, '__fieldset-container')}`},[_c('ui-radio',{attrs:{"field-index":index,"field-name":_vm.fieldName,"depth":fields.key}})],1)]):(item.type === 'checkbox' && _vm.checkCondition(item.conditional))?_c(fields.container.component,{key:index,tag:"component",class:`${_vm.getClasses(fields.container.classes, '__fieldset')} ${_vm.getClasses(fields.container.classes, '__fieldset--checkbox')}`},[_c('div',{class:`${_vm.getClasses(fields.container.classes, '__fieldset-container')}`},[_c('ui-checkbox',{attrs:{"field-index":index,"field-name":_vm.fieldName,"depth":fields.key}},[(item.description)?_c('modal-trigger',{attrs:{"content":item.description,"title":"Would you like logo embroidery? ","size":"two-third"}},[_vm._v("Would you like logo embroidery?")]):_vm._e()],1)],1)]):_vm._e()]})],2):_vm._e()}),1):_vm._e()},staticRenderFns: [],
	props: {
		fieldName: {
			type: String,
			default: 'form'
		}
	},
	computed: {
		uiFieldsData: {
			get: function() {
				return this.findCorrectFields(this.$store.state.uiFields.fields);
			}
		}
	},
	methods: {
		findCorrectFields(fields) {
			return fields.find((field) => field.key === this.$props.fieldName) || [];
		},
		checkCondition(input) {
			if (input) {
				return input.show;
			} else {
				return true;
			}
		},
		checkTextField(type) {
			if (type === 'text' || type === 'number' || type === 'email' || type === 'tel') return true;
		}
	}
};

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
var uiRadio = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"ui-radio",class:_vm.getClasses(_vm.fieldData.container.classes)},[_vm._l((_vm.fieldData.options),function(option,index){return _c('label',{key:index,staticClass:"ui-radio__element"},[_c('span',{staticClass:"ui-radio__label",domProps:{"innerHTML":_vm._s(option.label)}}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.fieldDataValue),expression:"fieldDataValue"}],attrs:{"type":"radio"},domProps:{"value":option.value,"checked":_vm._q(_vm.fieldDataValue,option.value)},on:{"change":function($event){_vm.fieldDataValue=option.value;}}})])}),_vm._v(" "),_c('span',{staticClass:"ui-radio__slot"},[_vm._t("default")],2)],2)},staticRenderFns: [],
	mixins: [mixin]
};

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
var uiSelect = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"ui-select",class:_vm.getClasses(_vm.fieldData.container.classes)},[_c('label',{staticClass:"ui-select__element"},[_c('span',{staticClass:"ui-select__label",domProps:{"innerHTML":_vm._s(_vm.createLabel(_vm.fieldData.name))}}),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.fieldDataValue),expression:"fieldDataValue"}],staticClass:"ui-select__select",attrs:{"name":_vm.fieldData.name},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.fieldDataValue=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},_vm._l((_vm.fieldData.options),function(option,index){return _c('option',{key:index,domProps:{"value":option.value}},[_vm._v(_vm._s(option.label))])}),0),_vm._v(" "),(_vm.iconName)?_c('span',{staticClass:"ui-select__icon"}):_vm._e()]),_vm._v(" "),_c('span',{staticClass:"ui-select__slot"},[(_vm.fieldData.description)?_c('button',{staticClass:"button--moreinfo",on:{"click":function($event){$event.preventDefault();_vm.shownInfo = _vm.select;
				_vm.shownInfoVisible = true;}}},[_vm._v(" ? ")]):_vm._e()])])},staticRenderFns: [],
	mixins: [mixin]
};

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
var uiText = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.fieldData)?_c('span',{staticClass:"ui-text",class:_vm.getClasses(_vm.fieldData.container.classes)},[_c('label',{staticClass:"ui-text__element"},[(_vm.fieldData.required)?_c('span',{staticClass:"ui-text__required"}):_vm._e(),_vm._v(" "),_c('span',{staticClass:"ui-text__label",domProps:{"innerHTML":_vm._s(_vm.fieldData.label)}}),_vm._v(" "),((_vm.fieldData.type)==='checkbox')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.fieldDataValue),expression:"fieldDataValue"}],ref:"input",staticClass:"ui-text__input",attrs:{"placeholder":_vm.fieldData.placeholder,"maxlength":_vm.fieldData.maxLength,"required":"required","type":"checkbox"},domProps:{"checked":Array.isArray(_vm.fieldDataValue)?_vm._i(_vm.fieldDataValue,null)>-1:(_vm.fieldDataValue)},on:{"change":function($event){var $$a=_vm.fieldDataValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.fieldDataValue=$$a.concat([$$v]));}else{$$i>-1&&(_vm.fieldDataValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.fieldDataValue=$$c;}}}}):((_vm.fieldData.type)==='radio')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.fieldDataValue),expression:"fieldDataValue"}],ref:"input",staticClass:"ui-text__input",attrs:{"placeholder":_vm.fieldData.placeholder,"maxlength":_vm.fieldData.maxLength,"required":"required","type":"radio"},domProps:{"checked":_vm._q(_vm.fieldDataValue,null)},on:{"change":function($event){_vm.fieldDataValue=null;}}}):_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.fieldDataValue),expression:"fieldDataValue"}],ref:"input",staticClass:"ui-text__input",attrs:{"placeholder":_vm.fieldData.placeholder,"maxlength":_vm.fieldData.maxLength,"required":"required","type":_vm.fieldData.type},domProps:{"value":(_vm.fieldDataValue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.fieldDataValue=$event.target.value;}}})])]):_vm._e()},staticRenderFns: [],
	mixins: [mixin]
};

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
					key: 'options',
					value: []
				},
				{
					key: 'maxLength',
					value: null
				},
				{
					key: 'placeholder',
					value: ''
				},
				{
					key: 'container',
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
		if (typeof options === 'object') {
			//place keys in array
			if (!Array.isArray(options.key)) options.key = [options.key];
			//data we are working with
			const data = this.getFieldSets();
			if (options.depth) {
				//if depth we define condition on field
				const fieldSet = data.find((field) => field.key === options.depth);
				//fieldSet is the depth we want to define condition
				if (fieldSet) {
					//elExists is the field we want where we get the value of the condition
					const elExists = fieldSet.data.find((field) => field.name === options.condition.key);
					if (elExists) {
						//forEach field we want to create the logic
						options.key.forEach((name) => {
							//get the fields that match the element name, returns field
							const newField = fieldSet.data.filter((field) => field.name === name);

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
										depth: options.depth,
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
					this.createWarning('The fieldset you entered does not exists, this condition will be ignored');
				}
			} else {
				if (options.condition.depth) {
					const fieldSet = data.find((field) => field.key === options.condition.depth);
					if (fieldSet) {
						const elExists = fieldSet.data.find((field) => field.name === options.condition.key);
						if (elExists) {
							options.key.forEach((element) => {
								const newField = data.filter((field) => field.key === element);
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
											depth: options.condition.depth,
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
						this.createWarning('The fieldset you entered does not exists, this condition will be ignored');
					}
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

// import Vue from 'vue';

// Vue.mixin({
// 	methods: {
// 		createNewUiFieldsInstance(options) {
// 			return new uiFieldsInstance(options);
// 		},
// 		getClasses(classes, name = '') {
// 			if (classes.length) {
// 				const newClass = classes.map((clas) => `${clas}${name}`);
// 				classes = [];
// 				return `${newClass.join(' ')}`;
// 			} else {
// 				return '';
// 			}
// 		}
// 	}
// });

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
function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.component('uiButton', uiButton);
	Vue.component('uiCheckbox',uiCheckbox);
	Vue.component('uiFields',uiFields);
	// Vue.component('uiNumber',uiNumber);
	Vue.component('uiRadio ',uiRadio);
	Vue.component('uiSelect',uiSelect);
	Vue.component('uiText',uiText);
	Vue.component('uiText',uiText);
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
var index = { uiButton, uiCheckbox, uiFields, uiRadio, uiSelect, uiText, uiFieldsMixin: uiFieldsInstance, uiFieldsStore };

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default index;
export { install };
