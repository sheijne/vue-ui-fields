const { resolve, join } = require("path");

module.exports = function(moduleOptions) {
  const pluginsPath = join(__dirname, "plugins/");
  const componentsPath = join(__dirname, "components/");
  this.addPlugin({
    src: resolve(pluginsPath, `register-store.js`),
    options: moduleOptions
  });

  this.addPlugin({
    src: resolve(pluginsPath, `ui-fields-instance.js`),
    options: moduleOptions
  });
};

module.exports.meta = require("../package.json");
