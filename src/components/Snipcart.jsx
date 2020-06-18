const React = require("react");

const Snipcart = ({ publicApiKey, currency, innerHTML, openCartOnAdd }) => (
  <div
    hidden
    id="snipcart"
    data-api-key={publicApiKey}
    data-currency={currency}
    data-config-add-product-behavior={openCartOnAdd === false ? "none" : null}
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
};

module.exports = Snipcart;
