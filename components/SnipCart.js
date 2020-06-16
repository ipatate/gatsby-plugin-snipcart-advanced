"use strict";

var React = require('react');

var GATSBY_SNIPCART_API_KEY = process.env.GATSBY_SNIPCART_API_KEY;

var Snipcart = function Snipcart(_ref) {
  var currency = _ref.currency,
      innerHTML = _ref.innerHTML,
      openCartOnAdd = _ref.openCartOnAdd;
  return /*#__PURE__*/React.createElement("div", {
    hidden: true,
    id: "snipcart",
    "data-currency": currency,
    "data-api-key": GATSBY_SNIPCART_API_KEY,
    "data-config-add-product-behavior": openCartOnAdd === false ? 'none' : null,
    dangerouslySetInnerHTML: {
      __html: "\n        " + innerHTML + "\n      "
    }
  });
};

Snipcart.defaultProps = {
  currency: 'usd',
  innerHTML: '',
  openCartOnAdd: true
};
module.exports = Snipcart;