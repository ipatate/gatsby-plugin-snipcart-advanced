const React = require("react");

const Snipcart = ({ publicApiKey, currency, innerHTML, openCartOnAdd, useSideCart }) => (
  <div
    hidden
    id="snipcart"
    data-api-key={publicApiKey}
    data-currency={currency}
    data-config-add-product-behavior={openCartOnAdd === false ? "none" : null}
    data-config-modal-style={useSideCart === false ? "side" : null}
    dangerouslySetInnerHTML={{
      __html: `
        ${innerHTML}
      `,
    }}
  />
);

Snipcart.defaultProps = {
  currency: "usd",
  innerHTML: "",
  openCartOnAdd: true,
  useSideCart: false,
};

module.exports = Snipcart;
