# Writing Tasks

Once you have installed gulp, you can now begin writing the tasks that you would like to automate. These tasks could include (but are not limited to) concatenating files, compiling SASS or Less, minifying JavaScript, or linting your code. In this section, we will identify some common development tasks and walkthrough how to write them in gulp. These code examples should give you a solid enough understanding of how gulp works so that once you have completed this section you will be ready to write your own tasks from scratch.

## Concatenate Files
Concatenating files is important because it reduces the amount of HTTP requests your project is required to make to display your application or website. Let's see how we can do this in gulp. First
### 1. Install Concat Plugin
```
npm install --save-dev gulp-concat
```

### 2. Include Concat Plugin
Now that we have installed our concat plugin locally, we need to include it in our gulpfile so that we may use it in our tasks.
```
var concat = require('gulp-concat');
```
Now, concatenating is as simple as passing a .pipe(concat('filename')) in your tasks pipechain.


## Adding A Linter
### 1. Install JSHint Plugin
```
npm install --save-dev gulp-jshint
```
### 2. Include JSHint Plugin
```
var jshint = require('gulp-jshint');
```
### 3. Create Lint Task
In your gulpfile add the following code:
```
gulp.task('lint', function(){
    gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default')); 
});
``` 
Now, when you run this task it will check for issues and then send those along to the reporter that you have assigned. In this case we have simply used the default reporter for the sake of simplicity.



## CSS Preprocessing
### 1. Install Preprocessor Plugin
Identify the preprocessor that your project will be using (e.g. Sass, Less, Stylus, Myth) and then locate the correct plugin for gulp.

For Sass:
```
npm install --save-dev gulp-sass
```
For Less:
```
npm install --save-dev gulp-less
```
For Stylus:
```
npm install --save-dev gulp-stylus
```
For Myth:
```
npm install --save-dev gulp-myth
```

### 2. Include Preprocessor Plugin
```
var sass = require('gulp-sass');
```

### 3. Create Preprocessing Task
```
gulp.task('styles', function() {
    gulp.src('./src/css/*.css')
        .pipe(myth())
        .pipe(gulp.dest('./dist'));
});
```


## Live Reload
This is a little more complicated and takes an additional step compared to the other tasks that we have setup. Although, it is still quite simple to do.

### 1. Install LiveReload Chrome Extension
First we need to be able to communicate to our browser to let it know when to reload our page. In this example, I will be using Chrome, as I imagine most developers will be. To install, head over to the Chrome Webstore and install [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei "LiveReload on Chrome Webstore").

### 2. Install Plugins
To get LiveReload working properly we need a couple plugins.

#### tiny-lr
```
npm install --save-dev tiny-lr
```

#### gulp-livereload
```
npm install --save-dev gulp-livereload
```

### 3. Include Plugins In gulpfile
```
var lr = require('tiny-lr');
var refresh = require('gulp-livereload')
var server = lr();
```

### 4. Add Live Reload To Tasks
Now, we need to make a few changes. First we need add an additional pipe to the tasks that we want to reload our browser. Second, we need to wrap our default task code with our LiveReload server and assign it a port to listen to.
```
// Compile & Concat Styles
gulp.task('styles', function() {
    gulp.src('./src/css/*.css')
        .pipe(concat('all.css'))
        .pipe(myth())
        .pipe(gulp.dest('./dist'))
        .pipe(refresh(server));
});

// Concat & Minify Scripts
gulp.task('scripts', function() {
    gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
        .pipe(refresh(server));
});

gulp.task('default', function() {
    server.listen(35729, function (err) {
        if (err) return console.log(err);

        gulp.run('styles', 'scripts');

        gulp.watch(['./src/css/*.css', './src/js/*.js', 'index.html'], function (e) {
            gulp.run('styles', 'scripts');
        });
    });
});
```