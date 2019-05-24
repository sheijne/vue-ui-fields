const { resolve, join } = require("path");

module.exports = function(moduleOptions) {
  const pluginsPath = join(__dirname, "plugins/");

  this.addPlugin({
    src: resolve(pluginsPath, `register-store.js`),
    options: moduleOptions
  });

  this.addPlugin({
    src: resolve(pluginsPath, `ui-fields-instance.js`),
    options: moduleOptions
  });

  this.extendBuild(extendBuild.bind(this));
};

module.exports.meta = require("../package.json");

function extendBuild(config) {
  config.resolve.alias["uiText"] = resolve(join(__dirname, "form"), "ui-text");
  config.resolve.alias["uiCheckbox"] = resolve(
    join(__dirname, "form"),
    "ui-checkbox"
  );
  config.resolve.alias["uiSelect"] = resolve(
    join(__dirname, "form"),
    "ui-select"
  );
  config.resolve.alias["uiFields"] = resolve(
    join(__dirname, "form"),
    "ui-fields"
  );
  config.resolve.alias["uiRadio"] = resolve(
    join(__dirname, "form"),
    "ui-radio"
  );
  config.resolve.alias["uiTextarea"] = resolve(
    join(__dirname, "form"),
    "ui-textarea"
  );
}
