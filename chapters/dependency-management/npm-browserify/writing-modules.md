# Writing Modules

Using modules from npm is all well and good, but we can also harness the power of Browserify when writing our own modules. This is a great way to structure our own application into a set of small, reusable pieces, each in their own file.

If you're familiar with and have used Node.js to build applications, you already know how to write modules. All you have to do is write your JavaScript normally but add in a little extra to define what should be exported from the module.

## Your first module

To see this in action, let's write a sample module. Create your main `app.js` file:

```js
var name = require('./name.js');
console.log(name.first());
```

Notice how we're using `require` just like we did when we required Underscore in the previous chapter, but this time it's pointing to a local file, `name.js`. Let's take a look at `name.js`:

```js
exports.first = function() { return 'Jack'; };
```

Notice how the `first` function is attached to the `exports` object. This `exports` object is implicitly available to you, you don't have to create it. This object is the object that's returned when a module is required. Hence, when we require `name.js` and assign it to the `name` variable, that variable's value is set to the `exports` object, and hence we have the `first` function available to call.

If you generate the Browserify bundle file once more:

```sh
browserify app.js --output bundle.js
```

And run that in the browser, you'll see 'Jack' logged to the screen.

## `module.exports`

There's also a second way to export from a module, by setting `module.exports`. This is typically used when your module is going to export one thing, either an object or often a function. Let's rewrite `name.js` so it just exports the `first` function:

```js
module.exports = function() {
    return 'Jack';
};
```

Now this module won't return an object, but a single function, which when called will return us 'Jack'. Now we need to update `app.js` to take this into account:

```js
var name = require('./name.js');
console.log(name());
```

Now we don't have to call `name.first()` anymore, but simply `name()`, because the Name module now exports a single function, not an object with a `first` function as before. If you rerun Browserify, you'll see exactly the same result in the browser.
