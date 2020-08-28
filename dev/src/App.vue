<template>
	<div id="app">
		<UiFields name="checkout" />
	</div>
</template>

<script>
export default {
	name: 'App',
	created() {
		this.$uiFields.new('checkout');
		this.$uiFields.setFields('checkout', [
			{
				name: 'optional_value',
				type: 'checkbox',
				options: [
					{
						value: 'true',
						label: 'Do you want to ship your order to a different address?'
					}
				]
			},
			{
				name: 'shipping_address',
				label: 'Address'
			}
		]);

		this.$uiFields.setCondition(
			'checkout',
			'optional_value',
			(val) => {
				if (Array.isArray(val)) {
					return val.includes('true');
				}
				return false;
			},
			'checkout',
			'shipping_address'
		);
	}
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
