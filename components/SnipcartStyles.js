"use strict";

var React = require('react');

var SnipcartStyles = function SnipcartStyles(_ref) {
  var version = _ref.version;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("link", {
    rel: "preload",
    href: "https://cdn.snipcart.com/themes/v" + version + "/default/snipcart.css",
    as: "style",
    id: "snipcart-styles"
  }), /*#__PURE__*/React.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: "\n        (function() { var s = document.getElementById('snipcart-styles'); if(s) {s.rel =\n        'stylesheet';}})();"
    }
  }), /*#__PURE__*/React.createElement("noscript", null, /*#__PURE__*/React.createElement("link", {
    rel: "stylesheet",
    href: "https://cdn.snipcart.com/themes/v" + version + "/default/snipcart.css"
  })));
};

module.exports = SnipcartStyles;