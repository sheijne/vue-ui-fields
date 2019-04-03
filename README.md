# Vue UI Fields

UI Fields is a plugin to easily create full functional forms in your Vue application.

Automatically create different types of fields based on a simpel json coming from your cms.

## Features

- Different types of input elements and single components
- Custom input types
- Create conditional fields
- Add custom styling
- Keep your forms data stored in VUEX and use them anywhere in your application.
- Vee validate

## Installation

```bash
# install
npm i @matise/ui-fields --save
# OR yarn add @matise/ui-fields
```

Install the package and add it to your modules in the `nuxt.config.js`:

#### nuxt config

```js
plugins: [
	{
		src: '~/plugins/uiFields',
		ssr: false
	}
],
modules: [
	'@matise/ui-fields'
]
```

#### plugins/uiFields.js

```js
import Vue from 'vue';
import UiCheckbox from '@matise/ui-fields/src/form/ui-checkbox.vue';
import UiSelect from '@matise/ui-fields/src/form/ui-select.vue';
import UiText from '@matise/ui-fields/src/form/ui-text.vue';
import UiFields from '@matise/ui-fields/src/form/ui-fields.vue';
import UiRadio from '@matise/ui-fields/src/form/ui-radio.vue';

const Components = {
	UiCheckbox,
	UiSelect,
	UiText,
	UiFields,
	UiRadio
};

Object.keys(Components).forEach((key) => {
	Vue.component(key, Components[key]);
});
```

#### component / page

In your page or component. Create the fields and add them to your template:

```js
<template>
	<ui-fields field-name="FORM_NAME" />
</template>
```

The `FORM_NAME` indicates the name given to the form on your form init. More info on [the documentation](https://vue-ui-fields.matise.nl/documentation/new-form.html)

If you have question, slack or mail [dipsaus](mail:to="dennis@matise.nl").

## Docs

Find the docs here [https://vue-ui-fields.matise.nl/](https://vue-ui-fields.matise.nl/)

### Why did we make this?

We made this module while making a few nuxt websites with a wordpress/woocommerce backend. We needed to create whole forms which could be created from the backend.

### Any ideas?

Please add an issue or do a PR, we are open for additions!
