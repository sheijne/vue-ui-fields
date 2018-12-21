<template>
	<span :class="getClasses(fieldData.container.classes)" class="ui-checkbox">
		<label class="ui-checkbox__element">
			<input v-model="fieldDataValue" type="checkbox" class="ui-checkbox__input" >
			<span class="ui-checkbox__label">
				<span class="ui-checkbox__icon"> </span> <span class="ui-checkbox__label-text" v-html="fieldData.label"></span>
			</span>
		</label>
		<slot></slot>
	</span>
</template>

<script>
import mixin from '../plugins/uiFieldsFunctions';
export default {
	mixins: [mixin]
};
</script>
