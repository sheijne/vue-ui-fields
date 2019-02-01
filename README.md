### Setup formInstance
uiFields is created to create forms faster and more consistency in the data. uiFields will container multiple options to create a form according to your own style. It uses getters and setters of the Vuex to control all data from one single point in a two way binding.

The idea of formating fields with this plugin is to create a three layer data model. You can find the data on a key or a name (depending on what layer you are).

```bash
uiFields
--| form - key
-----| fieldset - key
-------| singleField - name
-------| singleField - name
-----| fieldset - key
-------| singleField - name
```

Each form has to be unique with an unique key. If you have a duplicate of an key the form will be overwritten. To create a new form you can use the function included in the plugin. You can create multiple forms.

```js
const YOUR_VARIABLE_NAME = this.createNewUiFieldsInstance();
```

I recommend saving the variable into your dataset so you can control it in your methods.

**Note!**

This will only create a form data. To save your dataset in the Vuex you have to set it using the dispatch function. This function has to be in the mounted function of Vue, all prepartion functions can be async or added in the created function.

```js
this.$store.dispatch('uiFields/setNewForm', YOUR_VARIABLE_NAME.getFieldSettings());
```


## Create your form
To create a new uiFields instance and the first layer you can add multiple options. If you don't add these options the form will use its fallback values.
Example:
```js
const YOUR_VARIABLE_NAME = this.createNewUiFieldsInstance(
	{
		OPTION: VALUE
	}
);
```

All the options:
#### key
The name of your form.
```js
const YOUR_VARIABLE_NAME = this.createNewUiFieldsInstance(
	{
		key: NAME_OF_YOUR_FORM //optional, default: 'form'
	}
);
```

#### container
The options of your form.
```js
const YOUR_VARIABLE_NAME = this.createNewUiFieldsInstance(
	{
		container: { //has to be an object, optional
			component: YOUR_COMPONENT_NAME, //default: 'fieldset'
			classes: [] || '' //can be an array or a single class default: []
		} //optional,
	}
);
```


#### data
The data of your form. More information on the setFieldSet function!
```js
const YOUR_VARIABLE_NAME = this.createNewUiFieldsInstance(
	{
		data: [ //data of the second layer, can also be added by using the setFieldset function
			{
				key: NAME_OF_YOUR_FORM, //required, name of the form, otherwise this won't work
				data: DATA_OF_YOUR_FIELDSET, //optional, more information on setFieldset function
				container: { //has to be an object, optional
					component: YOUR_COMPONENT_NAME, //default: 'fieldset'
					classes: [] || '' //can be an array or a single class default: []
				} //optional,
			}

		]
	}
);
```

### Example
```js
const YOUR_VARIABLE_NAME = this.createNewUiFieldsInstance(
	{
		key: 'test-field',
		container: {
			component: 'fieldset',
			classes: 'test-field'
		}
	}
);
```

This will add a basic form with the key `test-field` and a single class. For every second layer it will create a fieldset wrapping that data with the class `test-field`

## Adding fieldsets to your form
To create a new fieldset you can use multiple options (almost the same as creating a form)

#### key
The name of your fieldset.
```js
YOUR_VARIABLE_NAME.setFieldSet(
	{
		key: NAME_OF_YOUR_FIELDSET //optional, default: 'form'
	}
);
```

#### container
The options of your fieldset.
```js
YOUR_VARIABLE_NAME.setFieldSet(
	{
		container: { //has to be an object, optional
			component: NAME_OF_YOUR_FIELDSET, //default: 'div'
			classes: [] || '' //can be an array or a single class default: []
		} //optional,
	}
);
```


#### data
The data of your fieldset. More information on the setField function!
```js
YOUR_VARIABLE_NAME.setFieldSet(
	{
		data: [ //data of the third layer, can also be added by using the setField function
			{
					depth: NAME_OF_YOUR_FIELDSET,
					name: YOUR_FIELD_NAME,
					type: FIELD_TYPE,
					placeholder: PLACEHOLDER,
					label: LABEL,
					required: true,
					errors: {
						validation: VALIDATION,
						message: MESSAGE
					}
				}
		]
	}
);
```

### Example
```js
YOUR_VARIABLE_NAME.setFieldSet(
	{
		key: 'test-fieldSet',
		container: {
			component: 'fieldset',
			classes: 'test-fieldSet'
		}
	}
);
```

## Adding fields to your fieldset
The most important thing is to link the field to your fieldset. This can be done by using the setField function.
```js
YOUR_VARIABLE_NAME.setField(
	{
		depth: NAME_OF_YOUR_FIELDSET,
	}
)
```

To create more fields at once you can also add and array.

### setField function
This function will create a single field. The props given to each field differ from the field type.

Type options:

* text
* email
* number
* password
* select
* checkbox

The default options for these fields are:

```js
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
	value: {
		name: 'div',
		props: [],
		classes: [],
		content: ''
	}
},
{
	key: 'errors',
	value: {}
}
```

All extra data can be added and will be saved under the extraData object.


