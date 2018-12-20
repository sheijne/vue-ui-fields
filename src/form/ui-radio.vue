<template>
	<span :class="getClasses(fieldData.container.classes)" class="ui-radio">
		<label
			v-for="(option,index) in fieldData.options"
			:key="index"
			class="ui-radio__element"
		>
			<span class="ui-radio__label" v-html="option.label"></span>
			<input
				v-model="fieldDataValue"
				:value="option.value"
				type="radio"
			>
		</label>
		<span class="ui-radio__slot">
			<slot></slot>
		</span>
	</span>
</template>
<script>
import mixin from '../plugins/uiFieldsFunctions';
export default {
	mixins: [mixin]
};
</script>
