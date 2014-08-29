# Getting Started

## Installation of the client

Grunt is a Node.js tool, and you use `npm` to install it. There are two packages to install: `grunt-cli` and `grunt`.

First, you need to **install `grunt-cli` globally**. This will enable the use of the `grunt` command in the shell, so you can use Grunt in any project in your machine:

```bash
$ npm install -g grunt-cli
```

You can test it by running:

```bash
$ grunt --version
```

To add Grunt to your project, just **install `grunt` locally**. Remember to setup your project as a NPM package with `npm init` so you can have an initial `package.json` created.

```bash
$ npm init
$ npm install grunt --save-dev
```
The flag `--save-dev` will update your `package.json` to add Grunt as a development dependency. This is how it will look:

```json
{
  // ...
  "devDependencies": {
    "grunt": "~0.4.2"
  }
}
```


And that's enough `npm`! If you try to run `grunt` now, you will see an error message complaining about the lack of a `Gruntfile.js`… It's time to fix this.

## Your Gruntfile.js

By default, Grunt comes with no tasks and no configuration at all. It's up to you to add this to your project. You do that by **creating a `Gruntfile.js`** file (or `Gruntfile.coffee` for you coffeescripters).

Here's an example of a `Gruntfile.js` with a task that will print the version of our project (as stated in `package.json`):

```js
module.exports = function (grunt) {
    // create 'version' custom task
    grunt.registerTask('version', 'Shows version number', function () {
        var pkg = grunt.file.readJSON('package.json');
        grunt.log.writeln(pkg.name + ' version ' + pkg.version);
    });
};
```

You can now run this task with:

```bash
$ grunt version
```

## Grunt plugins

Grunt has been around for a while, and there are a lot of **[plugins](http://gruntjs.com/plugins) with pre-built tasks** that you can use out of the box with a minimal configuration. Some of these common tasks provided by plugins include: minifying, concatenating, linting, etc.

Grunt plugins are Node.js packages that you install with `npm` as usual. For example, to install the `grunt-contrib-jshint`[^jshint] plugin:

```bash
$ npm install --save-dev grunt-contrib-jshint
```

[^jshint]: JSHint is a JavaScript linter – a tool that analyses your code and spots syntax errors and bad practises and formatting.

In order to use a plugin, we need to load its tasks in the `Gruntfile.js`, and provide some configuration in it as well. Here's an example of a `Gruntfile.js` that makes use of the `grunt-contrib-jshint`[^contrib] plugin:

```js
module.exports = function (grunt) {
  // load plugin tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // tasks configuration
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js'], // files to run JSHint on
      options: { // options for JShint
        globals: {
          module: true // allow the use of 'module' global
        }
      }
    }
  });
};
```

[^contrib]: Plugins which package name start with `grunt-contrib` are plugins mantained by the Grunt project. You should favor these plugins (they are the most popular ones –that potentially means more bug reporting & fixing) over a non-contrib version.

You can execute the `jshint` task, and it will lint the `Gruntfile.js` itself, with the options that we have specified in the task configuration:

```bash
$ grunt jshint
```
