const React = require('react');
const {useStore, SnipCartContext} = require('../store');

/**
 * @param props : {currency, version}
 */
const SnipCartProvider = props => {
  const [state, dispatch] = useStore();
  // add style/script and listen snipcart
  React.useEffect(() => {
    const {lang, locales} = props;
    const listenSnipCart = () => {
      document.addEventListener('snipcart.ready', () => {
        dispatch({type: 'setReady', payload: true});
        window.Snipcart.api.session.setLanguage(lang, locales);
      });
    };

    if (window.Snipcart !== undefined) {
      dispatch({type: 'setReady', payload: true});
      window.Snipcart.api.session.setLanguage(lang, locales);
    } else {
      listenSnipCart();
    }
  }, [props, dispatch]);

  return (
    <SnipCartContext.Provider value={state}>
      {props.children}
    </SnipCartContext.Provider>
  );
};

SnipCartProvider.defaultProps = {
  version: '3.0.12',
  locales: {},
  lang: 'en',
};

export default SnipCartProvider;
