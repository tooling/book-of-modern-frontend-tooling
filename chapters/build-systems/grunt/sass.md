# Integrating a CSS Preprocessor

**CSS preprocessors** can compile CSS stylesheets from other (more powerful) styling languages. These new languages have features like variables, functions, mixins (to re-use code), etc. and they will change for the better the way you approach class naming an use.

The most popular CSS preprocessors are [Sass](http://sass-lang.com/) and [Less](http://lesscss.org/), and since both of them do their job really well, it's up to you to decide which one you like the most. This chapter will cover Sass examples, but the way to integrate Less in Grunt is similar.

Sass was originally a Ruby gem, although there are versions for other languages, like C or Node.js. Once installed[^install], you can compile a Sass stylesheet with:

```bash
$ sass main.sass main.css
```

[^install]: `gem install sass`

The good news is that you can integrate the compiling part into Grunt, so it's part of your regular workflow.

## Install the plugin

The recommended plugin for Sass is `grunt-contrib-sass`, and you can install it like any other Grunt plugin:

```bash
$ npm --save-dev grunt-contrib-sass
```

Don't forget to load the task in your `Gruntfile.js`:

```js
module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.initConfig({
    sass: {} // config goes here
  });
};
```

## Task targets

The plugin we are using is a bit special, since it *requires* you to create **targets** (or configurations) for it.

A target is just a name associated to a task configuration. Let's say that you want to have a Sass configuration for development (`dev`) different from the configuration for production (`prod`)[^names]. Once you define these two targets, you can run a task target with:

```
$ grunt sass:dev
```

[^names]: Note that these are arbitrary names.

When a task has multiple targets, if you omit the target name, then *all targets* will be executed. We will see examples of this use in other plugins.

The way you define targets, is by adding them as a key in the configuration object. For instance:

```js
grunt.initConfig({
  sass: {
    dev: {}, // config for target 'dev' here
    prod: {}
  }
});
```

## Source-destination file-matching

The `sass` task is different from the `jshint` task in the way the accept files. With the linter, you just needed to supply input files; but `sass` requires both *input* (source) and *output* (destination) files.

The easiest — but less powerful — way to supply these source-destination files is by using a *files Object*. See this example:

```js
sass: {
  dev: {
    files: {'styles/screen.css': ['sass/common.sass', 'sass/main.sass']}
  }
}
```

There, the destination is `screen.css`, whereas the source is a list of files (`common.sass` and `main.sass`).

If you have only a few sass files, this mapping is probably good enough. However, there is a way to have a **dynamic mapping**, in which the destination files are unknown. Here is an example:

```js
sass: {
  dev: {
    files: [{
      cwd: 'sass',
      dest: 'styles',
      src: ['*.{sass.scss}'],
      ext: '.css',
      expand: true
    }]
  }
}
```

The key here is the **`expand` flag**, since setting it to `true` enables dynamic mapping. The task will get the `src` files, located under the `cwd` directory, and copy them into `dest` with the same name but `ext` extension. So, if we have two files `sass/main.sass` and `sass/common.sass` we would have them compiled into `styles/main.css` and `styles/common.css`.

Also, note that we have **an array of Objects**, so you can specify more than one mapping rule set.

For more information about source-destination file mapping (you can do cool things, like filtering out files or custom renaming), read [Grunt's documentation](http://gruntjs.com/configuring-tasks#files).

## Configuration options

The **options** that you have available mimic what you can pass to Sass in the command line[^sass-docs]: the output style, whether to include or not line numbers, where is located the cache, etc.

Here is a common configuration for development:

```js
sass: {
  dev: {
    options: {
      style: 'expanded', // output style
      lineNumbers: true,
      sourcemap: true // generate Source Maps for the browser
    },
    files: {'css/main.css': ['sass/*.{sass,scss}']}
  }
}
```

[^sass-docs]: See [the plugin documentation](https://github.com/gruntjs/grunt-contrib-sass) for a full list.

## Avoid repetition with Grunt's template engine

It is very likely that you will need to process **the same** Sass files in both your development and distribution targets. You could repeat the `files` configuration like this:

```js
sass: {
  dev: {
    options: {style: 'expanded'},
    files: {'css/main.css': ['sass/*.{sass,scss}']}
  },
  prod: {
    options: {style: 'compressed'},
    files: {'css/main.css': ['sass/*.{sass,scss}']}
  }
}
```

A DRY[^dry] approach would be to take advantage of Grunt's **template engine**[^lo-dash]. Long story short: everything you include between `<%=` and `%>` in a string, will be processed as a template and — here's the cool part — you can use your tasks configuration properties as template variables, for instance: `<%= jshint.files %>`. 

[^lo-dash]: Powered by [Lo-Dash](http://lodash.com/docs#template)

This is an improved version of the previous example:

```js
sass: {
  dev: {
    options: {style: 'expanded'},
    files: {'css/main.css': ['sass/*.{sass,scss}']}
  },
  prod: {
    options: {style: 'compressed'},
    files: '<%= sass.dev.files %>'
  }
}
```

[^dry]: "Don't Repeat Yourself"
