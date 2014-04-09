# Requiring Modules

webpack is unique in that it will try and bundle all *potential* modules or files within the **context**. The context is a base folder of all your source files and webpack defaults the context to the current working directory (`process.cwd()` in Node.js).

Any file within the context will be considered a module and attempted to be bundled. It is recommended to separate the source files you intend on bundling into their own folder, for example `./src/` to better accommodate this behavior. The benefit of bundling all potential modules is it enables you to dynamically require modules.

Typically a module is resolved by using `require()` and supplying a relative path to the file from the context:

```js
var bear = require('./animals/bear.js');
```

With webpack, due to its potential module bundling behavior, you can also dynamically require modules:

```js
var animalType = 'bear';
var animal = require('./animals/' + animalType + '.js');
```

## Asynchronously Require Modules

Since everything is considered a module with webpack, you can end up bundling very large files. Having your entire application bundled into a single large file in which users must fully download to view the application isn't very ideal. Some portions of your application should be only downloaded as needed and webpack handles this by using the familiar AMD syntax:

```js
require(['./data/large.json'], function(large) {
  // When ./data/large.json has finished downloading,
  // we'll have access to it through the `large` variable
});
```

Specifying an array as the first parameter of `require()` will tell webpack to create a new **chunk** or bundle file to load those modules in a separate network request.

## Resolving Vendor Modules

Vendor modules, third party modules or modules being maintained outside of your application are placed into separate folders. By default webpack considers the folders `./node_modules` and `./web_modules` as vendor folders. **webpack will only bundle explicitly required modules from these folders and does not include these folder when bundling potential modules.**

To require a module from a vendor folder, omit the `./` prefix:

```js
var Animal = require('animals');
```

This will create a number of steps to resolve the `animals` module where the first step to successfully find a module will return:

1. Look in the `./node_modules/animals/` folder for a `main` key within the module's `package.json` file.
1. Look for a `./node_modules/animals/index.js` file.
1. Look in the `./web_modules/animals/` folder for a `main` key within the module's `package.json` file.
1. Look for a `./web_modules/animals/index.js` file.
1. Return an error indicating the module could not be resolved.

You can also specifically require a file from within a vendor module:

```js
var animalCSS = require('animals/dist/style.css');
```

Which will produce the following steps to resolve the module:

1. Look for the `./node_modules/animals/dist/style.css` file.
1. Look for the `./web_modules/animals/dist/style.css` file.
1. Return an error indicating the module could not be resolved.


You can customize the vendor folder and the order the should resolve in with the `resolve.modulesDirectories` configuration option. Such as `['bower_components', 'node_modules']` to look in the folder `bower_components` first and then into the `node_modules` folder.

> Note: This will not change how Node.js resolves modules. It only affects webpack and how it will resolve modules.

Use the same AMD syntax to load vendor modules asynchronously as well:

```js
require(['animals'], function(Animal) {
  var bear = new Animal('bear');
});
```
