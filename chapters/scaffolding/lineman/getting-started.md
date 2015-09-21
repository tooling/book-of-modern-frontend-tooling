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

TODO: Ruby on Rails integration

TODO: using Lineman plugins
