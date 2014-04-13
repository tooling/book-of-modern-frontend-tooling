'use strict'
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
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
    if (file.isNull()) {
      return;
    }

    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-parse-toc',  'Streaming not supported'));
      return;
    }

    var filePath = file.path.split(path.sep);
    // remove unwanted path frome the absolute source
    filePath = filePath.splice(filePath.indexOf('chapters'), filePath.length);
    filePath = path.join.apply({}, filePath).replace(path.sep, '/');
    files[filePath] = file;
  }

  function getFileList (files) {
    var contents;
    var resultFiles;
    var linkPattern;
    var tempPath = tocFilePath.split('/');

    tempPath.pop();
    resultFiles = [];

    // markdown link regex
    linkPattern = new RegExp(/\[([^\[]+)\]\(([^\)]+)\)/m);

    // get file contents
    contents = files[tocFilePath].contents.toString('utf8');

    // split by new line
    contents.split('\n').forEach(function (line) {
      var constructedPath;
      var results;
      var matchedPath;

      results = line.match(linkPattern);

      if (results === null) {
        return;
      }

      matchedPath = results[2];

      constructedPath = path.join(tempPath.join('/'), matchedPath).replace(path.sep, '/');

      if (files[constructedPath]) {
        resultFiles.push(files[constructedPath]);
      } else {
        this.emit('error', new PluginError('gulp-parse-toc',  'File ' + constructedPath + ' does not exist.'));
      }
    }.bind(this));

    return resultFiles;
  }

  return through.obj(function (file, enc, cb) {
    bufferContents(file);
    cb();
  }, function (cb) {
    getFileList.bind(this)(files).forEach(function (file) {
      file.contents = Buffer.concat([new Buffer('\n'), file.contents]);
      this.push(file);
    }.bind(this));
    cb();
  });
}
