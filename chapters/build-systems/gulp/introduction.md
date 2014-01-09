# Introduction
Gulp is a _streaming_ build system that allows you to automate tedious development tasks.

## Why Another Build System?
Compared with other build systems, such as Grunt, gulp uses Node.js streams as a means to automate tasks, thereby removing the need to create intermediate files when transforming source files. In gulp, you would install plugins, that do one thing and do it well, and construct a 'pipeline' by connecting them to each other. Doing it in this manner, source files would be transformed by plugins, and output from one plugin would be an input to the next. This idea is similar to the concept of piplines in *nix systems. Some Node.js applications support pipelining as a feature. For example:

`browserify main.js | uglifyjs > bundle.js`

This can be intuitively translated into a gulp task. And if you can think in *nix pipelines, you will be able to easily construct gulp tasks.

Writing tasks in gulp requires you to use JavaScript (or a language that compiles to JavaScript) to set up the desirable build system. This code-over-configuration style allows the gulp user to be more flexible in setting up their tasks. The requirement placed on the user is knowing how to use Node.js streams and how they typically work.