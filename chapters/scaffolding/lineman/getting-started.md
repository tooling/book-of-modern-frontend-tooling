# Getting started

## Installation

Lineman is a Node.js-based tool, and it requires `npm` to install it.

Lineman is installed globally:

```bash
npm install -g lineman
```

You can test it by running:

```bash
lineman --version
```

## Creating a project

To create a new lineman project, just run:

```bash
lineman new some-project-name
```

This will create a project in `some-project-name/` with a small scaffold of directories and files. It'll include several safe-to-delete example files. Once you're comfortable, you may want to generate the project again with the "--skip-examples" flag to start completely fresh.

## Developing

Once you've changed into your project directory, you can see your app in action by running:

``` bash
lineman run
```

This will do an initial build of the application into a transient folder named "generated/" and start a local server out of that directory. You can access it at [localhost:8000](http://localhost:8000).

The `run` command also watches for file changes, re-running any appropriate tasks. It also exposes powerful API proxying and stubbing tools that let you develop your web application in concert with other backend services (whether or not they actually exist yet).

## Building

When you're ready to deploy, run:

``` bash
lineman build
```

And this will build a ready-to-deploy set of artifacts in a directory named "dist/". By default, this means minifying your scripts & stylsheets.

## Configuration

TODO: configuring asset fingerprinting

## Setting up an API proxy

API proxying allows your front-end Lineman app to send requests to your back-end application on another port. For example if you have a Ruby on Rails application on port 3000 and your Lineman app is on port 8000 you can configure Lineman requests to be proxied to port 3000 like this:

``` js
// config/application.js

server: {
  apiProxy: {
    enabled: true,
    port: 3000
  }
}
```

## API Stubbing

API stubbing is intended to be a rapid prototyping tool that allows you to quickly validate the specifications for your front-end app. As such, it is only available on the development server and is also not available in Lineman's built in unit test suite run with `lineman spec`. API stubs are routes which respond with a pre-configured response, for example:

``` js
// config/server.js

module.exports = {
  drawRoutes: function(app) {
    app.get('/api/greeting/:message', function(req, res){
      res.json({ message: "OK, "+req.params.message });
    });
  }
};
```

## Deploying to heroku
Once you have heroku [toolbelt installed](https://toolbelt.heroku.com/), simply run this from your project:
``` bash
$ heroku create <name>
$ heroku config:set BUILDPACK_URL=https://github.com/heroku/heroku-buildpack-nodejs
$ heroku config:set NPM_CONFIG_PRODUCTION=false
```

## Ruby on Rails integration
Lineman can be integrated with your Ruby on Rails project via the `lineman-rails` plugin and `rails-lineman` gem.

In your Ruby on Rails app:

1. Add this to your Gemfile: `gem 'rails-lineman'`
2. Tell the gem where to look for Lineman: `config.rails_lineman.lineman_project_location = "my/app"`. You can also set an environment variable called **LINEMAN_PROJECT_LOCATION**
3. Include Lineman's CSS & JavaScript: `<%= stylesheet_link_tag "lineman/app" %> <%= javascript_include_tag "lineman/app" %>`
4. Boot your Rails server: `$ bundle exec rails s`
5. When you deploy, Lineman assets will be built and included: `$ rake assets:precompile`

In your Lineman app:

1. Install Lineman's Rails plugin. This will setup some additional static routes and enable the API proxy: `$ npm install --save-dev lineman-rails`
2. Start your Lineman server: `$ lineman run`
3. During development use Lineman's server: `$ open http://localhost:8000`

## Lineman plugins
Lineman aims to be focused on sensible default task configuration and some level of build awareness. A plugin architecture allows you to break up large configurations down into more focused ones which are likely to be comman across multiple projects. [Published plugins](https://www.npmjs.com/search?q=lineman) can be installed using npm:
``` bash
$ npm install --save-dev lineman-jade
```

## Creating plugins
A Lineman plugin has the following requirments:

1. Every plugin's name must start with "lineman-" in order to be discovered and auto-loaded by Lineman.
2. The plugin's `package.json` file should declare "lineman" as a peer dependency:
``` js
// package.json

"peerDependencies": {
  "lineman": ">= 0.24.0"
}
```
3. Any grunt task modules or other runtime dependencies you need should be included in the "dependencies" object so that they will be installed and available to the end user.

A plugin file closely resembles the format of each project's `config/application` and `config/files` files. JavaScript and Coffeescript files under `config/plugins` will be automatically picked-up and run by Lineman and merged into your project configuration. An example of a plugin file is:

``` js
// config/plugins/my-task-here.{js,coffee}

module.exports = function(lineman) {
  return {
    files: {
      //Any file patterns you have can go here
    },
    config: {
      //Any project & task configurations go here
    }
  };
};
```
The provided `lineman` object exposes the current configuration (as it exists prior to loading your plugin file) under `lineman.config`. Concat any array-type configuration values to avoid overwriting them entirely. For example, setting `loadNpmTasks: ["my-task-module"]` would overwrite all the tasks loaded by previous plugins. Use `loadNpmTasks: lineman.config.application.loadNpmTasks.concat("my-task-module")` instead.

Test your plugin with a local project using [npm link](https://docs.npmjs.com/cli/link) before publishing.
