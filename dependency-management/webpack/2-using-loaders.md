# Using Loaders

The power of webpack comes from its ability to load anything as a module. This is done through loaders.

If you try to `require()` a CSS file by default webpack will make no assumptions and consider it a JavaScript module. The CSS file needs to be first translated into a JavaScript module and then can be loaded.

Using npm, install the CSS loader with: `npm install css-loader --save-dev`

Then as you require the file, prefix the loader to perform the transformation separated by a `'!'` character:

```js
var css = require('css!./css/style.css');
```

This will transform the CSS into a string and return that string. The useful part of this is the css-loader will treat `@import` and `url()` calls within the CSS just like `require()` statements. Thus making your CSS as modular as the rest of your application.

> Note: By convention if a loader name ends with `-loader` that suffix can be dropped when being used. `require('css-loader!./css/style.css')` will work just the same as `require('css!./css/style.css')`.

## Chaining Loaders

Having your CSS as a raw string most of time isn't that useful. We likely would prefer to apply that CSS to the page and there is a loader for that: `npm install style-loader --save-dev`.

Now you just need to chain the loaders in the order you would like the transformation to occur:

```js
require('style!css!./css/style.css');
```

Which will first transform the file into resolved CSS and then apply that CSS to the page as if you included it in a `<link>` tag.

## Passing Options to Loaders

Some loaders have options that can be passed to them. Such as with the exports-loader, a loader for exporting a specific variable from within the module. For example if we have a module that does not use `module.exports` but rather just defines a global variable:

```js
var Animal = (function() {
  return function(type) {
    console.log('I am a ' + type);
  }
}());
```

You can resolve this module by specifying which variable should be exported by passing an option to the exports loader using the `'?'` separator:

```js
var Animal = require('exports?Animal!animals/dist/animals.js');
```

Which will effectively add `module.exports = Animal;` to the module's source when bundling.

## Configure Loaders by File Type

Prefixing all your modules with a loader might be taxing where in a lot of instances you want a specific loader chain to always be applied depending on the file extension. This can be done with the `module.loaders` config array:

In your `webpack.config.js`:

``` javascript
module.exports = {
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' }
    ]
  }
};
```

Now any module that ends with `.css` that is resolved will automatically have the CSS and style loader applied. Which shortens our previous call to apply CSS to our page to:

``` javascript
require('./css/style.css');
```

## Common Useful Loaders

Here is a list of loaders you will likely encounter often and some explanation on their usage:

### [url-loader](https://github.com/webpack/url-loader)

Loads the module either by base64 encoding as a string or via a separate network request. Configurable by setting the `limit` option.

### [file-loader](https://github.com/webpack/file-loader)

### [css-loader](https://github.com/webpack/css-loader)

### [style-loader](https://github.com/webpack/style-loader)

### [script-loader](https://github.com/webpack/script-loader)

### [exports-loader](https://github.com/webpack/exports-loader)

### [imports-loader](https://github.com/webpack/imports-loader)

### [raw-loader](https://github.com/webpack/raw-loader)

### [expose-loader](https://github.com/webpack/expose-loader)

// TODO: Using plugins section?
