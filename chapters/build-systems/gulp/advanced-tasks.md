# Advanced Tasks
In this section we will go over more advanced examples that use Node modules in place of Gulp plugins.

## When & Why To Use Node Modules Over Gulp Plugins
As you learn more about Gulp it is important to understand when and why you should use Node modules over using (or creating) a Gulp plugin. Generally, if it can be done with a Node module, then it _should_ be done with a Node module. Avoid creating or using plugins that simply abstract away functionality of basic Node modules. The following tasks will cover some common examples of using Node modules in place of Gulp plugins.

## Running A Server
During development it is valuable to quickly spin up a server for our projects without having to worry about setting up software like Apache or nginx. This task will set up a simple web server using the Node Connect module. Connect is middleware framework for Node that will allow us to add functionality to our Gulp tasks. In this case, a simple static web server.

Before we begin writing our server task, you may be wondering why we are using a Node module instead of a Gulp plugin. In many cases, a plugin may be all that is needed to successfully use Gulp for your project. However, in some cases your project may require you to do something that can not (or should not) be abstracted away into a plugin.

### 1. Install Plugins
As mentioned above, let's install the 'connect' module to our local project and add it to our devDependencies in our package.json file:
```bash
$ npm install --save-dev connect
```

### 2. Include Plugin In Gulpfile
As before with the other plugins, let's assign our plugin to a variable so that we can access and reference it in our tasks.
```js
var connect = require('connect');
var serveStatic = require('serve-static');
```

### 3. Create Server Task
Now, let's create a basic server task that will create a web server serving static files from our project directory.
```js
Gulp.task('server', function() {
    connect().use(serveStatic(__dirname))
        .listen(8080)
        .on('listening', function() {
            console.log('Server Started - http://localhost:8080');
        });
});
```

In this task we call the connect module and then we append a .use method that we use to pass in the `serve-static` middleware. 

>The '__dirname' we have passed in tells our static middleware to serve files from our base project directory.

Next we append a `.listen()` method with the specific port we would like to use. Finally, we append a `.on()` method that we use to check if the server is listening for connections and if it is we log out a simple message to our console to let us know the server is running and where we can view our project in our browser.

## BrowserSync
BrowserSync is another great way to save time during development. Anytime that we make a changes to our files BrowserSync will automatically handle the page refreshes for us. Additionally, you can sync all of the page refreshes and scrolling across all of your devices such as your phone or tablet.

Similar to our server task, BrowserSync doesn't require a plugin because we can simply use the Node module to perform the actions we need.

### 1. Install BrowserSync
```bash
$ npm install --save-dev browser-sync
```

### 2. Include BrowserSync In Gulpfile
```javascript
var browserSync = require('browser-sync');
```

### 3. Create BrowserSync Task
This task will start our BrowserSync server to keep our browser in sync with our project files.
```javascript
// BrowserSync Server
Gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});
```

### 4. Add Reload To Our Watch Tasks
After we have started our BrowserSync server, we simply need to tell Gulp when we would like BrowserSync to refresh our page. To do so, we will simply pass in our BrowserSync reload method to our watch tasks.
```javascript
Gulp.task('watch', function() {
    Gulp.watch('./src/js/*.js', ['scripts', browserSync.reload]);
    Gulp.watch('./src/css/*.css', ['styles', browserSync.reload]);
});
```
