var path        = require('path');
var gulp        = require('gulp');
var clean       = require('gulp-clean');
var gutil       = require('gulp-util');
var PluginError = gutil.PluginError;
var concat      = require('gulp-concat');
var pandoc      = require('gulp-pandoc');
var through     = require('through');
var markdown    = require('gulp-markdown');

/*
 * Read from the table of contents (toc.md) file (specific to this book)
 * and return a sorted list of markdown files
 * as source for other gulp plugins.
**/
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
        this.emit('error', new PluginError('gulp-sort-file-list',  'File ' + constructedPath + " does not exist."));
      } 
    }.bind(this));

    return resultFiles;
  }

  function endStream () {
    getFileList.bind(this)().forEach(function (file) {
      this.emit('data', file);
    }.bind(this));
    this.emit('end');
  }

  return through(bufferContents, endStream); 
}


/*
 * Removes the distribution (dist/) directory.
**/
gulp.task('clean', function () {
  return gulp.src(['dist'], {read: false}).
    pipe(clean());
});

/*
 * Concatenates all the markdowns into a single index.md markdown
**/
gulp.task('concat', ['clean'], function () {
  return gulp.src(["chapters/**/*.md"])
    .pipe(sortFileList('chapters/toc.md'))
    .pipe(concat('index.md'))
    .pipe(gulp.dest('./dist'));
})

/*
 * Converts the concatenated markdown (index.md) to
 * index.html
 * [TODO]: This may change based on how the book website
 * may look.
**/
gulp.task('concat:html', ['concat'], function () {
  return gulp.src(['dist/index.md'])
    .pipe(pandoc({
      from: 'markdown',
      to  : 'html5',
      ext : '.html',
      args: []
    }))
    .pipe(gulp.dest('./dist'));
});

/*
 * Converts the concatenated markdown (index.md) to
 * index.pdf
**/
gulp.task('concat:pdf', ['concat'], function () {
  return gulp.src(['dist/index.md'])
    .pipe(pandoc({
      from: 'markdown',
      to  : 'latex',
      ext : '.latex',
      args: ['-o', './dist/index.pdf', '--latex-engine', 'xelatex']
    }));
});