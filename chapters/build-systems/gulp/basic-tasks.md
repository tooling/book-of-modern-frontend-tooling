# Basic Tasks

Once you have installed gulp, you can now begin writing the tasks that you would like to automate. These tasks could include (but are not limited to) concatenating files, compiling SASS, minifying JavaScript, or linting your code. In this section, we will identify some common development tasks and walkthrough how to automate them in gulp using pipes. These code examples should give you a solid enough understanding of how gulp works so that once you have completed this section you will be ready to write your own tasks from scratch.

## Concatenating Your Files

Concatenating files is an important performance improvement because it reduces the amount of HTTP requests your project is required to make to display your website or application.

### 1. Install Concat Plugin

```bash
$ npm install --save-dev gulp-concat
```

### 2. Include Concat Plugin

Now that your have installed our concat plugin locally, you need to include it in our gulpfile so that you can use it in our tasks.

```js
var concat = require('gulp-concat');
```

### 3. Create Concat Task

Now, concatenating is as simple as passing a .pipe(concat('filename')) in your tasks pipechain. Like so:

```js
gulp.task('concat', function(){
    gulp.src('src/js/*.js')         // Targets All JS Files In Our src/ Directory
        .pipe(concat('all.js'))     // Creates New all.js File With Code From Target Files
        .pipe(gulp.dest('dist'));   // Places The New File In Our dist/ Directory
});
```

> Reminder! The `.pipe()` is how you connect the smaller, single-purpose applications/libraries together. This collection of pipes is referred to as the _pipechain_.

This task looks for any changes that have been made to the .js files in the `src/js/` directory. It then takes all of those files and concatenates them into a new file named `all.js` and saves it into the `dist/` directory for use in production. To avoid confusion, it is also worth noting that the gulp.dest() parameter is relative to the gulpfile.js file.

## Linting Your Code

Linting can save you from spending a lot of time blindly debugging your code by notifying you if you have made simple mistakes as you work.

### 1. Install JSHint Plugin

```bash
$ npm install --save-dev gulp-jshint
```

### 2. Include JSHint Plugin

```js
var jshint = require('gulp-jshint');
```

### 3. Create Lint Task

In your gulpfile add the following code:

```js
gulp.task('lint', function(){
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
```

Now, when you run this task it will check for problems in your code and then send those along to the reporter that you have assigned which will output them in your command-line application. In this example, we have used the default reporter for the sake of simplicity.


## Minifying Your Code

Minifying your code is another performance improvement like concatenation except instead of reducing the amount of files, it reduces the size of your files. Using both together is a simple way to improve the efficiency and performance of your website or application.

### 1. Install Uglify Plugin

```bash
$ npm install --save-dev gulp-uglify
```

### 2. Include Uglify Plugin

Open your gulpfile.js and add the following code to the top.

```js
var uglify = require('gulp-uglify');
```

### 3. Create Minify Task

Now, we will write our minify task. Add the following code to your gulpfile.

```js
gulp.task('minify', function() {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
```

## CSS Preprocessing

Preprocessing your CSS is a valuable step in any front end development workflow. Let's take a look at how to create a task that will handle preprocessing as your edit your CSS.

### 1. Install Preprocessor Plugin

Identify the preprocessor that your project will be using (e.g. Sass, Less, Stylus, Myth) and then locate the correct plugin for gulp.

For instance, to install the gulp-sass plugin:

```bash
$ npm install --save-dev gulp-sass
```

### 2. Include Preprocessor Plugin

Now that you have installed the plugin, you need to include it at the top of your gulpfile. In this case we're using Sass, but this applies to any of the others as well.

```js
var sass = require('gulp-sass');
```

### 3. Create Preprocessing Task

```js
gulp.task('styles', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist'));
});
```

## Chaining Actions Together

The examples above are only performing a single action for the sake of simplicity, but you can actually chain many of those actions together into a single, more refined task. Gulp makes this incredibly easy.

For example, we have created both a concat and a minify task separately, but in most cases we will likely need to perform these actions within the same task. Let's take a look at an example of how this can be done inside of our scripts task that we created earlier.

```js
// Concat & Minify Scripts
gulp.task('scripts', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
```

Now our scripts task not only minifies our code but also concatenates our JS files as well. By adding a single line to our pipechain we are now able to perform two actions within the same task instead of creating two separate tasks dedicated to a single action.

## Watching Our Files & Creating A Default Task 

Once our tasks have been created, we will need to create a couple more tasks that handle watching our files for changes and determine which tasks will run by default.

Watching your files saves you time by keeping you from having to revisit your command-line every time to need to process something. It will listen for changes to your files and automatically run tasks as you continue to work. 

```js
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/scss/*.scss', ['styles']);
});
```

The default task is the task that runs when you input `gulp` in your command line tool without passing it a specific task name. This task simply references your other tasks including the watch task that you just created.

```js
gulp.task('default', ['scripts', 'styles', 'watch']);
```

As you expand your gulpfile it is wise to revisit both the watch and the default tasks to include new tasks as you create them.
