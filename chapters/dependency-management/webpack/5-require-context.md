# Require Context

The `context` with webpack refers to the base folder in which modules are resolved. The primary context can be changed through the `context` option in your `webpack.config.js`.

Contexts can be generated on the fly as well using `require.context()`. This will create a new require method that operates within the constraints specified for the context. A useful example is when you would like to require all or certain tests within your test suite:

```js
var requireTest = require.context('./tests', true, /_test\.js$/);
```

This will create a context with:

* `./tests` as its base,
* `true` to recusively search sub-directories,
* and a regular expression `/_test\.js$/` the file must pass to be include. In this case, the file must end with `'_test.js'`.

Now we can use this new require function to resolve our test file `./tests/bear_test.js`:

```js
var bearTest = requireTest('./bear_test.js');
```

Or more useful, retrieving a list of modules the context contains (`require.keys()`) to require all tests within the `./tests` folder that end with `_test.js`:

```js
var requireTest = require.context('./tests', true, /_test\.js$/);
requireTest.keys().forEach(requireTest);
```

Or setup to ignore certain tests:

```js
var requireTest = require.context('./tests', true, /_test\.js$/);
var ignoredTests = [
  './ignoreme_test.js'
];
requireTest.keys().filter(function(testName) {
  return ignoredTests.indexOf(testName) === -1;
}).forEach(requireTest);
```

The require context is a very useful feature when integrating with a framework with a built-in method of resolving pieces, such as with Ember resolvers.
