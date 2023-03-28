"use strict";

exports.__esModule = true;
exports.default = void 0;

var React = require('react');

var _require = require('../store'),
    useStore = _require.useStore,
    SnipcartContext = _require.SnipcartContext;

var Snipcart = require("./Snipcart");

var SnipcartStyles = require("./SnipcartStyles");
/**
 * @param props : {currency, version}
 */


var SnipcartProvider = function SnipcartProvider(props) {
  var _useStore = useStore(),
      state = _useStore[0],
      dispatch = _useStore[1];

  var defaultLang = props.defaultLang,
      locales = props.locales;
  var pageLang = document.documentElement.lang || defaultLang;

  var changeLanguage = function changeLanguage(lang) {
    var lng = locales[lang] || {};
    window.Snipcart.api.session.setLanguage(lang, lng);
  };

  React.useEffect(function () {
    var listenSnipcart = function listenSnipcart() {
      document.addEventListener('snipcart.ready', function () {
        dispatch({
          type: 'setReady',
          payload: true
        });
        changeLanguage(pageLang);
      });
    };

    if (window.Snipcart !== undefined) {
      dispatch({
        type: 'setReady',
        payload: true
      });
      changeLanguage(pageLang);
    } else {
      listenSnipcart();
    }
  }, [dispatch, defaultLang, locales]); // find public api key in options plugin or environment variable

  var publicApiKey = process.env.GATSBY_SNIPCART_API_KEY || props.publicApiKey;

  if (!publicApiKey) {
    console.log("Error: Snipcart public API Key is not defined. Insert in plugin options the \"publicApiKey\" parameter or use GATSBY_SNIPCART_API_KEY in environment variable");
  } // Use a default currency value by default. True if plugin option is undefined
  // or defined as true. False only if plugin option is defined as false.


  var provideDefaultCurrency = props.provideDefaultCurrency !== false ? true : false;
  return /*#__PURE__*/React.createElement(SnipcartContext.Provider, {
    value: {
      state: state,
      changeLanguage: changeLanguage
    }
  }, props.children, /*#__PURE__*/React.createElement(Snipcart, {
    key: "snipcart",
    publicApiKey: publicApiKey,
    innerHTML: props.innerHTML // Only pass currency value if using default currency
    ,
    currency: provideDefaultCurrency ? props.currency : null,
    openCartOnAdd: props.openCartOnAdd,
    useSideCart: props.useSideCart,
    templatesUrl: props.templatesUrl
  }), /*#__PURE__*/React.createElement(SnipcartStyles, {
    key: "snipcart-style",
    version: props.version
  }), /*#__PURE__*/React.createElement("script", {
    key: "snipcart-script",
    defer: true,
    rel: "preload",
    as: "script",
    src: "https://cdn.snipcart.com/themes/v" + props.version + "/default/snipcart.js"
  }));
};

SnipcartProvider.defaultProps = {
  version: '3.0.15',
  locales: {},
  defaultLang: 'en'
};
var _default = SnipcartProvider;
exports.default = _default;