'use strict'

var path        = require('path');
var gutil       = require('gulp-util');
var through     = require('through2');
var fs          = require('fs');
var consolidate = require('consolidate');
var extend      = require('node.extend');

/*
 * gulp-layoutize
 * 
 * Inspired by https://github.com/timrwood/gulp-consolidate/blob/master/index.js
 * @param opts.template {String} - Path to template
 * @param opts.engine {String} - Template engine
 * @param opts.locals {String} - Local variables for templating engine
**/
module.exports = function (opts) {
  opts = opts || {};

  if (!opts.template) {
    new PluginError('gulp-layoutize',  'No template path supplied');
  }

  if (!opts.engine) {
    new PluginError('gulp-layoutize',  'No template engine supplied');
  }

  try {
    require(opts.engine);
  } catch (e) {
    new PluginError("gulp-layoutize', 'The template engine \"" + opts.engine + "\" was not found. " +
      "Did you forget to install it?\n\n    npm install --save-dev " + opts.engine);
  }

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) return; // ignore
    if (file.isStream()) return this.emit('error', 
      new PluginError('gulp-layoutize',  'Streaming not supported'));

    consolidate[opts.engine](
      opts.template,
      extend(true, {
        content: String(file.contents)
      }, opts.locals), 
      function (err, html) {
        if (err) new PluginError('gulp-layoutize', 'Error during conversion');
        file.contents = new Buffer(html);
        this.push(file);
        cb();
    }.bind(this));
  }); 
}