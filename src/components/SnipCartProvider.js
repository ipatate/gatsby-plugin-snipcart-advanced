const React = require('react');
const {useStore, SnipCartContext} = require('../store');

/**
 * @param props : {currency, version}
 */
const SnipCartProvider = props => {
  const [state, dispatch] = useStore();
  const {defaultLang, locales} = props;
  const changeLanguage = lang => {
    const lng = locales[defaultLang] || {};
    window.Snipcart.api.session.setLanguage(lang, lng);
  };
  React.useEffect(() => {
    const listenSnipCart = () => {
      document.addEventListener('snipcart.ready', () => {
        dispatch({type: 'setReady', payload: true});
        changeLanguage(defaultLang);
      });
    };

    if (window.Snipcart !== undefined) {
      dispatch({type: 'setReady', payload: true});
      changeLanguage(defaultLang);
    } else {
      listenSnipCart();
    }
  }, [props, dispatch, defaultLang, locales]);

  return (
    <SnipCartContext.Provider value={{state, changeLanguage}}>
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
