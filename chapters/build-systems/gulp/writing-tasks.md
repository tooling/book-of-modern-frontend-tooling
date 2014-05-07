# Writing Tasks
Once you have installed gulp, you can now begin writing the tasks that you would like to automate. These tasks could include (but are not limited to) concatenating files, compiling SASS, minifying JavaScript, or linting your code. In this section, we will identify some common development tasks and walkthrough how to automate them in gulp using pipes. These code examples should give you a solid enough understanding of how gulp works so that once you have completed this section you will be ready to write your own tasks from scratch.

## Concatenating Your Files
Concatenating files is an important performance improvement because it reduces the amount of HTTP requests your project is required to make to display your website or application.
### 1. Install Concat Plugin

```bash
$ npm install --save-dev gulp-concat
```

### 2. Include Concat Plugin
Now that we have installed our concat plugin locally, we need to include it in our gulpfile so that we may use it in our tasks.

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
> Reminder! The `.pipe()` is how we connect our smaller, single-purpose applications/libraries together. This collection of pipes is referred to as the _pipechain_.

This task looks for any changes that have been made to our .js files in our `src/js/` directory. It then takes all of those files and concatenates them into a new file named `all.js` and saves it into our compiled `dist/` directory for use in production. To avoid confusion, it is also worth noting that our gulp.dest() parameter is relative to our gulpfile.js.

## Linting Your Code
Linting can save you from spending a lot of time blindly debugging your code by notifying you if you have made simple mistakes as you work on and save your files.
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
    gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
```
Now, when you run this task it will check for problems in your code and then send those along to the reporter that you have assigned which will output them in your command-line application. In this case we have used the default reporter for the sake of simplicity.


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
### 1. Install Preprocessor Plugin
Identify the preprocessor that your project will be using (e.g. Sass, Less, Stylus, Myth) and then locate the correct plugin for gulp.

For instance, to install the gulp-sass plugin:
```bash
$ npm install --save-dev gulp-sass
```

### 2. Include Preprocessor Plugin
Now that we have installed the proper plugin, we need to include it at the top of our gulpfile. In our case we're using Sass, but this applies to any of the others as well.
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

## Running a Server
During development it is also valuable to have a quick way to spin up a server for our projects without having to worry about setting up software like Apache or nginx. This task will set up a simple web server using the node connect module.

### 1. Install Plugins
As mentioned above, let's install the 'connect' module to our local project and add it to our devDependencies in our package.json file:
```bash
$ npm install --save-dev connect
```

### 2. Include Plugin In gulpfile
As before with the other plugins, let's assign our plugin to a variable so that we can access and reference it in our tasks.
```js
var connect = require('connect');
```

### 3. Create Server Task
Now, let's create a basic server task that will create a web server serving static files from our project directory.
```js
gulp.task('server', function() {
    var server = connect();
    server.use(connect.static(__dirname)); // Serves Static Files
    http.createServer(server)
        .listen(8080)
        .on('listening', function() {
            console.log('Connect web server running at http://localhost/8080.');
    });
});
```
In this task we reference the connect module by creating the 'server' variable and then we append a .use method that allows us to add features (referred to as Middleware) to our connect server. The 'connect.static(__dirname)' tells connect to serve static files from our base project directory. 

If you would like to expand your connect server, be sure to take a look at all of the connect middleware. There are plenty of great packages to enhance your server.

## LiveReload
LiveReload is another great way to save time during development. It allows our files to communicate with our browser as we make changes to our files, so the changes are immediately reflected in the browser without having to refresh the page.

###1. Install LiveReload
Let's install the 'gulp-livereload' plugin to our local project and add it to our devDependencies in our package.json file:
```bash
$ npm install --save-dev gulp-livereload
```

### 2. Include LiveReload In gulpfile
As before with the other plugins, let's assign our plugin to a variable so that we can access it.
```js
var livereload = require('gulp-livereload');
```

###3. Add LiveReload To Your Tasks
Next, you need to add LiveReload to the your tasks pipechains. This will spawn a LiveReload server and also instruct gulp to contact our browser anytime those tasks are run.
```js
// Compile/Process Styles
gulp.task('styles', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist'))
        .pipe(livereload()); // Just Add This To Your Pipechain
});
```

###2. Add LiveReload Script To Your Page
LiveReload works by creating a small server and hosting a livereload.js file that is used to communicate changes to the browser. Now we need add a reference to the livereload.js file on our pages so that our browser can properly communicate with the LiveReload server that our connect task created. There are multiple ways of doing this and it's really up to your personal preference. Let's go over a couple options and you can decide which is best for you.

#### Manual
If you wish to manually add the LiveReload script, then open up your HTML file and simply include it just as you would any other script.
```html
<body>
    ...
    <script src="http://localhost:35729/livereload.js"></script>
</body>
```
Keep in mind that with this method you will have to manually include this on every page that you wish to reload automatically. In some cases that wont be much of a problem, but it is good to keep in mind if you expect your application to grow quickly, as it will be harder to maintain over time.

#### Browser Extension
If you prefer to avoid manually adding the script in yourself, you can download a simple browser extension that will add the script for you automatically.

In this example I will be using Chrome, but there are also extensions available for Firefox and Safari. To install, head over to the Chrome Webstore and install the [LiveReload extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei "LiveReload on Chrome Webstore"). Once you have it installed it will create a small icon that will allow you to enable or disable it quickly. Once you have ran your gulpfile and navigated to your project in your browser, you simply click the new icon it has created for you and the small dot inside 

That's really all there is to it. For more information on the LiveReload browser extensions, visit the [LiveReload knowledgebase](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions- "Browser Extensions on the LiveReload Knowledgebase").

## Chaining Actions Together
The examples above are only performing a single action for the sake of simplicity, but you can actually chain many of those actions together into a single, more refined task. Gulp makes this incredibly easy.

For example, we have created both a concat and a minify task separately, but in most cases we would likely need to perform these actions within the same task. Let's take a look at an example of how this can be done inside of our scripts task that we created earlier.
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

## Creating A Default Task & Watching Our Files
The default task is the task that runs when you input `gulp` in your command line tool without passing it a specific task name. This will reference the other tasks that we have created including a new __watch__ task that will check for changes to our files and run our tasks each time we save them.
```js
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/scss/*.scss', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);
```