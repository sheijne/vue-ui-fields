// Import vue component
import uiCheckbox from './form/ui-checkbox.vue';
import uiFields from './form/ui-fields.vue';
// import uiNumber from './form/ui-number.vue';
import uiRadio from './form/ui-radio.vue';
import uiSelect from './form/ui-select.vue';
import uiText from './form/ui-text.vue';

import uiFieldsMixin from './plugins/uiFields.js';
import uiFieldsStore from './store/uiFields.js';

// install function executed by Vue.use()
export function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.component('uiCheckbox', uiCheckbox);
	Vue.component('uiFields', uiFields);
	// Vue.component('uiNumber',uiNumber);
	Vue.component('uiRadio ', uiRadio);
	Vue.component('uiSelect', uiSelect);
	Vue.component('uiText', uiText);
	Vue.component('uiText', uiText);
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
export default { uiCheckbox, uiFields, uiRadio, uiSelect, uiText, uiFieldsMixin, uiFieldsStore };

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
