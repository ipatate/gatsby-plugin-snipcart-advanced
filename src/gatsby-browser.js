const React = require('react');
const SnipcartProvider = require('./components/SnipcartProvider').default;

/**
 * wrapp app with provider for dispatch cart and customer infos
 */
exports.wrapRootElement = ({element}, pluginOptions = {}) => {
  const _options = {
    ...{
      version: '3.0.15',
      locales: {},
      defaultLang: 'en',
    },
    ...pluginOptions,
  };
  return <SnipcartProvider {..._options}>{element}</SnipcartProvider>;
};
