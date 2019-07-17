const { resolve, join } = require("path");

module.exports = function (moduleOptions) {
  const pluginsPath = join(__dirname, "plugins/");

  this.addPlugin({
    src: resolve(pluginsPath, `register-store.js`),
    options: moduleOptions,
    mode: 'client'
  });

  this.addPlugin({
    src: resolve(pluginsPath, `ui-fields-instance.js`),
    options: moduleOptions,
    mode: 'client'
  });

  this.extendBuild(extendBuild.bind(this));
};

module.exports.meta = require("../package.json");

function extendBuild(config) {
  config.resolve.alias["uiFieldsValidationRules"] = resolve(
    join(__dirname, "rules"),
    "index"
  );
  config.resolve.alias["uiFieldsLanguageNL"] = resolve(
    join(__dirname, "messages"),
    "nl.json"
  );
  config.resolve.alias["uiFieldsLanguageEN"] = resolve(
    join(__dirname, "messages"),
    "en.json"
  );
  config.resolve.alias["uiError"] = resolve(join(__dirname, "form"), "ui-error");

  config.resolve.alias["uiErrors"] = resolve(join(__dirname, "form"), "ui-errors");

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
