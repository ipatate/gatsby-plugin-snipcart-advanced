# Gatsby JS plugin for Snipcart V3 with advanced settings

[Snipcart](https://snipcart.com/)

**Work with gatsby v2 and v3**

This plugin includes a Context for quantity in cart and detects if user is logged in or not

## Install

```bash
    npm install gatsby-plugin-snipcart-advanced
```

## API KEY

Set the Snipcart public api key in options plugin or use "GATSBY_SNIPCART_API_KEY" variable in environment.
If you want use different api key by environment, use it in environment variable.

_The environment variable is prioritary on plugin option parameter._

The plugin use :

```js
process.env.GATSBY_SNIPCART_API_KEY;
```

## Usage

In your `gatsby-config.js` file, add:

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-snipcart-advanced`,
      options: {
        version: "3.0.29",
        publicApiKey: "#####", // use public api key here or in environment variable
        defaultLang: "fr",
        currency: "eur",
        openCartOnAdd: false,
        useSideCart: true,
        // be careful with this mode cart. The cart in this mode has a bug of scroll in firefox
        locales: {
          fr: {
            actions: {
              checkout: "Valider le panier",
            },
          },
        },
        templatesUrl:
          "path on your template file. Set file in the static folder, ex: '/snipcart/index.html'",
        // not work on dev. Gatsby not serve html file in dev https://github.com/gatsbyjs/gatsby/issues/13072
        innerHTML: `
            <billing section="bottom">
                <!-- Customization goes here -->
            </billing>`,
      },
    },
  ],
};
```

## Options

Read the snipcart document [https://docs.snipcart.com/v3](https://docs.snipcart.com/v3)

- version : define version of snipcart library
- publicApiKey: Snipcart public api key
- defaultLang : define default language
- provideDefaultCurrency: Facilitates multi-currency carts. Set to false to prevent a default currency from being specified, resetting the currency on an active cart session
- currency : define currency
- openCartOnAdd : define if the "snipcart" library opens the cart when user clicks on "add to cart" button
- useSideCart : define if the "snipcart" library opens the cart in a side modal
- locales : object of locales string. First level of keys is lang key. Example: {fr: {...}}
  localisation files is here => [https://github.com/snipcart/snipcart-l10n](https://github.com/snipcart/snipcart-l10n)
- templatesUrl: template file for override snipcart element [https://docs.snipcart.com/v3/setup/customization#defining-templates-in-an-external-file](https://docs.snipcart.com/v3/setup/customization#defining-templates-in-an-external-file)
- innerHTML : code for override snipcart element
  customization doc => [https://docs.snipcart.com/v3/setup/customization](https://docs.snipcart.com/v3/setup/customization))

Default values :

- version : 3.0.29
- defaultLang : "en"
- currency : "usd"
- openCartOnAdd : true
- useSideCart : false
- templatesUrl: null
- locales : {}
- innerHTML : ''

## use the context in component

Use the context of the Snipcart plugin. You have 2 values in the context :

- state (object of value)
- changeLanguage (function)

When you use the changeLanguage function, it use the locales string define in config of plugin.

```jsx
import { SnipcartContext } from "gatsby-plugin-snipcart-advanced/context";

const { state, changeLanguage } = useContext(SnipcartContext);

changeLanguage("en");
```

### Example of component:

```jsx
import { SnipcartContext } from "gatsby-plugin-snipcart-advanced/context";

const MyComponent = () => {
  const { state } = useContext(SnipcartContext);
  const { userStatus, cartQuantity } = state;
  return (
    <div>
      {userStatus === "SignedOut" ? (
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
};
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
import styles from "./styles.module.css";

const AddCartModal = () => {
  const [open, toggleOpen] = useState(false);
  const [item, setItem] = useState({});
  // hidden button for open the cart
  const bt_cart = useRef();
  // mask under modal
  const mask = useRef();
  useEffect(() => {
    const { Snipcart } = window;
    if (!Snipcart) return;
    // open modal on snipcart event add item on cart
    Snipcart.events.on("item.adding", (_item) => {
      setItem(_item);
      toggleOpen(true);
    });
  }, []);

  return (
    <>
      <div
        ref={mask}
        className={`${open === true ? styles.show : ""} ${styles.mask}`}
      >
        <div className={styles.add__cart} role="alertdialog">
          <button className={styles.close} onClick={() => toggleOpen(false)}>
            <span>Close</span>
          </button>
          <div className={styles.confirm}>
            {item.name && (
              <span>
                <strong>
                  {item.quantity} {item.name}
                </strong>{" "}
                {"added to your cart"}
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
        style={{ height: 0, opacity: 0 }}
        className="snipcart-checkout"
      ></button>
    </>
  );
};

export default AddCartModal;
```

## Version

1.0.0 :

- Added possibility of use public key api Snipcart from plugin options or from environment variables
- Use SnipcartContext instead of SnipCartContext

  1.0.2

- Add provideDefaultCurrency options for multi-currency carts

  1.0.3

- Add useSideCart for open the cart in a side modal
- Add templateURL for use templates in an external file

## TODO

- Add validation on plugin options
