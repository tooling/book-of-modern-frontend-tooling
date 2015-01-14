# Multi Entry Builds

Multiple entry points can be useful if your application has multiple ways it can be entered but share a common source tree. Such as if creating an optimized and separate build for mobile devices or builds specific for users of a certain language.

Multiple entry points are specified by supplying an array or object to the `entry` configuration option in your `webpack.config.js`:

```js
module.exports = {
  entry: {
    desktop: './src/desktop.js',
    mobile: './src/mobile.js'
  },
  output: {
    path: './dist',
    filename: '[name].bundle.js',
    chunkFilename: '[id].common.js'
  }
};
```

This will create two separate builds within the `./dist` folder named: `./dist/desktop.bundle.js` and `./dist/mobile.bundle.js` respectively. Any common parts of the application that are loaded asynchronously will be bundled to `./dist/1.common.js` (with the number increasing as the number of chunks increases). Each of the entry points of the build will share this code and only load each chunk as needed.

## Creating Hashed Builds

webpack includes another directive `'[hash]'` to generate a hash name based upon your build. This is useful in conjunction with setting a long expiration time as the file is served, such as 1 year. Consumers of your app will hopefully cache your application and quickly reload from their local copy upon subsequent visits. Then when your build has changed and a new hash is generated, consumers be given the new file and the latest version of your application.

```js
module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
    filename: '[hash].js'
  }
};
```

Will generate the a file named similar to: `./dist/47a0cc1b840cb310842cb85fb5b6116c.js` upon bundling.

// TODO: Talk about the `recordsPath` configuration option.
