// config-overrides.js
const path = require('path');

module.exports = function override(config, env) {
  config.resolve = {
    ...config.resolve,
    fallback: {
      "https": require.resolve("https-browserify"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert/"),
      "url": require.resolve("url/")
    }
  };

  return config;
};
