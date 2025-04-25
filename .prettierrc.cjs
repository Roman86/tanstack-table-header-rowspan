module.exports = {
  plugins: [
    // relative paths are usually required so Prettier can find the plugin
    'prettier-plugin-multiline-arrays',
  ],
  printWidth: 100,
  trailingComma: 'all',
  semi: true,
  bracketSpacing: true,
  singleQuote: true,
  useTabs: false,
  tabWidth: 2,
  endOfLine: 'lf',
  multilineArraysWrapThreshold: 1,
  // overrides: [
  //   {
  //     files: "*.json",
  //     options: {
  //       tabWidth: 2
  //     }
  //   }
  // ]
};
