# Advanced Tasks

In this section we will go over more advanced examples that use plain node modules in place of Gulp plugins.

## When & Why To Use Node Modules Over Gulp Plugins

As you learn more about Gulp it is important to understand when and why you should use plain node modules over using (or creating) a Gulp plugin. Generally, if it can be done with a node module, then it _should_ be done with a node module. Avoid creating or using plugins that simply abstract away functionality of basic node modules. The following tasks will cover some common examples of using node modules in place of Gulp plugins.

## Running A Server

During development it is valuable to quickly spin up a server for our projects without having to worry about setting up software like Apache or nginx. This task will set up a simple web server using the node Connect module. [Connect](https://www.npmjs.org/package/connect "Connect on npm") is middleware framework for node that will allow us to add functionality to our Gulp tasks. In this case, a simple static web server.

Before we begin writing the server task, you may be wondering why we are using a node module instead of a Gulp plugin. In many cases, a plugin may be all that is needed to successfully use Gulp for your project. However, in some cases your project may require you to do something that can not (or should not) be abstracted away into a plugin.

### 1. Install Plugins

As mentioned above, let's install the 'connect' module to our local project and add it to our devDependencies in our package.json file:

```bash
$ npm install --save-dev connect
```

### 2. Include Plugins

As before with the other plugins, assign the plugin to a variable in your gulpfile so that you can access and reference it in your tasks.

```js
var connect = require('connect');
var serveStatic = require('serve-static');
```

### 3. Create Server Task

Now, let's create a basic server task that will create a web server serving static files from your project directory.

```js
gulp.task('server', function () {
    connect().use(serveStatic(__dirname))
        .listen(8080)
        .on('listening', function () {
            console.log('Server Started - http://localhost:8080');
        });
});
```

In this task we call the connect module and then append a .use method that we use to pass in the `serve-static` middleware. 

> The '__dirname' we have passed in tells our serve-static middleware to serve files from our base project directory.

Next we append a `.listen()` method with the specific port we would like to use. In the example above we are using port 8080, but you can customize this port number to whatever you would prefer. In some situations the port may already be in use by another application on your local machine, so you will need to make sure that the port is unique to avoid any conflicts.

Finally, we append a `.on()` method that will be used to check if the server is listening for connections. If this is successful, we log out a message to our console that will let the user know the server is running and provide them with the URL to view the project.

## BrowserSync

[BrowserSync](http://browsersync.io "BrowserSync Website") is another great way to save time during development. Anytime that you make a changes to our files BrowserSync will automatically reload the browser and project assets so that you are always viewing the latest changes when you switch back to our browser. Additionally, it will sync all of those reloads and browser actions such as scrolling and clicking, across all of your devices simultaneously.

Similar to the server task, BrowserSync doesn't require a plugin because you can simply use the node module to perform the actions you need.

### 1. Install BrowserSync

First you must install the BrowserSync plugin and add it to the list of development dependencies in our package.json file.

```bash
$ npm install --save-dev browser-sync
```

### 2. Include BrowserSync

Next, assign the BrowserSync plugin to a variable in your gulpfile so that you can access and reference it in your tasks.

```js
var browserSync = require('browser-sync');
```

### 3. Create BrowserSync Task

This task will start the BrowserSync server to keep all of your browsers in sync with your project files and any actions that take place within your browsers.

```js
// BrowserSync Server
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './'
        }
    });
});
```

### 4. Add Reload To Our Watch Tasks

After you have started the BrowserSync server, you simply need to tell Gulp when BrowserSync should refresh the page. To do so, simply add the BrowserSync module to the tasks array and execute its reload method.

```js
gulp.task('watch', function () {
    gulp.watch('./src/js/*.js', ['scripts', browserSync.reload]);
    gulp.watch('./src/css/*.css', ['styles', browserSync.reload]);
});
```


