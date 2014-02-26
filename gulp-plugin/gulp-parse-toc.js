'use strict'
var path        = require('path');
var gutil       = require('gulp-util');
var through     = require('through2');
var PluginError = gutil.PluginError;

/*
 * gulp-parse-toc
 * Read from the table of contents (toc.md) file (specific to this book)
 * and return a sorted list of markdown files
 * as source for other gulp plugins.
 * @param tocFilePath {String} - Path to the table of contents file
**/
module.exports = function (tocFilePath) {
  var files = [];

  function bufferContents (file) {
    if (file.isNull()) return; // ignore
    if (file.isStream()) return this.emit('error', 
      new PluginError('gulp-parse-toc',  'Streaming not supported'));

    var filePath = file.path.split('/');
    // Remove unwanted path frome the absolute source
    filePath = filePath.splice(filePath.indexOf('chapters'), filePath.length);
    filePath = path.join.apply({}, filePath);
    files[filePath] = file;
  }

  function getFileList (files) {
    var tempPath = tocFilePath.split('/');
    var resultFiles, linkPattern, contents;

    tempPath.pop();
    resultFiles = [];
    // Markdown link regex
    linkPattern = new RegExp(/\[([^\[]+)\]\(([^\)]+)\)/m);
    // Get file contents
    contents = files[tocFilePath].contents.toString('utf8');
    // Split by new line
    contents.split('\n').forEach(function (line) {
      var constructedPath, results, matchedPath;
      results = line.match(linkPattern);
      if (results === null) return;
      matchedPath = results[2];
      
      constructedPath = path.join(tempPath.join('/'), matchedPath);
      if ( files[constructedPath] ) {
        resultFiles.push(files[constructedPath]);
      } else {
        this.emit('error', 
          new PluginError('gulp-parse-toc',  'File ' + constructedPath + " does not exist."));
      } 
    }.bind(this));

    return resultFiles;
  }

  return through.obj(function (file, enc, cb) {
    bufferContents(file);
    cb();
  }, function (cb) {
    getFileList.bind(this)(files).forEach(function (file) {
      file.contents = Buffer.concat([new Buffer("\n"), file.contents]);
      this.push(file);
    }.bind(this));
    cb();
  }); 
}