### Example
```js
YOUR_VARIABLE_NAME.setField([
	{
		depth: 'individual',
		name: 'first_name',
		type: 'text',
		placeholder: 'Your first name',
		label: 'First Name',
		required: true,
		errors: {
			validation: 'required',
			message: 'First name is required'
		}
	}
]);
```
This will create a text field that is required in the fieldset individual.

Example of a final dataset created:
```js
[
	{
		key: 'form', //key of the form, default = 'form'
		data: [
			//array of fieldsets
			{
				key: 'colors', //key of fieldset
				data: [
					//array of elements inside of fieldset
					{
						name: 'colors',
						label: '',
						type: 'select',
						value: 'chefs-jacket-angelo',
						options: [
							//options for select field
							{ label: 'Zwart', value: 'chefs-jacket-angelo', selected: true },
							{ label: 'Red', value: 'chefs-jacket-ferre', selected: false },
							{ label: 'Green', value: 'chefs-jacket-urban', selected: false },
							{
								label: 'Black',
								value: 'softshell-jacket-mika',
								selected: false
							}
						]
					}
				],
				container: { component: 'div', classes: ['pdp', 'pdp__colors'] }
			},
			{
				key: 'variations',
				data: [
					{
						name: 'attribute_pa_size',
						label: '',
						type: 'select',
						value: 's',
						options: [
							{ label: 'l', value: 'l', selected: false },
							{ label: 'm', value: 'm', selected: false },
							{ label: 's', value: 's', selected: true },
							{ label: 'xl', value: 'xl', selected: false },
							{ label: 'xxl', value: 'xxl', selected: false }
						]
					}
				],
				container: { component: 'div', classes: ['pdp', 'pdp__variations'] }
			},
			{
				key: 'addons',
				data: [
					{
						value: '',
						name: 'embroidery',
						description: 'lorem ipsum domi set',
						type: 'checkbox',
						position: 0,
						options: [
							{ label: 'Add embroidery', price: '12.95', min: '', max: '' }
						],
						required: 0,
						label:
							'Add embroidery<span class="ui-text__label-price">+ € 12,95</span>',
						placeholder: 'Add embroidery',
						minLength: '',
						maxLength: '',
						customData: { price: '12.95' }
					},
					{
						name: 'Position',
						description: '',
						type: 'select',
						position: 1,
						options: [
							{
								label: 'Left top',
								price: '0',
								min: '',
								max: '',
								value: 'left_top',
								selected: true
							},
							{
								label: 'Right top',
								price: '20',
								min: '',
								max: '',
								value: 'right_top'
							}
						],
						required: 0,
						value: 'left_top',
						label: '',
						conditional: {
							depth: 'addons',
							key: 'embroidery',
							value: true,
							show: false
						}
					},
					{
						value: '',
						name: 'Text',
						description: '',
						type: 'text',
						position: 2,
						options: [{ label: 'Text', price: '0', min: '0', max: '50' }],
						required: 0,
						label: 'Text',
						placeholder: 'Text',
						minLength: '0',
						maxLength: '50',
						customData: { price: '0' },
						conditional: {
							depth: 'addons',
							key: 'embroidery',
							value: true,
							show: false
						}
					},
					{
						value: '',
						name: 'Extra text',
						description: '',
						type: 'text',
						position: 3,
						options: [{ label: 'Text', price: '3.5', min: '', max: '50' }],
						required: 1,
						label: 'Text<span class="ui-text__label-price">+ € 3,50</span>',
						placeholder: 'Text',
						minLength: '',
						maxLength: '50',
						customData: { price: '3.5' },
						conditional: { depth: 'addons', key: 'Text', show: false }
					},
					{
						name: 'Fontstyle',
						description: '',
						type: 'select',
						position: 4,
						options: [
							{ label: '1', price: '0', min: '', max: '', value: '1' },
							{
								label: '2',
								price: '0',
								min: '',
								max: '',
								value: '2',
								selected: true
							},
							{ label: '3', price: '0', min: '', max: '', value: '3' },
							{ label: '4', price: '0', min: '', max: '', value: '4' }
						],
						required: 0,
						value: '2',
						label: '',
						conditional: {
							depth: 'addons',
							key: 'embroidery',
							value: true,
							show: false
						}
					}
				],
				container: { component: 'div', classes: ['pdp', 'pdp__addons'] }
			}
		],
		container: { component: 'fieldset', classes: [] }
	}
];
```
## Extra functions

### setNewCondition

```js
formInstance.setNewCondition([
	{
		key: ['Position', 'Text', 'Fontstyle'],
		depth: 'addons',
		condition: {
			key: 'embroidery',
			value: true
		}
	},
	{
		key: ['Extra text'],
		depth: 'addons',
		condition: {
			key: 'Text',
			value: (val) => {
				if (val !== '') return true;
			}
		}
	}
]);
```

```js
formInstance.setNewCondition({
	key: 'addons',
	condition: {
		depth: 'variations',
		key: 'attribute_pa_size',
		value: 's'
	}
});
```

All functions can have a object or an array


TODO
Install
component inladen
Gaat kapot als er geen data is
component name en key moeten hetzelfde zijn!
setFieldSet can be an arry or an object
options for checkobox and select
How to retrieve and watch data
dont validate if not added
fields zitten altijd in zelfde form
