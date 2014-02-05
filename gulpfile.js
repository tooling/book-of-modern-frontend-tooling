var gulp        = require('gulp');
var gutil       = require('gulp-util');
var clean       = require('gulp-clean');
var concat      = require('gulp-concat');
var pandoc      = require('gulp-pandoc');

var markdown    = require('gulp-markdown');
var markdownpdf = require('gulp-markdown-pdf');
var srcFromToc  = require('./gulp-plugin/gulp-parse-toc')

const DEST_DIR = "./dist";

/*
 * List all tasks
**/
gulp.task('default', function () {
  gutil.log("Available Tasks:");
  Object.keys(gulp.tasks).forEach(function (taskName) {
    if ( taskName.indexOf('generate') > -1 ) {
      gutil.log("\t", gutil.colors.yellow(taskName));
    }
  });
});

/*
 * Removes the distribution (dist/) directory.
**/
gulp.task('clean', function () {
  return gulp.src([DEST_DIR], {read: false}).
    pipe(clean());
});

/*
 * Concatenates all the markdowns into a single index.md markdown
**/
gulp.task('concat', ['clean'], function () {
  return gulp.src(["chapters/**/*.md"])
    .pipe(srcFromToc('chapters/toc.md'))
    .pipe(concat('index.md'))
    .pipe(gulp.dest(DEST_DIR));
})

/*
 * Converts the concatenated markdown (index.md) to
 * index.html
 * [TODO]: This may change based on how the book website
 * may look.
**/
gulp.task('generate:html', ['concat'], function () {
  return gulp.src(['dist/index.md'])
    .pipe(markdown())
    .pipe(gulp.dest(DEST_DIR))
});

/*
 * Converts the concatenated markdown (index.md) to
 * index.pdf
**/
gulp.task('generate:pdf', ['concat'], function () {
  const CSS_PATH = __dirname + '/build-assets/pdf.css';

  return gulp.src(['dist/index.md'])
    .pipe(markdownpdf({
      cssPath: CSS_PATH
    }))
    .pipe(gulp.dest(DEST_DIR))
});

/*
 * Converts the concatenated markdown (index.md) to
 * index.epub
**/
gulp.task('generate:epub', ['concat'], function () {
  return gulp.src(['dist/index.md'])
    .pipe(pandoc({
      from: 'markdown',
      to  : 'epub',
      ext : '.epub',
      args: ['-o', './dist/index.epub', '--latex-engine', 'xelatex']
    }));
});