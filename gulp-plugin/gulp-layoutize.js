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
 * @param srcStream {Stream} - Returns file structure
 * @param opts.engine {String} - Template engine
 * @param opts.locals {String} - Local variables for templating engine
**/
module.exports = function (srcStream, opts) {
  opts = opts || {};

  if (!opts.engine) {
    new PluginError('gulp-layoutize',  'No template engine supplied');
  }

  try {
    require(opts.engine);
  } catch (e) {
    throw new Error("gulp-layoutize: The template engine \"" + opts.engine + "\" was not found. " +
      "Did you forget to install it?\n\n    npm install --save-dev " + opts.engine);
  }

  function convertFile (stream, templateFile) {
    return through.obj(function (file, enc, cb) {
    if (file.isNull()) return; // ignore
    if (file.isStream()) return this.emit('error', new PluginError('gulp-layoutize',  'Streaming not supported'));

    consolidate[opts.engine](
      templateFile.path, 
      extend(true, {
        content: String(file.contents)
      }, opts.locals), 
      function (err, html) {
        file.contents = new Buffer(html);
        stream.push(file);
        cb();
      });
    });
  }

  return through.obj(function (templateFile, enc, cb) {
    var self = this;
    if (templateFile.isNull()) return; // ignore
    if (templateFile.isStream()) return this.emit('error', new PluginError('gulp-layoutize',  'Streaming not supported'));

    srcStream.pipe(convertFile(self, templateFile));
  }); 
}