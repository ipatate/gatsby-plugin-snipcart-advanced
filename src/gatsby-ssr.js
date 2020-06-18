const React = require("react");
const SnipcartStyles = require("./components/SnipcartStyles");
const Snipcart = require("./components/Snipcart");
const SnipcartProvider = require("./components/SnipcartProvider").default;

/**
 * insert script, style and tag in body on ssr render
 * @param options : {currency, version}
 */
exports.onRenderBody = ({ setPostBodyComponents }, pluginOptions = {}) => {

  const _options = {
    ...{
      version: "3.0.15",
      innerHTML: "",
      openCartOnAdd: true,
    },
    ...pluginOptions,
  };
  const components = [
    <Snipcart
      key="snipcart"
      publicApiKey={_options.publicApiKey}
      innerHTML={_options.innerHTML}
      currency={_options.currency}
      openCartOnAdd={_options.openCartOnAdd}
    />,
    // insert style
    <SnipcartStyles key="snipcart-style" version={_options.version} />,
    // insert script
    <script
      key="snipcart-script"
      defer
      rel="preload"
      as="script"
      src={`https://cdn.snipcart.com/themes/v${_options.version}/default/snipcart.js`}
    ></script>,
  ];

  return setPostBodyComponents(components);
};

/**
 * wrapp app with provider for dispatch cart and customer infos
 */
exports.wrapRootElement = ({ element }, pluginOptions = {}) => {
  const _options = {
    ...{
      version: "3.0.15",
      locales: {},
      defaultLang: "en",
    },
    ...pluginOptions,
  };
  return <SnipcartProvider {..._options}>{element}</SnipcartProvider>;
};
