<template>
	<nuxt-link v-if="to" :to="to" :class="buttonClasses">
		<span v-if="!emptySlot" class="button__text"> <slot></slot> </span> <span class="button__icon"> </span>
	</nuxt-link>
	<a v-else-if="href" :href="href" :class="buttonClasses">
		<span v-if="!emptySlot" class="button__text"> <slot></slot> </span> <span class="button__icon"> </span>
	</a>
	<button v-else-if="disabled" :class="buttonClasses" disabled="disabled">
		<span v-if="!emptySlot" class="button__text"> <slot></slot> </span> <span class="button__icon"> </span>
	</button>
	<button v-else-if="!disabled" :class="buttonClasses">
		<span v-if="!emptySlot" class="button__text"> <slot></slot> </span> <span class="button__icon"> </span>
	</button>
</template>

<script>
export default {
	props: {
		iconName: {
			type: String,
			default: ''
		},
		height: {
			type: [String, Number],
			default: '12'
		},
		width: {
			type: [String, Number],
			default: '12'
		},
		to: {
			type: String,
			default: null
		},
		href: {
			type: String,
			default: null
		},
		disabled: {
			type: Boolean,
			default: false
		},
		greyIcon: {
			type: Boolean,
			default: false
		},
		buttonAfter: {
			type: Boolean,
			default: false
		},
		bgColor: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			buttonClasses: ['button'],
			emptySlot: true
		};
	},
	created() {
		if (this.$slots.default) {
			this.emptySlot = false;
		}

		if (this.$props.iconName === '') {
			this.buttonClasses.push('button__text-only');
			if (this.$props.bgColor === 'white') {
				this.buttonClasses.push('button__text-only--white');
			}
		} else {
			if (this.$props.buttonAfter) {
				this.buttonClasses.push('button__text-only--after');
				if (this.$props.bgColor === 'inverted') {
					this.buttonClasses.push('button__text-only--after-inverted');
				}
			} else {
				this.buttonClasses.push('button__icon-only');
			}
		}
		if (this.$props.greyIcon && this.$props.iconName !== '') {
			this.buttonClasses.push('button__icon-only--inverted');
		}
	}
};
</script>
