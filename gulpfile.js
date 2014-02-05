var gulp        = require('gulp');
var clean       = require('gulp-clean');
var concat      = require('gulp-concat');
var pandoc      = require('gulp-pandoc');

var markdown    = require('gulp-markdown');
var markdownpdf = require('gulp-markdown-pdf');
var srcFromToc  = require('./gulp-plugin/gulp-parse-toc')

const DEST_DIR = "./dist";


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
gulp.task('concat:html', ['concat'], function () {
  return gulp.src(['dist/index.md'])
    .pipe(markdown())
    .pipe(gulp.dest(DEST_DIR))
});

/*
 * Converts the concatenated markdown (index.md) to
 * index.pdf
**/
gulp.task('concat:pdf', ['concat'], function () {
  return gulp.src(['dist/index.md'])
    .pipe(markdownpdf({
      cssPath: __dirname + '/build/pdf.css'
    }))
    .pipe(gulp.dest(DEST_DIR))
});