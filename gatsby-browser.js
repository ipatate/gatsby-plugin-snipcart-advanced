"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = require("react");

var SnipcartProvider = require("./components/SnipcartProvider").default;
/**
 * wrap page with provider for dispatch cart and customer infos
 */


exports.wrapPageElement = function (_ref, pluginOptions) {
  var element = _ref.element,
      props = _ref.props;

  if (pluginOptions === void 0) {
    pluginOptions = {};
  }

  var includeSnipcart = pluginOptions.shopPages == null || pluginOptions.shopPages.includes(props.path.replace(/\/$/g, ""));

  if (!includeSnipcart) {
    return element;
  }

  var _options = (0, _extends2.default)({}, {
    version: "3.0.29",
    locales: {},
    defaultLang: "en"
  }, {}, pluginOptions);

  return /*#__PURE__*/React.createElement(SnipcartProvider, _options, element);
};