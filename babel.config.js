'use strict';

module.exports = {
  presets: [
    [
      // Latest stable ECMAScript features.
      '@babel/env',
      {
        // `false` (default) to indicate no polyfill
        // `'entry'` to indicate replacing the entry polyfill
        // `'usage'` to import only used polyfills per file
        useBuiltIns: false,
        // Do not transform modules to CJS.
        modules: false,
      },
    ],
    [
      '@babel/react',
      {
        // Toggles plugins that aid in development.
        development: false,
      },
    ],
  ],
  ignore: [
    (filename, context) =>
      /(core-js|(@babel(?:\/|\\{1,2})runtime))/.test(filename),
  ],
};
