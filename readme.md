# Gatsby JS plugin for SnipCart V3 with advanced settings (Beta version)

[Snipcart](https://snipcart.com/)

This plugin include a Context for quantity in cart and detect if user is logged or not

## Install

```bash
    npm install gatsby-plugin-snipcart-advanced
```

## API KEY

Declare API KEY Snipcart in environment variable
- GATSBY_SNIPCART_API_KEY

The plugin use :
```js
process.env.GATSBY_SNIPCART_API_KEY
```

## Usage

In your `gatsby-config.js` file, add:

```javascript
module.exports = {
  plugins: [
    {
        resolve: `gatsby-plugin-snipcart-advanced`,
        options: {
            version: '3.0.12',
            lang: 'fr',
            currency: 'eur',
            openCartOnAdd: false,
            locales: {},
            innerHTML: `
            <billing section="bottom">
                ...
            </billing>`,
        },
    },
  ],
}
```

## Options

Read the snipcart documentation [https://docs.snipcart.com/v3](https://docs.snipcart.com/v3)

- version : define version of snipcart / default 3.0.12
- lang : define lang / default "en"
- currency : define currency / default "usd"
- openCartOnAdd : open the cart when user click on "add to cart" btn / default: true
- locales : object of locales string / default {}
  localisation files is here => [https://github.com/snipcart/snipcart-l10n](https://github.com/snipcart/snipcart-l10n)
- innerHTML : code for override snipcart element / default ''
  customization doc => [https://docs.snipcart.com/v3/setup/customization](https://docs.snipcart.com/v3/setup/customization))


## use the context in component

```jsx
import {SnipCartContext} from 'gatsby-plugin-snipcart-advanced/context';

const MyComponent = () => {
  const {userStatus, cartQuantity} = useContext(SnipCartContext);
return (
    <div>
      {userStatus === 'SignedOut' ? (
        <button className="snipcart-customer-signin">
          <span>Se connecter</span>
        </button>
      ) : (
        <button className="snipcart-customer-signin">
          <span>Mon compte</span>
        </button>
      )}
      <button className="snipcart-checkout">
        <span>{cartQuantity}</span>
      </button>
    </div>
  );
}
```