"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = require('react');

var SnipcartProvider = require('./components/SnipcartProvider').default;
/**
 * wrapp app with provider for dispatch cart and customer infos
 */


exports.wrapRootElement = function (_ref, pluginOptions) {
  var element = _ref.element;

  if (pluginOptions === void 0) {
    pluginOptions = {};
  }

  var _options = (0, _extends2.default)({}, {
    version: '3.0.15',
    locales: {},
    defaultLang: 'en'
  }, pluginOptions);

  return /*#__PURE__*/React.createElement(SnipcartProvider, _options, element);
};