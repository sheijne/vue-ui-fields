<template>
	<span :class="getClasses(fieldData.container.classes)" class="ui-select">
		<label class="ui-select__element">
			<span class="ui-select__label" v-html="createLabel(fieldData.name)"></span>
			<select :name="fieldData.name" v-model="fieldDataValue" class="ui-select__select">
				<option v-for="(option, index) in fieldData.options" :key="index" :value="option.value">{{ option.label }}</option>
			</select>
			<span v-if="iconName" class="ui-select__icon"> </span>
		</label>
		<span class="ui-select__slot">
			<button
				v-if="fieldData.description"
				class="button--moreinfo"
				@click.prevent="
					shownInfo = select;
					shownInfoVisible = true;
				"
			>
				?
			</button>
		</span>
	</span>
</template>

<script>
import mixin from '../plugins/uiFieldsFunctions';
export default {
	mixins: [mixin]
};
</script>
