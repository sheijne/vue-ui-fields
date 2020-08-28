import Vue from 'vue';
import App from './App.vue';
import uiFields from '../../src/index.js';

Vue.config.productionTip = false;

Vue.use(uiFields);

new Vue({
	render: (h) => h(App),
}).$mount('#app');
