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
      dispatch = _useStore[1]; // add style/script and listen snipcart


  React.useEffect(function () {
    var lang = props.lang,
        locales = props.locales;

    var listenSnipCart = function listenSnipCart() {
      document.addEventListener('snipcart.ready', function () {
        dispatch({
          type: 'setReady',
          payload: true
        });
        window.Snipcart.api.session.setLanguage(lang, locales);
      });
    };

    if (window.Snipcart !== undefined) {
      dispatch({
        type: 'setReady',
        payload: true
      });
      window.Snipcart.api.session.setLanguage(lang, locales);
    } else {
      listenSnipCart();
    }
  }, [props, dispatch]);
  return /*#__PURE__*/React.createElement(SnipCartContext.Provider, {
    value: state
  }, props.children);
};

SnipCartProvider.defaultProps = {
  version: '3.0.12',
  locales: {},
  lang: 'en'
};
var _default = SnipCartProvider;
exports.default = _default;