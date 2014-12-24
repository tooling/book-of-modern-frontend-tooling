# Writing Modules

Using modules from npm is really useful, but we can also harness the power of Browserify when writing our own modules. This is a great way to structure our own application into a set of small, composable  pieces, each in their own file.

If you're familiar with and have used Node.js to build applications, chances are that you know how to write modules. All you have to do is write your JavaScript as you would but add in a little extra to define what should be exported from the module.

## Your first module

To see this in action, let's write a sample module. Create your main `app.js` file:

```js
var name = require('./name.js');
console.log(name.first());
```

Notice how we're using `require` just like we did when we required Underscore in the previous chapter, but this time it's pointing to a local file, `name.js`. We could also miss out the `.js` extension, and `require` will still be able to find the file. Let's take a look at `name.js`:

```js
exports.first = function() { return 'Jack'; };
```

Notice how the `first` function is attached to the `exports` object. This `exports` object is implicitly available to you, you don't have to create it. This object is the object that's returned when a module is required. Hence, when we require `name.js` and assign it to the `name` variable, that variable's value is set to the `exports` object, and hence we have the `first` function available to call.

If you generate the Browserify bundle file once more:

```sh
browserify app.js --output bundle.js
```

And run that in the browser, you'll see 'Jack' logged to the screen. Let's recap what just happened. We added the `first` property to the object that the module in `name.js` exports. Then, in `app.js`, we load in the module using `require`, storing the result to the `name` variable. This means that the `name` variable is set to be the object `name.js` exports, and consequently we have `name.first` available.

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

Now we don't have to call `name.first()` anymore, but simply `name()`, because the module now exports a single function, not an object with a `first` function. If you rerun Browserify, you'll see exactly the same result in the browser.

When you use `module.exports`, you are indicating to `require` that it should return the value of `module.exports`. When you use `exports` alone, and define properties on it, you're telling `require` to export the object `exports`. This means that the two code examples below are equivalent in behaviour:

```js
module.exports = {
    foo: 2
};
```

```js
exports.foo = 2;
```

In the first example, we export the value of `module.exports`, which is an object with one property, `foo`, set to `2`. In the second example, we add the `foo` property to the `exports` object, which we set to `2`. This object is then returned when we load this module.
