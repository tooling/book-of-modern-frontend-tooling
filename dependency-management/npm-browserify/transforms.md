# Transforms

The most powerful feature in Browserify are [source
transforms](https://github.com/substack/node-browserify#list-of-source-
transforms). A source transform is a stream injected between the resolved
module and the content that is returned. A simple use case for using a source
transform is compiling CoffeeScript to JavaScript. Using
[coffeeify](https://github.com/substack/coffeeify) there is no longer a need
for precompilation steps, it just works.

There are loads more transforms and you can easily write your own. Some
transforms I find myself using regularly are
[brfs](https://github.com/substack/brfs) (inlines file contents),
[hbsfy](https://github.com/epeli/node-hbsfy) (precompile Handlebars templates,
_better performance and smaller footprint_),
[uglifyify](https://github.com/hughsk/uglifyify) (uglify bundled modules with
UglifyJS2) and [envify](https://github.com/hughsk/envify) (use environment
variables within modules).

Many different transforms perform certain basic functionality, such as turning the contents of a stream into a string, or loading configuration from package.json. This package contains helper methods to perform these common tasks, so you don't have to write them over and over again:
[Browserify Transform Tools](https://www.npmjs.org/package/browserify-transform-tools)
