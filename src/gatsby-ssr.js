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
      version: "3.0.29",
      innerHTML: "",
      openCartOnAdd: true,
      useSideCart: false,
      templatesUrl: null,
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

  // Use a default currency value by default. True if plugin option is undefined
  // or defined as true. False only if plugin option is defined as false.
  const provideDefaultCurrency =
    _options.provideDefaultCurrency !== false ? true : false;

  const components = [
    <Snipcart
      key="snipcart"
      publicApiKey={publicApiKey}
      innerHTML={_options.innerHTML}
      // Only pass currency value if using default currency
      currency={provideDefaultCurrency ? _options.currency : null}
      openCartOnAdd={_options.openCartOnAdd}
      useSideCart={_options.useSideCart}
      templatesUrl={_options.templatesUrl}
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
      version: "3.0.29",
      locales: {},
      defaultLang: "en",
    },
    ...pluginOptions,
  };
  return <SnipcartProvider {..._options}>{element}</SnipcartProvider>;
};
