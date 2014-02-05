'use strict'
var path        = require('path');
var gutil       = require('gulp-util');
var through     = require('through');
var PluginError = gutil.PluginError;

/*
 * Read from the table of contents (toc.md) file (specific to this book)
 * and return a sorted list of markdown files
 * as source for other gulp plugins.
**/
module.exports = function (tocFilePath) {
  var files = [];

  function bufferContents (file) {
    if (file.isNull()) return; // ignore
    if (file.isStream()) return this.emit('error', new PluginError('gulp-parse-toc',  'Streaming not supported'));

    var filePath = file.path.split('/');
    // Remove unwanted path frome the absolute source
    filePath = filePath.splice(filePath.indexOf('chapters'), filePath.length);
    filePath = path.join.apply({}, filePath);
    files[filePath] = file;
  }

  function getFileList () {
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
        this.emit('error', new PluginError('gulp-parse-toc',  'File ' + constructedPath + " does not exist."));
      } 
    }.bind(this));

    return resultFiles;
  }

  function endStream () {
    getFileList.bind(this)().forEach(function (file) {
      file.contents = Buffer.concat([new Buffer("\n"), file.contents]);
      this.emit('data', file);
    }.bind(this));
    this.emit('end');
  }

  return through(bufferContents, endStream); 
}