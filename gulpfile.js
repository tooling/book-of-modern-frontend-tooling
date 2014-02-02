var 
path       = require('path'),
gulp       = require('gulp'),
gutil      = require('gulp-util'),
concat     = require('gulp-concat'),
pandoc     = require('gulp-pandoc'),
through    = require('through'),
markdown   = require('gulp-markdown');

function sortFileList (tocFilePath) {
  var files = [];

  function bufferContents (file) {
    if (file.isNull()) return; // ignore
    if (file.isStream()) return this.emit('error', new PluginError('gulp-sort-file-list',  'Streaming not supported'));

    var filePath = file.path.split('/');
    filePath = filePath.splice(filePath.indexOf('chapters'), filePath.length);
    filePath = path.join.apply({}, filePath);
    files[filePath] = file;
  }

  function getFileList () {
    var tempPath = tocFilePath.split('/');
    tempPath.pop();
    var resultFiles, linkPattern, contents;
    resultFiles = []
    linkPattern = new RegExp(/\[([^\[]+)\]\(([^\)]+)\)/m);
    contents = files[tocFilePath].contents.toString('utf8');

    contents.split('\n').forEach(function (line) {
      var constructedPath, results, matchedPath;
      results = line.match(linkPattern);
      if (results === null) return;
      matchedPath = results[2];
      
      constructedPath = path.join(tempPath.join('/'), matchedPath);
      if ( files[constructedPath] ) {
        resultFiles.push(files[constructedPath]);
      } else {
        console.log('file not found =>', constructedPath);
      } 
    });

    return resultFiles;
  }

  function endStream () {
    getFileList().forEach(function (file) {
      this.emit('data', file);
    }.bind(this));
    this.emit('end');
  }

  return through(bufferContents, endStream); 
}

gulp.task('concat:html', function () {
  gulp.src(["chapters/**/*.md"])
    .pipe(sortFileList('chapters/toc.md'))
    .pipe(concat('index.md'))
    .pipe(pandoc({
      from: 'markdown',
      to  : 'html5',
      ext : '.html',
      args: []
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('concat:pdf', function () {
  gulp.src(["chapters/**/*.md"])
    .pipe(sortFileList('chapters/toc.md'))
    .pipe(concat('index.md'))
    .pipe(gulp.dest('./dist'))
    .pipe(pandoc({
      from: 'markdown',
      to  : 'latex',
      ext : '.latex',
      args: ['-o', './dist/index.pdf']
    }));
});