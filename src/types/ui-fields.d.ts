import { UIFields } from './field';
declare module 'vue/types/vue' {
	// 3. Declare augmentation for Vue
	interface Vue {
		$uiFields: UIFields;
	}
}
