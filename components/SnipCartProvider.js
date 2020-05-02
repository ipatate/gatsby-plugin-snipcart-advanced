"use strict";

exports.__esModule = true;
exports.default = void 0;

var React = require('react');

var _require = require('../store'),
    useStore = _require.useStore,
    SnipCartContext = _require.SnipCartContext;
/**
 * @param props : {currency, version}
 */


var SnipCartProvider = function SnipCartProvider(props) {
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
    var listenSnipCart = function listenSnipCart() {
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
      listenSnipCart();
    }
  }, [props, dispatch, defaultLang, locales]);
  return /*#__PURE__*/React.createElement(SnipCartContext.Provider, {
    value: {
      state: state,
      changeLanguage: changeLanguage
    }
  }, props.children);
};

SnipCartProvider.defaultProps = {
  version: '3.0.12',
  locales: {},
  defaultLang: 'en'
};
var _default = SnipCartProvider;
exports.default = _default;