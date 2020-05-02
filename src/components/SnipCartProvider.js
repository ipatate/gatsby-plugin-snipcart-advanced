const React = require('react');
const {useStore, SnipCartContext} = require('../store');

/**
 * @param props : {currency, version}
 */
const SnipCartProvider = props => {
  const [state, dispatch] = useStore();
  // add style/script and listen snipcart
  React.useEffect(() => {
    const {defaultLang, locales} = props;
    const listenSnipCart = () => {
      document.addEventListener('snipcart.ready', () => {
        dispatch({type: 'setReady', payload: true});
        const lng = locales[defaultLang] || {};
        window.Snipcart.api.session.setLanguage(defaultLang, lng);
      });
    };

    if (window.Snipcart !== undefined) {
      dispatch({type: 'setReady', payload: true});
      const lng = locales[defaultLang] || {};
      window.Snipcart.api.session.setLanguage(defaultLang, lng);
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
  defaultLang: 'en',
};

export default SnipCartProvider;
