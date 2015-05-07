var path = require('path');
var gulp = require('gulp');
var rimraf = require('rimraf');
var fs = require('fs');
var pygmentize = require('pygmentize-bundled');
var opn = require('opn');
var chalk = require('chalk');
var osTmpdir = require('os-tmpdir');

var replace = require('gulp-replace');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var pandoc = require('gulp-pandoc');
var sass = require('gulp-ruby-sass');
var markdown = require('gulp-markdown');
var markdownpdf = require('gulp-markdown-pdf');
var livereload = require('gulp-livereload');
var layoutize = require('gulp-layoutize');
var deploy = require('gulp-gh-pages');
var srcFromToc = require('./gulp-plugin/gulp-parse-toc');

const CHAPTERS_DIR = 'chapters';

const TEMPLATE_DIR = 'template';
const TEMPLATE_VIEWS_DIR = path.join(TEMPLATE_DIR, 'views');
const TEMPLATE_SASS_DIR = path.join(TEMPLATE_DIR, 'sass');

const DEST_DIR = 'dist';
const REPO_NAME = 'book-of-modern-frontend-tooling';
const BASE_DIR = path.join(DEST_DIR, 'site');
const SITE_DIR = path.join(BASE_DIR, REPO_NAME);
const SITE_ASSETS = path.join(SITE_DIR, 'assets');
const SITE_JS_DIR = path.join(SITE_ASSETS, 'js');
const SITE_CSS_DIR = path.join(SITE_ASSETS, 'css');
const SITE_VENDOR_DIR = path.join(SITE_ASSETS, 'vendor');

const TMP_DIR = osTmpdir();

/*
 * List all tasks
**/
gulp.task('default', function () {
  gutil.log('Available Tasks:');
  Object.keys(gulp.tasks).forEach(function (taskName) {
    if (taskName.indexOf('generate') > -1) {
      gutil.log('\t', chalk.yellow(taskName));
    }
  });
});

/*
 * Removes the distribution (dist/) directory.
**/
gulp.task('clean', function () {
  return rimraf.sync(DEST_DIR);
});

/*
 * Copy assets from chapters to distrubtion directory.
**/
gulp.task('copy-assets', function () {
  return gulp.src('chapters/assets/**/*')
        .pipe(gulp.dest(SITE_ASSETS));
});

/*
 * Concatenates all the markdowns into a single index.md markdown
**/
gulp.task('concat', function () {
  var concatFileName = 'index.md';

  return gulp.src(['chapters/**/*.md'])
    .pipe(srcFromToc('chapters/toc.md'))
    .pipe(concat(concatFileName))
    .pipe(gulp.dest(DEST_DIR));
});

/*
 * Converts the concatenated markdown (index.md) to
 * index.pdf
**/
gulp.task('generate:pdf', ['concat'], function () {
  const CSS_PATH = __dirname + '/build-assets/pdf.css';

  return gulp.src([
      path.join(DEST_DIR, 'index.md')
    ])
    .pipe(markdownpdf({
      cssPath: CSS_PATH
    }))
    .pipe(gulp.dest(DEST_DIR));
});

/*
 * Converts the concatenated markdown (index.md) to
 * index.epub
**/
gulp.task('generate:epub', ['concat'], function () {
  return gulp.src([
      path.join(DEST_DIR, 'index.md')
    ])
    .pipe(pandoc({
      from: 'markdown',
      to: 'epub',
      ext: '.epub',
      args: ['-o', './dist/index.epub', '--latex-engine', 'xelatex']
    }));
});


/*
 * Deploy the contents of the site folder to github pages (gh-pages)
**/
gulp.task('deploy', ['generate:site'], function (cb) {
  return gulp.src(DEST_DIR + '/site/**/*')
    .pipe(deploy('git@github.com:tooling/book-of-modern-frontend-tooling.git', 'origin'));
});

/*
 * Gulp tasks specific to help generate HTML site
 * ==============================================
**/

/*
 * Generate css from sass files in the template folder
**/
gulp.task('site:sass', function () {
  const CSS_PATH = 'style.css';

  return gulp.src(TEMPLATE_SASS_DIR + '/*.scss')
    .pipe(sass())
    .pipe(concat(CSS_PATH))
    .pipe(gulp.dest(SITE_CSS_DIR));
});

/*
 * Generates TOC html to OS's tmp directory
**/
gulp.task('site:toc', function () {
  return gulp.src(['chapters/toc.md'])
    .pipe(markdown())
    .pipe(replace(/md/g, 'html'))
    .pipe(gulp.dest(TMP_DIR));
});

/*
 * Generates site
**/
gulp.task('generate:site', ['site:sass', 'site:toc', 'copy-assets'], function () {
  var tocFile = fs.readFileSync(TMP_DIR + '/toc.html', 'utf8');
  var templatePath = path.join(TEMPLATE_VIEWS_DIR, 'index.jade');

  return gulp.src(['chapters/**/*.md'])
    .pipe(srcFromToc('chapters/toc.md'))
    .pipe(markdown({
      highlight: function (code, lang, callback) {;
        pygmentize({
          lang: lang,
          format: 'html'
        }, code, function (err, result) {
          callback(err, result.toString());
        });
      }
    }))
    .pipe(layoutize({
      templatePath: templatePath,
      engine: 'jade',
      locals: {
        tocContent: tocFile
      }
    }))
    .pipe(gulp.dest(SITE_DIR));
});

/*
 * Runs a live-reload server while listening on all files in the dist
 * folder
**/
gulp.task('watch', ['generate:site', 'serve'], function() {
  var server = livereload();
  opn('http://localhost:3000/' + REPO_NAME);

  return gulp.watch([
      CHAPTERS_DIR + '/**/*',
      TEMPLATE_DIR + '/**/*',
      SITE_DIR + '/**/*'
    ])
    .on('change', function (file) {
      var filePath = path.relative(__dirname, file.path);

      if (filePath.indexOf(TEMPLATE_VIEWS_DIR) === 0 ||
        filePath.indexOf(TEMPLATE_SASS_DIR) === 0) {
        gulp.run('generate:site');
      } else {
        server.changed(file.path);
      }
    });
});

/*
 * Runs a static server on port 3000
**/
gulp.task('serve', function () {
  const PORT = 3000;
  var fileServer = new (require('node-static')).Server(BASE_DIR);

  require('http').createServer(function (request, response) {
    request.addListener('end', function () {
      fileServer.serve(request, response);
    }).resume();
  }).listen(PORT);

  gutil.log(chalk.blue('HTTP server listening on port', PORT));
});
