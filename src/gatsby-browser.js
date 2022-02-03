const React = require("react");
const SnipcartProvider = require("./components/SnipcartProvider").default;

/**
 * wrap page with provider for dispatch cart and customer infos
 */
exports.wrapPageElement = ({ element, props }, pluginOptions = {}) => {
  const includeSnipcart = pluginOptions.shopPages == null || pluginOptions.shopPages.includes(props.path.replace(/\/$/g, ""));
  if (!includeSnipcart) {
    return element;
  }

  const _options = {
    ...{
      version: "3.0.29",
      locales: {},
      defaultLang: "en",
    },
    ...pluginOptions,
  };
  return <SnipcartProvider {..._options}>{element}</SnipcartProvider>;
};
