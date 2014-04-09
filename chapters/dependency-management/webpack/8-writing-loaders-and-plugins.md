# Writing Loaders & Plugins

## Creating a Loader

The loader in webpack is the primary way to transform modules as they are loaded. A loader is a function that gets passed the source of the module:

```js
module.exports = function(source) {
  // Transform the source and return it
  return source;
};
```

If transforming the source requires an asynchronous operation, use `this.callback` instead:

```js
module.exports = function(source) {
  // Transform the source and use this.callback
  this.callback(null, source);
};
```

This follows the Node.js convention where the first parameter of the callback is an error, or `null` if there wasn't an error.

The context of the loader function contains a bunch of useful APIs to enhance your loader. Such as `this.cacheable()` should generally be set as most module sources can be cached once transformed. This greatly speeds up the compile time upon subsequent bundles:

```js
module.exports = function(source) {
  // Only transform this module when it has changed
  this.cacheable();
  this.callback(null, source);
};
```

A lot of module types are able to include other files or have dependencies. Such as a CSS file is able to `@import` another or the Jade templating language is able to `include` another file. It is important to mark the dependencies that each module is able to include. This enables webpack to properly incrementally build and know when to invalidate the cache that module. This is done with the `this.addDependency()` API:

```js
// transformer is a completely made up library that transforms our modules
var transformer = require('transformer');

var path = require('path');
module.exports = function(source) {
  this.cacheable();

  // Transform the source of the module using our made up library
  var transformed = transformer(source);

  // Our made up library returns the compiled source and dependencies it requires:
  transformed.dependencies.forEach(function(dep) {
    this.addDependency(dep);
  }.bind(this));

  this.callback(null, transformed.source);
};
```

Each *kind* of module and library that converts the syntax into JavaScript will have its own method of compiling the source and determining the dependencies of the source. webpack only exposes a generic API to signify what is a dependency and what is not.

// TODO: Talk about `this.resolve()` here

## Creating a Plugin

Plugins are useful for extending the way webpack bundles modules.

// TODO: Write this

