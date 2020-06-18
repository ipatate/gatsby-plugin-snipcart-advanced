"use strict";

var React = require("react");

var Snipcart = function Snipcart(_ref) {
  var publicApiKey = _ref.publicApiKey,
      currency = _ref.currency,
      innerHTML = _ref.innerHTML,
      openCartOnAdd = _ref.openCartOnAdd;
  return /*#__PURE__*/React.createElement("div", {
    hidden: true,
    id: "snipcart",
    "data-api-key": publicApiKey,
    "data-currency": currency,
    "data-config-add-product-behavior": openCartOnAdd === false ? "none" : null,
    dangerouslySetInnerHTML: {
      __html: "\n        " + innerHTML + "\n      "
    }
  });
};

Snipcart.defaultProps = {
  currency: "usd",
  innerHTML: "",
  openCartOnAdd: true
};
module.exports = Snipcart;