# Linting Code

**Adding a linter** to your project is a wise decision. A linter is a tool that analyses your code and looks for syntax errors, bad practises and badly formatted code.

A popular JavaScript linter is [JSHint](http://www.jshint.com/), which you can try online. JSHint provides a sensible default ruleset, but you can customise it to suit your needs.

## Install the plugin

As with most front-end common tasks, there is a plugin for JSHint, [`grunt-contrib-jshint`](https://github.com/gruntjs/grunt-contrib-jshint). You need to install it via `npm` and then load the task in the `Gruntfile.js`:

```bash
$ npm install grunt-contrib-jshint
```

```js
module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    jshint: {} // config happens here
  });
};
```

Now on to scanning the code!

## Simple file-matching

Configuration is very similar for every Grunt task / plugin. You usually need to **supply some files** that will be passed as input, plus some configuration options.

In the `jshint` task that you imported, the files supplied as input will be the files the linter will scan. There are different ways to supply these files, and we will see some of them through this Grunt chapter.

The most simple way to supply input files, is by setting an array of filenames in a `files` key:

```js
grunt.initConfig({
  jshint: {
    files: ['Gruntfile.js']
  }
});
```

If you run the `jshint` task now, you will see that the linter will scan one file:

```bash
$ grunt jshint
```

If you want to see more output in the tasks you run, you can add the `--verbose` flag: 

```bash
$ grunt jshint --verbose
```

If you try that, you will see which files exactly were scanned (in this case `Gruntfile.js`).

## File-matching with globbing

On the inside, Grunt makes use of [minimatch](https://github.com/isaacs/minimatch) to match filenames. This is a nice library that allow the use of **globbing** to refer to multiple files, and it will make your life easier. You could have, for instance:

```js
files: ['Gruntfile.js', 'app/*.js']
```

And that would make JSHint to scan `Gruntfile.js` *and* all the files with `.js` extension that are immediately under the `app` directory.

Note that this will match `app/main.js`, but *not* `app/models/user.js`, since `user.js` is not directly under `app`, but in a subdirectory. If you want to use recursive matching, make use of **globstar** (`**`):

```js
files: ['Gruntfile.js', 'app/**/*.js']
```

## Configuration options

Besides files, you usually supply **some configuration options** to the task. These depend on the task itself, so you will have to read the plugin's documentation to see what is available to you.

The JSHint plugin for Grunt allows us to configure some of the rules that will be applied[^rules]. For instance, if you want to enforce the use of [Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode) in your code, you need to set the `strict` option to `true`:

```js
grunt.initConfig({
  jshint: {
    files: ['Gruntfile.js'],
    options: {
      strict: true
    }
  }
});
```

A common practice in projects which use JSHint is to have the rules defined in a `.jshintrc` file so the same configuration can be shared across text editors, continuous integration systems, etc.

If you want to use this feature, just create a `.jshintrc` JSON file with your rules inside and then set the option `jshintrc` to `true`:

```js
grunt.initConfig({
  jshint: {
    files: ['Gruntfile.js'],
    options: {
      jshintrc: true
    }
  }
});
```

Here's a sample `.jshintrc` you can try:

```json
{
  "strict": true
}
```

[^rules]: You can see all the rules available at [JSHint's documentation](http://www.jshint.com/docs/options/).

[^browser-rule]: This rule will allow the use of global variables available in browsers, like `document` or `FileReader`.

