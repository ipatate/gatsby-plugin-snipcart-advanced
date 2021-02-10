"use strict";

var React = require("react");

var Snipcart = function Snipcart(_ref) {
  var publicApiKey = _ref.publicApiKey,
      currency = _ref.currency,
      innerHTML = _ref.innerHTML,
      openCartOnAdd = _ref.openCartOnAdd,
      useSideCart = _ref.useSideCart,
      templatesUrl = _ref.templatesUrl;
  return /*#__PURE__*/React.createElement("div", {
    hidden: true,
    id: "snipcart",
    "data-api-key": publicApiKey,
    "data-currency": currency,
    "data-config-add-product-behavior": openCartOnAdd === false ? "none" : null,
    "data-config-modal-style": useSideCart === true ? "side" : null,
    "data-templates-url": templatesUrl,
    dangerouslySetInnerHTML: {
      __html: "\n        " + innerHTML + "\n      "
    }
  });
};

Snipcart.defaultProps = {
  currency: "usd",
  innerHTML: "",
  openCartOnAdd: true,
  useSideCart: false,
  templatesUrl: null
};
module.exports = Snipcart;