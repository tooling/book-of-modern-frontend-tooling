# Getting started

## Installation of the client

Grunt is a Node.js tool, and you use `npm` to install it. There are two packages to install: `grunt-cli` and `grunt`.

First, you need to **install `grunt-cli` globally**. This will enable the use of the `grunt` command in the shell, so you can use Grunt in any project in your machine:

```bash
npm install -g grunt-cli
```

You can test it by running:

```bash
grunt --version
```

To add Grunt to your project, just **install `grunt` locally**. Remember to add the flag `--save-dev` so the package is added to your `package.json` as a development dependency:

```bash
npm install grunt --save-dev
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
grunt version
```

## Grunt plugins

Grunt has been aroun for a while, and there are a lot of **plugins with pre-built tasks** that you can use out of the box with a minimal configuration. Some of these common tasks provided by plugins include: run linters, compile Sass stylesheets, zip files, etc.

Grunt plugins are Node.js package that you install with `npm` as usual. For example, to install the `grunt-contrib-jshint`[^jshint] plugin:

```bash
npm install grunt-contrib-jshint --save-dev
```

[^jshint]: JSHint is a JavaScript linter –a tool that analyses your code and spots syntax errors and bad practises and formatting.

In order to use a plugin, we need to load its tasks in the `Gruntfile.js`, and provide some configuration in it as well. Here's an example of a `Gruntfile.js` that makes use of the `grunt-contrib-jshint` plugin:

```js
module.exports = function (grunt) {
  // load plugin tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // tasks configuration
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js'], // files to run jshint on
      options: { // options for JShint
        globals: {
          module: true // allow the use of 'module' global
        }
      }
    }
  });
};
```

You can execute the `jshint` task, and it will lint the `Gruntfile.js` itself, with the options that we have specified in the task configuration:

```bash
grunt jshint
```
