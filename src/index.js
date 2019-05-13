const { resolve, join } = require('path');

module.exports = function(moduleOptions) {
	const pluginsPath = join(__dirname, 'plugins/');
	this.addPlugin({
		src: resolve(pluginsPath, `register-store.js`),
		options: moduleOptions
	});

	this.addPlugin({
		src: resolve(pluginsPath, `ui-fields-functions.js`),
		options: {}
	});

	this.addPlugin({
		src: resolve(pluginsPath, `ui-fields-instance.js`),
		options: moduleOptions
	});
};
