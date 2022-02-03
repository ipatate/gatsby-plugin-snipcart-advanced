const React = require('react');
const {useStore, SnipcartContext} = require('../store');
const Snipcart = require("./Snipcart");
const SnipcartStyles = require("./SnipcartStyles");

/**
 * @param props : {currency, version}
 */
const SnipcartProvider = props => {
  const [state, dispatch] = useStore();
  const {defaultLang, locales} = props;
  const changeLanguage = lang => {
    const lng = locales[defaultLang] || {};
    window.Snipcart.api.session.setLanguage(lang, lng);
  };
  React.useEffect(() => {
    const listenSnipcart = () => {
      document.addEventListener('snipcart.ready', () => {
        dispatch({type: 'setReady', payload: true});
        changeLanguage(defaultLang);
      });
    };

    if (window.Snipcart !== undefined) {
      dispatch({type: 'setReady', payload: true});
      changeLanguage(defaultLang);
    } else {
      listenSnipcart();
    }
  }, [props, dispatch, defaultLang, locales]);

  // find public api key in options plugin or environment variable
  const publicApiKey = process.env.GATSBY_SNIPCART_API_KEY || props.publicApiKey;
  if (!publicApiKey) {
    console.log(`Error: Snipcart public API Key is not defined. Insert in plugin options the "publicApiKey" parameter or use GATSBY_SNIPCART_API_KEY in environment variable`);
  }

  // Use a default currency value by default. True if plugin option is undefined
  // or defined as true. False only if plugin option is defined as false.
  const provideDefaultCurrency =
    props.provideDefaultCurrency !== false ? true : false;

  return (
    <SnipcartContext.Provider value={{state, changeLanguage}}>
      {props.children}
      <Snipcart
        key="snipcart"
        publicApiKey={publicApiKey}
        innerHTML={props.innerHTML}
        // Only pass currency value if using default currency
        currency={provideDefaultCurrency ? props.currency : null}
        openCartOnAdd={props.openCartOnAdd}
        useSideCart={props.useSideCart}
        templatesUrl={props.templatesUrl}
      />
      <SnipcartStyles key="snipcart-style" version={props.version} />
      <script
        key="snipcart-script"
        defer
        rel="preload"
        as="script"
        src={`https://cdn.snipcart.com/themes/v${props.version}/default/snipcart.js`}
      ></script>
    </SnipcartContext.Provider>
  );
};

SnipcartProvider.defaultProps = {
  version: '3.0.15',
  locales: {},
  defaultLang: 'en',
};

export default SnipcartProvider;
