# Getting Started

## Installing webpack

webpack runs on [Node.js](http://nodejs.org) and is required to be installed first. [npm](http://npmjs.org) is a part of Node.js and used to install modules and webpack itself.

To access to the `webpack` command line tool, type: `npm install webpack -g`. With webpack installed, you can now compile your assets by pointing webpack to your application's entry point and specifying an output file path: `webpack src/app.js dist/bundle.js`.

Typically you will want webpack saved along with your other dependencies into your local project. Within your project folder, create a `package.json` file. This is a manifest that describes your project and manages the dependencies your project requires. Type `npm init` to have npm generate a `package.json` based on a series of prompts. Now you can install webpack locally and save to your `package.json` with `npm install webpack --save-dev`. This way all dependencies, including webpack, of your project can be restored by simply typing `npm install` from your project folder.

## Create a Project

An example folder structure for a webpack based project could be as such after we have `npm init` and `npm install webpack --save-dev`:

```bash
├── package.json
├── node_modules
├── src
│   └── app.js
└── dist
    ├── bundle.js
    └── index.html
```

Your `package.json` is key to orchestrating your builds. Here is an example `package.json` for our application:

```json
{
  "name": "myapp",
  "version": "0.1.0",
  "scripts": {
    "start": "webpack src/app.js dist/bundle.js"
  },
  "devDependencies": {
    "webpack": "^1.0.0"
  }
}
```

Now as we type `npm start` it will run the command placed in the `start` section of our `scripts` block. npm will default to our locally installed `webpack` command line tool within the `node_modules/.bin` folder. This will compile the `src/app.js` into the `dist/bundle.js` file.

The `src/app.js` file is the main entry point to your application. From here, we include other modules or assets required by our project.

The `dist/` contains your distributable application. The `dist/bundle.js` file is created by webpack and is to be included by our `dist/index.html` file. In a typical webpack project, the main `index.html` is usually very simple like such:

```html
<!doctype html>
<html>
<head>
  <script src="bundle.js"></script>
</head>
  <body></body>
</html>
```

There is no need to add additional files into the `dist/` folder or add HTML tags for other scripts, styles and images. webpack will take care of all of that through the single `script` tag pointing to `bundle.js`.

In the `src/app.js`, type in `alert('Hello world!');`. Then in your terminal type `npm start` and then open the `dist/index.html` file in your web browser (`open dist/index.html`). You should see the text `Hello world!` pop open in an alert dialog and you have completed your first webpack application.

## Creating Assets

The power of webpack is through its ability to include assets that compose the final web application. Let's create and include another JavaScript file. Create the folder and file `src/js/alert.js`:

```bash
├── package.json
├── node_modules
├── src
│   ├── js
│   │   └── alert.js
│   └── app.js
└── dist
    ├── bundle.js
    └── index.html
```

We'll turn `src/js/alert.js` into a module by adding the contents:

```js
module.exports = function (what) {
  alert('Hello ' + what + '!');
};
```

`module.exports` signifies what part of this file we want to export as a module. In this case, we are exporting a JavaScript function.

Within our application entry point `src/app.js` we can use this module with:

```js
var yell = require('./js/alert.js');
yell('world');
```

`require` is used to consume other modules within our application. We are prefixing the path with `./` to start looking from the current folder `app.js` resides in, `src/`, then including the `js/alert.js` file. `require` will return the part of the module that has been exported, in our case here the function within `src/js/alert.js`.

We are assigning that function to the variable named `yell` and calling the function by passing the argument `'world'`.

Typing `npm start` and opening `dist/index.html` in your web browser should open a dialog that says `Hello world!`.

### Stylesheets

In order to include assets other than JavaScript modules, we will need to use loaders. Loaders are prefixes in our `require()` statements that instruct webpack to transform the asset into a module.

For stylesheets we will use two loaders: one to turn CSS into a module and one to apply the modularized CSS to the web page. Loaders are available on npm and these two can be installed and saved to the `package.json` with: `npm install css-loader style-loader --save-dev`.

Next create a folder and file `src/css/style.css` and add some basic CSS rules:

```css
body {
  background-color: #ddd;
}
```

Then in your application entry point `src/app.js`, require the stylesheet prefixing the loaders in the desired order:

```js
require('style!css!./css/style.css');
```

This statement will read the `src/css/style.css` file, transform it into a module webpack can read using the `css-loader`, and then apply it to the web page using the `style-loader`.

## Configuring webpack

As the application grows, you may want to configure webpack to handle certain things automatically. This can be done with a `webpack.config.js` file:

```bash
├── package.json
├── webpack.config.js
├── node_modules
├── src
│   ├── js
│   │   └── alert.js
│   ├── css
│   │   └── style.css
│   └── app.js
└── dist
    ├── bundle.js
    └── index.html
```

The `webpack.config.js` file is just like any other node module where you export the configuration for webpack to use. Here is an example `webpack.config.js` that specifies our entry file, output path and file and instructs webpack to always use the `css` and `style` loaders for any file that ends with `.css`:

```js
module.exports = {
  entry: './src/app.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' }
    ]
  }
};
```

Now we can update our `package.json` script to just call `webpack` as our entry and output paths are in our config:

```json
"scripts": {
  "start": "webpack"
}
```

Then update our application entry point `src/app.js` to require our stylesheet without needing to prefix loaders:

```js
require('./css/style.css');
```

Running `npm start` and opening the `dist/index.html` file in your web browser should render the same results.

## Consuming Third Party Modules

Capitalizing on the work created and maintained by others can greatly accelerate your web application. Unfortunately that work is dispersed across multiple package managers or often only available as a manual file downloads. webpack rolls with the punches enabling consumption of third party modules seamlessly across multiple sources.

By default, webpack is configured to resolve modules installed by npm within the `node_modules` folder. As well an agnostic folder named `web_modules`.

With npm, let's install and load a module. [hash-change](https://www.npmjs.org/package/hash-change) is a simple module that notifies us when the hash in the URL has changed. Install it into the `node_modules` folder by typing: `npm install hash-change`. Then add the following to your `src/app.js`:

```js
var yell = require('./js/alert.js');
require('hash-change').on('change', function(hash) {
  yell(hash);
});
```

Calling `require('modulename')` without prepending `./` to the module name will attempt to load the module from one of the third party module folders, `node_modules` or `web_modules`. In the above case, `require('hash-change')` will resolve to the `node_modules/hash-change/index.js` file.

Run `npm start` and open `dist/index.html`. Then add `#world` to the end of the URL. This will trigger the hash-change `change` event calling our own module with the value of the hash and display `Hello world!`.

If a library is not available to a package manager, you can simply download and extract the library into the `web_modules/libraryname/` folder. Then load that library with `require('libraryname/filename.js');` resolving to the file `web_modules/libraryname/filename.js`.

The third party module directories are completely customizable. You can use npm, Bower, JamJS, Component, Volo or any combination of the lot. In our `webpack.config.js`, let's add the `resolve.modulesDirectories` config option to make our app first search the `node_modules` folder, then `bower_components` (the default install location for Bower) and finally our agnostic `web_modules` folder, in that order.

```js
module.exports = {
  entry: './src/app.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components', 'web_modules']
  }
};
```
