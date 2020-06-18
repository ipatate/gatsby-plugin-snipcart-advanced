const React = require("react");
const SnipcartStyles = require("./components/SnipcartStyles");
const Snipcart = require("./components/Snipcart");
const SnipcartProvider = require("./components/SnipcartProvider").default;

const GATSBY_SNIPCART_API_KEY = process.env.GATSBY_SNIPCART_API_KEY;

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
  // find public api key in options plugin or environment variable
  const publicApiKey = GATSBY_SNIPCART_API_KEY || _options.publicApiKey;

  if (!publicApiKey) {
    throw new Error(
      `Snipcart public API Key is not defined. Insert in plugin options the "publicApiKey" parameter or use GATSBY_SNIPCART_API_KEY in environment variable`
    );
    return null;
  }

  const components = [
    <Snipcart
      key="snipcart"
      publicApiKey={publicApiKey}
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
