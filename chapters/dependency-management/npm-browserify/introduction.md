# npm and Browserify

Browserify is a fantastic tool which allows you to use Node's module system in your client side code. This means that you can take advantage of the wide variety of modules on npm and use it to manage your dependencies, installing modules just like you would in any Node.js application and letting Browserify do the rest.

Browserify works by parsing your code looking for `require` calls to build a graph of dependencies for your application. It then generates one JavaScript file containing all your code, with all the dependency management taken care of. You can then include that file into your HTML and have it run in the browser.
