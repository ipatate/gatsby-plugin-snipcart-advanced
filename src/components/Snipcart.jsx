const React = require("react");

const Snipcart = ({
  publicApiKey,
  currency,
  innerHTML,
  openCartOnAdd,
  useSideCart,
  templatesUrl,
}) => (
  <div
    hidden
    id="snipcart"
    data-api-key={publicApiKey}
    data-currency={currency}
    data-config-add-product-behavior={openCartOnAdd === false ? "none" : null}
    data-config-modal-style={useSideCart === true ? "side" : null}
    data-templates-url={{}}
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
  templatesUrl: null,
};

module.exports = Snipcart;
