# Using Brunch

## Configuration
Brunch configuration is incredibly simple. Here's a sample ``config.coffee`` file for an AngularJS and CoffeeScript file.

```
conventions:
  assets: /^app\/assets\//
modules:
  definition: false
  wrapper: false
paths:
  public: '_public'
files:
  javascripts:
    joinTo:
      'js/vendor.js': /^bower_components/
      'js/app.js': /^app\/scripts/
    order:
      before: [
        'bower_components/lodash/lodash.js'
        'bower_components/jquery/jquery.js'
        'bower_components/angular/angular.js'
      ]
  stylesheets:
    joinTo:
      'css/app.css': /^app\/styles/
```

(N.B: We're using CoffeeScript here, but you can use raw JavaScript instead if you prefer - just name your file `config.js` instead)
 
The configuration file is simply specifying what folders Brunch should look for and what it should do with them. So, using regular expressions we tell Brunch that the ``app/assets`` folder should be copied directly into the output folder, which we name ``_public`` (see the `paths` property).

The rest of this is fairly self explanatory, although it's important to note that Brunch uses the new bower.json files to find packages located in ``bower_components`` - so only one of ``jquery.js`` and ``jquery.min.js`` will be included in ``vendor.js``.

Finally, we're also telling Brunch to include certain scripts before others in the vendor.js file, mainly to make sure that ``angular.js`` uses jQuery rather than its jQLite implementation.

## Plugins
Looking at the config file again, you'll notice there's no configuration or 'registering' of plugins - although most plugins can be configured, the default behaviour usually works with no configuration.

Brunch plugins are just npm packages. Any Brunch plugin that's installed will automatically be used. Using ``npm install --save-dev plugin-name`` will install the package and update ``package.json``.

Looking at the ``package.json`` file, we can see the plugins we'll be using in this project:

```json
{
  "name": "project",
  "version": "0.0.0",
  "dependencies": {
    "express": "latest",
    "mongojs": "latest",
    "mongoose": "latest",
    "underscore": "latest",
    "consolidate": "~0.9.1",
    "q": "~0.9.6",
    "webshot": "~0.5.1",
    "gm": "~1.11.1"
  },
  "devDependencies": {
    "javascript-brunch": ">= 1.0 < 1.8",
    "coffee-script-brunch": ">= 1.0 < 1.8",
    "css-brunch": ">= 1.0 < 1.8",
    "ngmin-uglify-js-brunch": "~1.7.2",
    "clean-css-brunch": ">= 1.0 < 1.8",
    "auto-reload-brunch": "~1.6.5",
    "less-brunch": "~1.5.2"
  },
  "engines": {
    "node": ">=0.8.0"
  }
}
```

Here we include the 'base' plugins for JavaScript and CSS, the CoffeeScript and LESS compilation plugins, the CSS minification plugin ``clean-css-brunch``, and the ``ngmin-uglify-js-brunch`` - a plugin that runs JavaScript code through [ngmin](https://github.com/btford/ngmin), the AngularJS 'pre-minifier', then uglifyjs to compress the code. We also use the auto reload plugin, which sets up a web socket server and refreshes the page whenever any files on disk are changed. 

## *Workflow*

## *Deployment*

