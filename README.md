### Setup formInstance

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

### uiFields

How to use it.

- Install Vuex component
- Install plugin
- Create new instance

Done.

## Docs

uiFields is a class constructor combined with Vuex. If you create a new instance you have to dispatch this instance to the Vuex before you can use it. Props won't be needed. All data has the same structure so we can get constant data. The only thing uiFields will do is controlling your fields data without any trouble.

### Install

After installing create a new instance. I recommend doing this in created, before rendering data.

```js
const YOUR_VARIABLE_NAME = this.createNewUiFieldsInstance();
```

createNewUiFieldsInstance returns a new instance of uiFields and will set your base options.

#### Base options

```js
{
	key: 'form', //key of the form, default = 'form'
	data: [
		//array of fieldsets
	],
	container: {
		classes: [], //array or string
		component: 'fieldset' //String
	}
}
```

You can add your data on create or by calling a function

#### setFieldSet

```js
formInstance.setFieldSet({
	key: 'colors',
	data: [],
	container: {
		component: 'div',
		classes: ['pdp', 'pdp__colors']
	}
});
```

#### setField

```js
formInstance.setField({
	name: 'Position',
	depth: 'colors',
	type: 'text'
});
```

#### setNewCondition

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
