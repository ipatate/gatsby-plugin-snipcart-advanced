"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = require("react");

var SnipStyles = require("./components/SnipStyles");

var SnipCart = require("./components/SnipCart");
/**
 * insert script, style and tag in body on ssr render
 * @param options : {currency, version}
 */


exports.onRenderBody = function (_ref, pluginOptions) {
  var setPostBodyComponents = _ref.setPostBodyComponents;

  if (pluginOptions === void 0) {
    pluginOptions = {};
  }

  if (!process.env.GATSBY_SNIPCART_API_KEY && process.env.NODE_ENV === "production") {
    throw new Error("Snipcart API Key \"GATSBY_SNIPCART_API_KEY\" is not defined. Use .env.development for develop mode and plateform env variable for production");
    return null;
  }

  var _options = (0, _extends2.default)({}, {
    version: "3.0.12",
    innerHTML: "",
    openCartOnAdd: true
  }, {}, pluginOptions);

  var components = [/*#__PURE__*/React.createElement(SnipCart, {
    key: "snipcart",
    innerHTML: _options.innerHTML,
    currency: _options.currency,
    openCartOnAdd: _options.openCartOnAdd
  }),
  /*#__PURE__*/
  // insert style
  React.createElement(SnipStyles, {
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