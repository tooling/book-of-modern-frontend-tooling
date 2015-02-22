# Getting Started

## Installing Browserify

Browserify is installed globally through npm and gives you a command line tool for running Browserify and generating output files. Run the following command:

```bash
$ npm install --global browserify
```

You should now have access to the `browserify` command. Let's go ahead and use it in a basic example.

## Basic Browserify Usage

Say we're working on a project and we'd like to take advantage of [Underscore](http://underscorejs.org/), a utility belt library full of useful JavaScript functions. It's also available on npm, so the first step is to install it.

```bash
$ npm install --save underscore
```

The `--save` flag will add Underscore as a dependency to your `package.json` file.

Now we can write some client side JavaScript that will require Underscore, in `app.js`:

```js
var _ = require('underscore');
console.log(_.max([1,2,3,4,5]));
```

If you were to try to run this in a browser now it would fail, because there is no global `require` function available. Once we have our code, we need to run it through Browserify to generate a browser specific file that defines a `require` function and deals with the dependencies for us.

To generate a bundled JavaScript file, we need to pass Browserify the main file in our application. It will then recursively go through each file and its dependencies.

```bash
$ browserify app.js --outfile bundle.js
```

This instructs Browserify to start parsing at `app.js` and then output to `bundle.js`. Now we can add `bundle.js` to our HTML file:

```html
<!doctype html>
<html>
    <head>
        <title>Browserify Test 1</title>
        <script src="bundle.js"></script>
    </head>
    <body>
        ...
    </body>
</html>
```

And if you look in your console you should see the number '5' logged to your screen. It worked!
