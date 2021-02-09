"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = require("react");

var SnipcartStyles = require("./components/SnipcartStyles");

var Snipcart = require("./components/Snipcart");

var SnipcartProvider = require("./components/SnipcartProvider").default;

var GATSBY_SNIPCART_API_KEY = process.env.GATSBY_SNIPCART_API_KEY;
/**
 * insert script, style and tag in body on ssr render
 * @param options : {currency, version}
 */

exports.onRenderBody = function (_ref, pluginOptions) {
  var setPostBodyComponents = _ref.setPostBodyComponents;

  if (pluginOptions === void 0) {
    pluginOptions = {};
  }

  var _options = (0, _extends2.default)({}, {
    version: "3.0.19",
    innerHTML: "",
    openCartOnAdd: true,
    useSideCart: false,
    templatesUrl: null
  }, pluginOptions); // find public api key in options plugin or environment variable


  var publicApiKey = GATSBY_SNIPCART_API_KEY || _options.publicApiKey;

  if (!publicApiKey) {
    throw new Error("Snipcart public API Key is not defined. Insert in plugin options the \"publicApiKey\" parameter or use GATSBY_SNIPCART_API_KEY in environment variable");
    return null;
  } // Use a default currency value by default. True if plugin option is undefined
  // or defined as true. False only if plugin option is defined as false.


  var provideDefaultCurrency = _options.provideDefaultCurrency !== false ? true : false;
  var components = [/*#__PURE__*/React.createElement(Snipcart, {
    key: "snipcart",
    publicApiKey: publicApiKey,
    innerHTML: _options.innerHTML // Only pass currency value if using default currency
    ,
    currency: provideDefaultCurrency ? _options.currency : null,
    openCartOnAdd: _options.openCartOnAdd,
    useSideCart: _options.useSideCart,
    templatesUrl: _options.templatesUrl
  }),
  /*#__PURE__*/
  // insert style
  React.createElement(SnipcartStyles, {
    key: "snipcart-style",
    version: _options.version
  }),
  /*#__PURE__*/
  // insert script
  React.createElement("script", {
    key: "snipcart-script",
    defer: true,
    rel: "preload",
    as: "script",
    src: "https://cdn.snipcart.com/themes/v" + _options.version + "/default/snipcart.js"
  })];
  return setPostBodyComponents(components);
};
/**
 * wrapp app with provider for dispatch cart and customer infos
 */


exports.wrapRootElement = function (_ref2, pluginOptions) {
  var element = _ref2.element;

  if (pluginOptions === void 0) {
    pluginOptions = {};
  }

  var _options = (0, _extends2.default)({}, {
    version: "3.0.15",
    locales: {},
    defaultLang: "en"
  }, pluginOptions);

  return /*#__PURE__*/React.createElement(SnipcartProvider, _options, element);
};