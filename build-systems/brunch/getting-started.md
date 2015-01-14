# Getting started

## *Installation*
The first thing to do is install the ``brunch`` command with ``npm`` by running ``sudo npm install brunch -g``. You'll also want to be using [Bower](http://bower.io) for external packages, which Brunch has excellent support for.

## *Walkthrough*

## Conventions
Brunch has a few conventions that help keep things simple - but you don't have to follow all of them. Firstly, Brunch asks you to specify a folder called 'assets' that is directly copied into your output folder with no modifications. Secondly, most Brunch projects have two separate JavaScript files - app.js, which contains your code, and vendor.js for all external libraries, including bower packages. This allows you to package your files into modules without affecting external libraries.

## Folder structure
In order to understand how best to use Brunch, lets look at a typical folder structure and modify it to follow Brunch's conventions.

The application we'll be converting uses CoffeeScript, AngularJS, and LESS, and has no current build system beyond running the CoffeeScript and LESS watchers on the app/ directory. Here's what the application structure looks like before we install Brunch:

```bash
|- app/ # this folder is served statically, with the compiled files living alongside the originals
|-- images/
|-- scripts/ # contains .coffee files, which are converted to .js files by coffee -wc
|--- components/ # components, installed by bower. Currently
|-- styles/ # contains .less files, which are converted into .css files by the less watcher
|-- views/ # angularjs views and templates.
|- index.html # the main app file. Includes <script> tags for every .js file and bower component
|- test/
|- server.coffee # our server file - statically serves the app directory when run.
|- bower.json # bower package folder - still using the old version of bower
|- .bowerrc # bower config file that tells it to install into the app/components folder
|- package.json # npm package folder
```


The first thing we need to do is modify the application structure to fit Brunch's conventions. That means moving installed packages to outside the ``app/`` directory, and creating an assets folder for static files.

The assets folder will live inside ``app/``. It needs to contain any files that will be served statically - in this case, just ``index.html`` along with the ``images/`` and ``views/`` folders.

For this project, we also had to delete the existing bower configuration file (.bowerrc) and ``components/`` folder, rename the ``component.json`` file to ``bower.json`` before updating bower to the latest version. Running ``bower install`` created a ``bower_components/`` folder in the root project directory. This allows Brunch to easily identify which files are part of our app and which files are external libraries without having to write any complex regular expressions.

Finally, we need to update our index.html to be aware of the changes in structure. Currently, we have this in the head:

```html
<link rel="stylesheet" href="/styles/bootstrap.min.css">
<link rel="stylesheet" href="/styles/main.css">
```

and this in the body:

```html
<script src="/components/jquery/jquery.js"></script>
<script src="/components/lodash/lodash.js"></script>
<script src="/components/angular-unstable/angular.min.js"></script>
<script src="/components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
<script src="/components/angular-sanitize/angular-sanitize.js"></script>
<script src="/components/angular-resource/angular-resource.js"></script>
<script src="/components/angular-cookies/angular-cookies.js"></script>
<script src="scripts/app.js"></script>
<script src="scripts/directives.js"></script>
<script src="scripts/data.js"></script>
<script src="scripts/services.js"></script>
<script src="scripts/controllers/landing.js"></script>
<script src="scripts/controllers/decision-tree.js"></script>
<script src="scripts/controllers/resource.js"></script>
<script src="scripts/controllers/task.js"></script>
```

Ouch! With Brunch, we can replace the css files with this:

```html
<link rel="stylesheet" type="text/css" href="/css/app.css">
```

and the ridiculous number of scripts with this:

```html
<script src="/js/vendor.js"></script>
<script src="/js/app.js"></script>
```

Much better!
