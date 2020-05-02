# Gatsby JS plugin for SnipCart V3 with advanced settings

[Snipcart](https://snipcart.com/)

This plugin includes a Context for quantity in cart and detects if user is logged in or not

## Install

```bash
    npm install gatsby-plugin-snipcart-advanced
```

## API KEY

Set "GATSBY_SNIPCART_API_KEY" variable in environment

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
            defaultLang: 'fr',
            currency: 'eur',
            openCartOnAdd: false,
            locales: {
              fr: {
                actions: {
                  checkout: 'Valider le panier',
                },
              }
            },
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

Read the snipcart document [https://docs.snipcart.com/v3](https://docs.snipcart.com/v3)

- version : define version of snipcart library
- defaultLang : define default language
- currency : define currency
- openCartOnAdd : define if the "snipcart" library opens the cart when user clicks on "add to cart" button
- locales : object of locales string. First level of keys is lang key. Example: {fr: {...}}
  localisation files is here => [https://github.com/snipcart/snipcart-l10n](https://github.com/snipcart/snipcart-l10n)
- innerHTML : code for override snipcart element
  customization doc => [https://docs.snipcart.com/v3/setup/customization](https://docs.snipcart.com/v3/setup/customization))


Default values :

- version : 3.0.12
- defaultLang : "en"
- currency : "usd"
- openCartOnAdd : true
- locales : {}
- innerHTML : ''


## use the context in component

Use the context of the Snipcart plugin. You have 2 values in the context :
- state (object of value)
- changeLanguage (function)

When you use the changeLanguage function, it use the locales string define in config of plugin.

```jsx
  import {SnipCartContext} from 'gatsby-plugin-snipcart-advanced/context';

  const {state, changeLanguage} = useContext(SnipCartContext);

  changeLanguage('en');
```

### Example of component :

```jsx
import {SnipCartContext} from 'gatsby-plugin-snipcart-advanced/context';

const MyComponent = () => {
  const {state} = useContext(SnipCartContext);
  const {userStatus, cartQuantity} = state;
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

## Usage of snipcart for add a product in cart

The values come from where you want : markdown files, api...

Example of button for your product component:
```jsx
<button
    className="snipcart-add-item"
    data-item-id={id}
    data-item-price={price}
    data-item-url={slug}
    data-item-description={product.excerpt}
    data-item-image={image && image.publicURL}
    data-item-name={title}
    data-item-quantity="1"
    data-item-taxes={tva}
    disabled={_stock === 0 ? true : false}
>
    Add to cart
</button>
```

## Example of component for display a dialog alert after click on "Add to cart" button (if you set "openCartOnAdd" to false)

```jsx
import styles from './styles.module.css';

const AddCartModal = () => {
    const [open, toggleOpen] = useState(false);
    const [item, setItem] = useState({});
    // hidden button for open the cart
    const bt_cart = useRef();
    // mask under modal
    const mask = useRef();
    useEffect(() => {
      const {Snipcart} = window;
      if (!Snipcart) return;
      // open modal on snipcart event add item on cart
      Snipcart.events.on('item.adding', _item => {
        setItem(_item);
        toggleOpen(true);
      });
    }, []);

    return (
      <>
        <div
          ref={mask}
          className={`${open === true ? styles.show : ''} ${styles.mask}`}
        >
          <div
            className={styles.add__cart}
            role="alertdialog"
          >
            <button className={styles.close} onClick={() => toggleOpen(false)}>
              <span>Close</span>
            </button>
            <div className={styles.confirm}>
              {item.name && (
                <span>
                  <strong>
                    {item.quantity} {item.name}
                  </strong>{' '}{'added to your cart'}
                </span>
              )}
            </div>
            <div className={styles.actions}>
              <button onClick={() => toggleOpen(false)}>
                Continuer les achats
              </button>
              <button
                className={styles.got_cart}
                onClick={() => {
                  toggleOpen(false);
                  bt_cart.current.click();
                }}
              >
                Voir le panier
              </button>
            </div>
          </div>
        </div>
        <button
          ref={bt_cart}
          style={{height: 0, opacity: 0}}
          className="snipcart-checkout"
        ></button>
      </>
    );
  };

  export default AddCartModal;
```

## TODO

- Add validation on plugin options