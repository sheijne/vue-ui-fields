<template>
	<span v-if="fieldData" :class="getClasses(fieldData.container.classes)" class="ui-text">
		<label class="ui-text__element">
			<span v-if="fieldData.required" class="ui-text__required"></span>
			<span class="ui-text__label" v-html="fieldData.label"></span>
			<input
				ref="input"
				v-model="fieldDataValue"
				:type="fieldData.type"
				:placeholder="fieldData.placeholder"
				:maxlength="fieldData.maxLength"
				required="required"
				class="ui-text__input"
			>
		</label>
	</span>
</template>
<script>
import mixin from '../plugins/uiFieldsFunctions';
export default {
	mixins: [mixin]
};
</script>
