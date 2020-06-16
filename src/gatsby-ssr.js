const React = require("react");
const SnipcartStyles = require("./components/SnipcartStyles");
const Snipcart = require("./components/Snipcart");
const SnipcartProvider = require("./components/SnipcartProvider").default;

/**
 * insert script, style and tag in body on ssr render
 * @param options : {currency, version}
 */
exports.onRenderBody = ({ setPostBodyComponents }, pluginOptions = {}) => {
  if (
    !process.env.GATSBY_SNIPCART_API_KEY &&
    process.env.NODE_ENV === "production"
  ) {
    throw new Error(
      `Snipcart API Key "GATSBY_SNIPCART_API_KEY" is not defined. Use .env.development for develop mode and plateform env variable for production`
    );
    return null;
  }

  const _options = {
    ...{
      version: "3.0.12",
      innerHTML: "",
      openCartOnAdd: true,
    },
    ...pluginOptions,
  };
  const components = [
    <Snipcart
      key="snipcart"
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
      version: "3.0.12",
      locales: {},
      defaultLang: "en",
    },
    ...pluginOptions,
  };
  return <SnipcartProvider {..._options}>{element}</SnipcartProvider>;
};
