"use strict";

exports.__esModule = true;
exports.default = void 0;

var React = require('react');

var _require = require('../store'),
    useStore = _require.useStore,
    SnipcartContext = _require.SnipcartContext;
/**
 * @param props : {currency, version}
 */


var SnipcartProvider = function SnipcartProvider(props) {
  var _useStore = useStore(),
      state = _useStore[0],
      dispatch = _useStore[1];

  var defaultLang = props.defaultLang,
      locales = props.locales;

  var changeLanguage = function changeLanguage(lang) {
    var lng = locales[defaultLang] || {};
    window.Snipcart.api.session.setLanguage(lang, lng);
  };

  React.useEffect(function () {
    var listenSnipcart = function listenSnipcart() {
      document.addEventListener('snipcart.ready', function () {
        dispatch({
          type: 'setReady',
          payload: true
        });
        changeLanguage(defaultLang);
      });
    };

    if (window.Snipcart !== undefined) {
      dispatch({
        type: 'setReady',
        payload: true
      });
      changeLanguage(defaultLang);
    } else {
      listenSnipcart();
    }
  }, [props, dispatch, defaultLang, locales]);
  return /*#__PURE__*/React.createElement(SnipcartContext.Provider, {
    value: {
      state: state,
      changeLanguage: changeLanguage
    }
  }, props.children);
};

SnipcartProvider.defaultProps = {
  version: '3.0.15',
  locales: {},
  defaultLang: 'en'
};
var _default = SnipcartProvider;
exports.default = _default;