const React = require('react');
const SnipCartProvider = require('./components/SnipCartProvider').default;

/**
 * wrapp app with provider for dispatch cart and customer infos
 */
exports.wrapRootElement = ({element}, pluginOptions = {}) => {
  const _options = {
    ...{
      version: '3.0.12',
      locales: {},
      defaultLang: 'en',
    },
    ...pluginOptions,
  };
  return <SnipCartProvider {..._options}>{element}</SnipCartProvider>;
};
