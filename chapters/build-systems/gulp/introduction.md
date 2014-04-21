# Gulp

Gulp is a _streaming_ build system that allows you to automate tedious development tasks.

## What are Streams?
Streams are designed to perform complex operations when constructed as a sequence of smaller, single purpose applications. These applications would connect from one end-point to a starting-point of another, allowing passage of data to be modified or analyzed at each application. This connection of applications is a concept referred to as piping, and the collection of pipes as a whole is referred to as the pipechain.

If you would like to learn more about streams, take a look at the following resources:
- [Stream Handbook on Github](https://github.com/substack/stream-handbook "Stream Handbook on Github")
- [Video: Harnessing The Awesome Power Of Streams - LXJS 2012](http://www.youtube.com/watch?v=lQAV3bPOYHo "Video: Harnessing The Awesome Power Of Streams - LXJS 2012")
- [Video: AT&T Archives: The UNIX Operating System](http://youtu.be/tc4ROCJYbm0?t=5m32s "Video: AT&T Archives: The UNIX Operating System")

## Why Another Build System?
Compared with other build systems, such as Grunt, gulp uses Node.js streams as a means to automate tasks, thereby removing the need to create intermediate files when transforming source files. In gulp, you would install plugins, that do one thing and do it well, and construct a 'pipeline' by connecting them to each other. Doing it in this manner, source files would be transformed by plugins, and output from one plugin would be an input to the next. This idea is similar to the concept of pipelines in *nix systems. Some Node.js applications support pipelining as a feature. For example:

`browserify main.js | uglifyjs > bundle.js`

This can be intuitively translated into a gulp task. And if you can think in *nix pipelines, you will be able to easily construct gulp tasks.

Writing tasks in gulp requires you to use JavaScript (or a language that compiles to JavaScript) to set up the desirable build system. This code-over-configuration style allows the gulp user to be more flexible in setting up their tasks. The requirement placed on the user is knowing how to use Node.js streams and how they typically work.
