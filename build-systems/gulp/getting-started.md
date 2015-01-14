# Getting Started

## Installing gulp

First, we must install gulp globally so that we can access `gulp` from the command-line.

```bash
$ npm install -g gulp
```

Next, let's navigate to our project directory and we will install gulp locally and add it to our list of devDependencies. This allows our gulpfile, containing the build tasks, to access it.

```bash
$ npm install --save-dev gulp
```

## Creating Your Gulpfile
Once gulp is installed, we need to create a file in your projects root directory and name it `gulpfile.js`. A gulpfile is the set of instructions that gulp will use to automate the tasks that you have set for your project. This file is where we will be doing all of our work and setting up our development tasks.

## Running Gulp
Now that you have gulp installed and your `gulpfile.js` has been created. All that is left to do is simply run the gulp command in your command-line application. Type in the following line, and press enter.

```bash
$ gulp
```

Now, you should see a few lines of feedback from gulp notifying you of what is happening. This could be the tasks you're running or it could be an error. If you have recieved an error, just jump back into your gulpfile and make sure that you didn't make a typo somewhere. 

If you are using the .watch() method in your gulpfile, then gulp will continue to run until you explicitly tell it to stop. This may be confusing to beginners, especially if you are expecting to go back to your command-line and start firing off new commands. To stop gulp at any time, simply press `CTRL+C` and it will stop the execution and allow you to begin writing new commands.

## Extending Gulp
Plugins are a huge component to build systems and they allow you to perform additional actions in your tasks. This will introduce you to the process of finding and installing plugins so that you are comfortable when the time comes to add more functionality to your gulp tasks.

### Finding A Plugin
We can search for plugins using the official gulp plugin search tool or we can search by keyword using the npm package search.

- [Official gulp Search Tool](http://gratimax.github.io/search-gulp-plugins/)
- [gulpplugin on npm](https://npmjs.org/browse/keyword/gulpplugin)
- [gulpfriendly on npm](https://npmjs.org/browse/keyword/gulpfriendly)

> Note: The __gulpfriendly__ keyword is assigned to plugins that do not accept streams of file objects but still work nicely in the gulp ecosystem.

### Installing A Plugin
Installing a gulp plugin requires the same simple process we used when installing gulp. Once you have found the plugin that you would like to use, simply take note of its name and return to your command line to install it via npm. As a quick example, let's install gulp-concat. Open your command-line application and then run the following command:

```bash
$ npm install gulp-concat
```

It's that simple. You can pass any of the npm flags such as `--save` and `--save-dev` along with it if you would like to add that plugin to your package.json file as a dependency. 

That's all there is to it! Let's start writing tasks.

