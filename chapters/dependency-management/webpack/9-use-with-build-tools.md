# Use with Build Tools

The following is instructions on how to integrate webpack with common build tools.

## Using with a Node.js script

webpack at its core is a Node.js library and exposes an API to bundle programmatically. To add bundling to your Node.js program first install webpack with `npm install webpack --save-dev`. Then create a script with the following contents:

```js
// require the webpack Node.js library
var webpack = require('webpack');

webpack({
  // The first argument is your webpack config
  entry: './src/entry.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  }
}, function(err, stats) {
  // The second argument is a callback function that returns
  // more information about your bundle when it is complete
});
```

To actively watch files and compile when a file changes, use the `watch` method:

```js
var webpack = require('webpack');

// Create an instance of the compiler
var compiler = webpack({ /* webpack config */ });

// Run the compiler manually
compiler.run(function(err, stats) { });

// Start watching files and upon change call the callback
compiler.watch(/* watchDelay */ 200, function(err, stats) { });
```

## Using with Grunt

// TODO: Write this

## Using with gulp

// TODO: Write this, basically the same as Node.js
