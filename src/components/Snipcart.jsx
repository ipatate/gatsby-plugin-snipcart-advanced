const React = require('react');

const GATSBY_SNIPCART_API_KEY = process.env.GATSBY_SNIPCART_API_KEY;

const Snipcart = ({currency, innerHTML, openCartOnAdd}) => (
  <div
    hidden
    id="snipcart"
    data-currency={currency}
    data-api-key={GATSBY_SNIPCART_API_KEY}
    data-config-add-product-behavior={openCartOnAdd === false ? 'none' : null}
    dangerouslySetInnerHTML={{
      __html: `
        ${innerHTML}
      `,
    }}
  />
);

Snipcart.defaultProps = {
  currency: 'usd',
  innerHTML: '',
  openCartOnAdd: true,
};

module.exports = Snipcart;
